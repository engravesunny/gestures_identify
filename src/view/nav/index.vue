<template>
    <div class="nav_container">
        <div class="title">手势识别系统</div>
        <div class="time">
            {{ time }}
        </div>
        <div class="to3D">
            <span class="btn unselectable" @click="toGame('/three')">手势3D视图</span>
            <span class="btn unselectable" @click="toGame('/snake')">贪吃蛇</span>
            <span class="btn unselectable" @click="toGame('/box')">推箱子</span>
            <span class="btn unselectable" @click="toGame('/')">首页</span>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
let toGame = (path) => {
    router.push(path)
}
let time = ref('')
let updateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    const seconds = ('0' + now.getSeconds()).slice(-2);
    const currentTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    time.value = currentTime
}
onMounted(() => {
    updateTime()
    setInterval(() => {
        updateTime()
    }, 1000)
})
</script>

<style lang="less" scoped>
.nav_container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 45px;
    background-color: #12a7ab;
    line-height: 45px;
    color: #fff;
    text-align: center;
    z-index: 999;

    .title {
        float: left;
        margin-left: 10px;
    }

    .time {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
    }

    .to3D {
        float: right;
        margin-right: 10px;
        cursor: pointer;

        .btn {
            margin: 0 10px;
            float: right;
            font-size: 16px;
        }

        .btn:hover {
            text-decoration: underline;
        }
    }

}
</style>