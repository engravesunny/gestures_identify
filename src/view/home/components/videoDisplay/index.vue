<template>
    <div class="right_list_container">
        <div class="nav">
            <div class="title">演示视频窗口</div>
        </div>
        <div class="video" :style="{ width: `${vWidth}%`, height: `${vHeight}%` }">
            <el-scrollbar ref="scrollbar" height="100%">
                <video v-show="isShowVideo" loop controls style="object-fit: contain;width:100%;"
                    src="https://gcore.jsdelivr.net/gh/engravesunny/CDN/video/2222.mp4" @loadeddata="showVideo"></video>
                <video v-show="isShowVideo" loop controls style="object-fit: contain;width:100%;"
                    src="https://gcore.jsdelivr.net/gh/engravesunny/CDN/video/kisukuband.mp4"
                    @loadeddata="showVideo"></video>
                <video v-show="isShowVideo" loop controls style="object-fit: contain;width:100%;"
                    src="https://gcore.jsdelivr.net/gh/engravesunny/CDN/video/3333.mp4" @loadeddata="showVideo"></video>
                <video v-show="isShowVideo" loop controls style="object-fit: contain;width:100%;"
                    src="https://gcore.jsdelivr.net/gh/engravesunny/CDN/video/1111.mp4" @loadeddata="showVideo"></video>
                <video v-show="isShowVideo" loop controls style="object-fit: contain;width:100%;"
                    src="https://gcore.jsdelivr.net/gh/engravesunny/CDN/video/4444.mp4" @loadeddata="showVideo"></video>
            </el-scrollbar>
        </div>
        <div class="confirmBox" v-if="dialogVisible">
            <div class="title">
                确认要全屏吗
            </div>
            <div class="btn">
                <button class="cancel" @click="btnCancel">取消</button>
                <button class="ok" @click="btnOk">确认</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { useGesStore } from '../../../../store';
import { storeToRefs } from 'pinia';
import { ref, onMounted, watch } from 'vue'
const { gesList } = storeToRefs(useGesStore())
const scrollbar = ref(null)
let dialogVisible = ref(false)
let vWidth = ref(100)
let vHeight = ref(100)
let isShowVideo = ref(false)

let showVideo = () => {
    isShowVideo.value = true
}

let btnCancel = () => {
    dialogVisible.value = false
}


onMounted(() => {
    const video = document.querySelector('video')
    console.log(video);

})

let index = 0
let scrollTop = ref(0)
let vloum = ref(1)

let flag = 0

let btnOk = () => {
    const videos = document.querySelectorAll('video')
    videos[index].requestFullscreen();
    btnCancel()
}

watch(() => gesList, (val) => {
    const gesture = val.value[val.value.length - 1]
    const videos = document.querySelectorAll('video')
    if (gesture === 0) {
        //全屏显示
        console.log('全屏显示', 0);
        ElMessage.success('全屏显示')
        dialogVisible.value = true
    } else if (gesture === 1) {
        //动画播放
        console.log('动画播放', 1);

        console.log(videos[index].paused);
        if (!videos[index].paused) {
            ElMessage({
                type: 'success',
                message: '停止播放'
            })
            videos[index].pause()
        } else {
            ElMessage({
                type: 'success',
                message: '开始播放'
            })
            videos[index].play()
        }
    } else if (gesture === 2) {
        //确认选项
        console.log('确认选项', 2);
        ElMessage({
            type: 'success',
            message: '确认'
        })
        const btn = document.querySelector('.ok')
        console.log(btn);
        btn.click()

    } else if (gesture === 3) {
        //页面缩放
        console.log('页面缩放', 3);
        ElMessage.success('页面缩放')
        vHeight.value = vHeight.value * 0.9
        vWidth.value = vWidth.value * 0.9
        console.log(vWidth, vHeight);
    } else if (gesture === 4) {
        //音量调节
        console.log('音量调节', 4);

        if (flag === 0) {
            vloum.value = vloum.value - 0.1;
            if (vloum.value <= 0) {
                flag = 1
            }
        } else {
            vloum.value = vloum.value + 0.1;
            if (vloum.value >= 100) {
                flag = 0
            }
        }
        ElMessage({
            type: 'success',
            message: `当前音量：${Math.floor(vloum.value * 100)}%`
        })
        videos[index].volume = vloum.value // 设置音量为50%
    } else if (gesture === 5) {
        //页面滚动
        console.log('页面滚动', 5);
        ElMessage({
            type: 'success',
            message: '页面滚动'
        })
        if (!videos[index].paused) {
            videos[index].pause()
        }
        const to = scrollTop.value + videos[index].offsetHeight
        let move = scrollTop.value
        const increment = to / 100
        const timer = setInterval(() => {
            scrollbar.value.setScrollTop(move)
            move += increment
            if (move >= to) {
                clearInterval(timer)
                scrollTop.value = scrollTop.value + to
                index++;
                videos[index].play()
            }
        }, 3)
    }
}, { deep: true })

</script>

<style lang="less" scoped>
.right_list_container {
    margin-top: 20px;
    position: relative;
    width: 100%;
    height: 62%;
    background-color: var(--content-bg-color);
    border-radius: 5px;
    padding-top: 45px;
    box-sizing: border-box;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    .nav {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 45px;
        background-color: var(--title-bg-color);
        border-radius: 5px 5px 0 0;
        text-align: center;
        line-height: 45px;

        .title {
            color: #fff;
        }

    }

    .video {
        background-color: #fff;
    }

    .confirmBox {
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translate(-50%);
        height: 100px;
        width: 200px;
        background-color: #fff;
        z-index: 99999;
        box-shadow: 1px 1px 10px 2px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .btn {
            button {
                margin: 5px;
            }

            .ok,
            .cancel {
                background-color: #b5bffa;
                border: none;
                padding: 5px 10px;
                border-radius: 5px;
                cursor: pointer;
            }

            .cancel {
                background-color: #fff;
                border: 1px solid rgba(0, 0, 0, 0.1);
                cursor: pointer;
            }
        }
    }
}
</style>