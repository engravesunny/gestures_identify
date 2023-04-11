<template>
    <div class="column_container">
        <div class="nav">
            <div class="title">分析结果</div>
        </div>
        <div class="columen_list">
            <column-item></column-item>
        </div>
        <div class="tuli">
            <div class="attract block">
                <div class="colorBlock" style="background-color: rgba(184,84,80,0.3);border:2px solid rgba(184,84,80,0.9);width:30px;height:10px;"></div>
                <div class="text">attract</div>
            </div>
            <div class="circle block">
                <div class="colorBlock" style="background-color: rgba(108,142,191,0.3);border:2px solid rgba(108,142,191,0.9);width:30px;height:10px;"></div>
                <div class="text">circle</div>
            </div>
            <div class="press block">
                <div class="colorBlock" style="background-color: rgba(214,182,86,0.3);border:2px solid rgba(214,182,86,0.9);width:30px;height:10px;"></div>
                <div class="text">press</div>
            </div>
            <div class="shrink block">
                <div class="colorBlock" style="background-color:rgba(130,179,102,0.3);border:2px solid rgba(130,179,102,0.9);width:30px;height:10px;"></div>
                <div class="text">shrink</div>
            </div>
            <div class="thumb block">
                <div class="colorBlock" style="background-color:rgba(215,155,0,0.3);border:2px solid rgba(215,155,0,0.9);width:30px;height:10px;"></div>
                <div class="text">thumb</div>
            </div>
            <div class="wave block">
                <div class="colorBlock" style="background-color:rgba(150,115,166,0.3);border:2px solid rgba(150,115,166,0.9);width:30px;height:10px;"></div>
                <div class="text">wave</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import ColumnItem from './columnItem.vue';
</script>

<style lang="less" scoped>
    .column_container{
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #fff;
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
        }
        .columen_list{
            width: 100%;
            position: absolute;
            top: 30%;
            left: 0;
        }
        .tuli{
            display: flex;
            position: absolute;
            bottom: 10px;
            right: 10px;
            .block{
                margin: 10px;
                display: flex;
                align-items: center;
                flex-direction: column;
                .text{
                    margin: 5px 0px;
                    font-size: 12px;
                }
            }
        }
    }
</style>