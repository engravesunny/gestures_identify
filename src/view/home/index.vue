<template>
    <div class="home_container">
        <div class="nav">
            <nav-bar></nav-bar>
        </div>
        <div v-if="route?.path === '/'" class="main_body">
            <div class="right_list">
                <right-list></right-list>
                <video-display></video-display>
            </div>
            <div class="left_display"><left-display></left-display></div>
        </div>
        <router-view v-else></router-view>
    </div>
</template>

<script setup>
import VideoDisplay from './components/videoDisplay/index.vue'
import NavBar from '../nav/index.vue'
import RightList from './components/rightList/index.vue'
import leftDisplay from './components/leftDisplay/index.vue'

const route = useRoute()


</script>

<style lang="less" scoped>
.home_container {
    padding: 45px 0 0 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;

    .main_body {
        width: 100%;
        height: 100%;
        padding: 2% 2%;
        box-sizing: border-box;

        .right_list {
            height: 100%;
            width: 48%;
            float: right;
        }

        .left_display {
            height: 100%;
            width: 48%;
            float: left;
        }
    }

    .threeMain {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100vw;
        height: 100vh;
        // background-color: #fff;
    }
}
</style>