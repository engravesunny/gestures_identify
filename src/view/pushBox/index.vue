<template>
    <div class="box">
        <left />
        <game />
    </div>
</template>

<script setup>

import left from '../snake/components/left.vue'
import game from './components/gameContainer.vue'

</script>

<style lang="less" scoped>
    .box{
        width: 100%;
        height: 100%;
    }
</style>