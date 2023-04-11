<template>
    <div 
    class="column_block" 
    style="color:#fff;float: left;box-sizing: border-box;" 
    :style="{
        backgroundColor:`${gestureMap.get(gesture)},0.4)`,
        width:`${length*100}%`,
        border:`2px solid ${gestureMap.get(gesture)},0.9)`
    }"
    @mouseenter="showImg"
    @mouseleave="closeImg"
    >
    <div class="img"  v-if="isShowImg">
        <img v-loading="loading" :src="`http://kecat.top/gesture_img/${gesture}.webp`" alt="" @load="loaded">
        <div class="text">{{ gestureName[gestureMap.get(gesture)] }}</div>
    </div>
    </div>
</template>

<script setup>
let isShowImg = ref(false)
let loading = ref(true)
let showImg = () => {
    isShowImg.value = true
    
}
let loaded = () => {
    loading.value = false
}


let closeImg = () => {
    isShowImg.value = false
}

let gestureMap = new Map()
gestureMap.set(0,'rgba(184,84,80')
gestureMap.set(1,'rgba(108,142,191')
gestureMap.set(2,'rgba(214,182,86')
gestureMap.set(3,'rgba(130,179,102')
gestureMap.set(4,'rgba(215,155,0')
gestureMap.set(5,'rgba(150,115,166')

const props = defineProps({
    length:{
        type:Number,
        default:0
    },
    gesture:{
        type:Number,
        default:0
    }
})

const gestureName = {
    'rgba(184,84,80':'attract',
    'rgba(108,142,191':'circle',
    'rgba(214,182,86':'press',
    'rgba(130,179,102':'shrink',
    'rgba(215,155,0':'thumb',
    'rgba(150,115,166':'wave'
}
</script>

<style lang="less" scoped>
    .column_block{
        position: relative;
        height: 35px;
        .img{
            width: 100px;
            height: 150px;
            background-color: #fff;
            overflow: hidden;
            position: absolute;
            top: 35px;
            left: 50%;
            transform: translate(-50%);
            border: 1px solid black;
            border-radius: 10px;
            z-index: 9999;
            img{
                height: 80%;
                border-radius: 10px;
                object-fit: contain;
            }
        }
        .text{
            color: #000;
        }
    }
</style>