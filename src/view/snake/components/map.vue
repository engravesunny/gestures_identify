<template>
    <div class="map">
        <div class="row" v-for="row in Row" :key="row">
            <div class="col" v-for="col in Col" :key="col">
                <game-cell :type="map[row - 1][col - 1]"></game-cell>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, watch } from 'vue';
import GameCell from './cell.vue'

const Row = ref(0)
const Col = ref(0)

const props = defineProps(['map'])

const mapList = reactive([])

onMounted(()=>{
    const map = document.querySelector('.map')
    Row.value = Math.floor(map.clientHeight / 54)
    Col.value = Math.floor(map.clientWidth / 54)
})

watch(()=>props.map,(val)=>{
    // console.log(val);
},{
    deep:true,
    immediate:true
})

</script>

<style lang="less" scoped>
    .map{
        padding: 20px;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        .row{
            display: flex;
        }
    }
</style>