<template>
    <div class="right_list_container">
        <div class="nav">
            <div class="title">手势分析</div>
            <div class="remove" @click="removeAllName">清除分析记录</div>
        </div>
        <ul class="list">
            <el-scrollbar height="100%">
            <li class="list_item" v-for="item in gesDocName" :key="item.time">
                <span class="time">{{item.time}}</span>{{ ' ' + ' ' + item.analysis }}
            </li>
            </el-scrollbar>
        </ul>
    </div>
</template>

<script setup>
import useGesStore from '../../../../store';
import { storeToRefs } from 'pinia';
const { gesDocName } = storeToRefs(useGesStore())

let removeAllName = ():void => {
    useGesStore().clearGesName()
    useGesStore().clearGes()
}

</script>

<style lang="less" scoped>
    .right_list_container{
        position: relative;
        width: 100%;
        height: 35%;
        background-color: var(--content-bg-color);
        border-radius: 5px;
        padding-top: 45px;
        box-sizing: border-box;
        text-align: center;
        .nav{
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
            .title{
                color: #fff;
            }
            .remove{
                position: absolute;
                top: 0;
                right: 10px;
                color: #fff;
                font-size: 14px;
                cursor: pointer;
            }
        }
        .list{
            width: 100%;
            height: 100%;
            border-radius: 0 0 5px 5px;
            padding: 20px 20px 20px 20px;
            box-sizing: border-box;
            .list_item{
                border-radius: 5px;
                width: 100%;
                color: #fff;
                background-color: var(--list-item-color);
                margin: 10px 0;
                padding: 10px 0 10px 10px;
                box-sizing: border-box;
                text-align: start;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                cursor: pointer;
                .time{
                    font-size: 14px;
                }
            }
            .list_item:hover{
                background-color: var(--list-item-hover-color);
            }            
        }
    }
</style>