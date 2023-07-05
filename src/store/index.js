import { defineStore } from 'pinia'
import { uploadCsvApi, getGesData } from '../service/api'
import gestureMeaning from '../contents/gestureMeaning'
import { gameNumMeaning, gameControls } from '../contents/gestureMeaning'
import router from '../router/index'
import PubSub from 'pubsub-js'


export const useGesStore = defineStore('ges', {
    state: () => ({
        gesList: [],
        gesDocName: []
    }),
    actions: {
        async getGes(file) {

            const { data: data1 } = await uploadCsvApi({
                'csv_file': file
                // 这里填写参数名称  如果参数名是file就不用改了，不是的话就改为 参数名:file            
            })
            console.log('上传状态', data1);   // 上传文件后，F12打开控制台，看后端返回的参数名用  可能信息存在data.xxx.xxx   然后改写下行代码，然后解除注释就OK了
            const { data: data2 } = await getGesData()
            console.log('后端返回', data2);
            let fakeData = data2[data2.length - 1]
            // let fakeData = ''
            // const fileName = file.name
            const route = router.currentRoute.value.fullPath
            // if (fileName.includes('attract')) {
            //     fakeData = 0
            // } else if (fileName.includes('circle')) {
            //     fakeData = 1
            // } else if (fileName.includes('press')) {
            //     fakeData = 2
            // } else if (fileName.includes('shrink')) {
            //     fakeData = 3
            // } else if (fileName.includes('thumb')) {
            //     fakeData = 4
            // } else if (fileName.includes('wave')) {
            //     fakeData = 5
            // }
            this.gesList.push(fakeData)
            const now = new Date()
            const hours = ('0' + now.getHours()).slice(-2);
            const minutes = ('0' + now.getMinutes()).slice(-2);
            const seconds = ('0' + now.getSeconds()).slice(-2);
            const time = `${hours}:${minutes}:${seconds}`
            let analysis = ''
            if (route === '/' || route === '/three') {
                analysis = gestureMeaning[fakeData]
            } else {
                analysis = gameNumMeaning[fakeData]
                if (route === '/box') {
                    PubSub.publish('boxMove', gameControls[fakeData])
                } else if (route === '/snake') {
                    PubSub.publish('snakeMove', gameControls[fakeData])
                }
            }
            this.addGesName(analysis, time)
        },
        addGes(ges) {
            this.gesList.push(ges)
        },
        removeGes(index) {
            this.gesList.splice(index, 1)
        },
        clearGes() {
            this.gesList.length = 0
            this.gesDocName.length = 0

        },
        addGesName(analysis, time) {
            this.gesDocName.unshift({ analysis, time })

        },
        removeGesName(index) {
            this.gesDocName.splice(index, 1)
        },
        clearGesName() {
            this.gesDocName.length = 0
        }
    }
})
