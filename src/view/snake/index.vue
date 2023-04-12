<template>
    <div class="snake">
        <left />
        <game />
    </div>
</template>

<script setup>

import left from './components/left.vue';
import game from './components/game.vue';

</script>

<style lang="less" scoped>
    .snake{
        width: 100%;
        height: 100%;
    }
</style>