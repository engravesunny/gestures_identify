<template>
    <div class="threeMain">
        <three-con></three-con>
    </div>
</template>

<script setup>
import ThreeCon from './three.vue'
</script>

<style lang="less" scoped>
.threeMain {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100vw;
    height: 100vh;
    // background-color: #fff;
}
</style>