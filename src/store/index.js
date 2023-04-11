import { defineStore } from 'pinia'
import { uploadCsvApi,getGesData } from '../service/api'
import gestureMeaning from '../contents/gestureMeaning'
const useGesStore = defineStore('ges',{
    state:()=>({
        gesList:[],
        gesDocName:[],
        show3D:false
    }),
    actions:{
        async getGes(file){
            const {data:data1} = await uploadCsvApi({
                'csv_file':file
                // 这里填写参数名称  如果参数名是file就不用改了，不是的话就改为 参数名:file            
            })
            console.log('上传状态',data1);   // 上传文件后，F12打开控制台，看后端返回的参数名用  可能信息存在data.xxx.xxx   然后改写下行代码，然后解除注释就OK了
            const { data:data2 } = await getGesData()
            console.log('后端返回',data2);
            this.gesList = data2
            const now = new Date()
            const hours = ('0' + now.getHours()).slice(-2);
            const minutes = ('0' + now.getMinutes()).slice(-2);
            const seconds = ('0' + now.getSeconds()).slice(-2);
            const time = `${hours}:${minutes}:${seconds}`
            console.log(data2[data2.length-1]);
            const analysis = gestureMeaning[data2[data2.length-1]]
            this.gesDocName.unshift({analysis,time})
        },
        addGes(ges){
            this.gesList.push(ges)
        },
        removeGes(index){
            this.gesList.splice(index, 1)
        },
        clearGes(){
            this.gesList.splice(0,this.gesList.length)
        },
        addGesName(name,time){
            this.gesDocName.push({name,time})
        },
        removeGesName(index){
            this.gesDocName.splice(index, 1)
        },
        clearGesName(){
            this.gesDocName.splice(0,this.gesDocName.length)
        }
    }
})

export default useGesStore