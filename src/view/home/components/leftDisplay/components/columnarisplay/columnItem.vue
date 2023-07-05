<template>
    <div class="column_item">
        <div class="column" v-if="gestureInfo.length">
            <div class="column_item" v-for="(item, index) in gestureInfo" :key="index">
                <column-block :length="item.length / gesturesList.length" :gesture="item.num"></column-block>
            </div>
        </div>
    </div>
</template>

<script setup>
import getNumberRanges from '../../../../../../utils/getLength';
import ColumnBlock from './columnBlock.vue'
import { useGesStore } from '../../../../../../store';
import { storeToRefs } from 'pinia';
const { gesList } = storeToRefs(useGesStore())
// 手势--接收数据
let gesturesList = reactive([0, 0, 2, 2, 2, 2, 4, 4, 3, 3, 1, 1, 1, 0, 0, 0, 0, 1, 1, 5, 5, 4, 4, 4])

// 手势--手势类型num,连续手势长度length
let gestureInfo = computed(() => {
    return getNumberRanges(gesList.value)
})
</script>

<style lang="less" scoped></style>