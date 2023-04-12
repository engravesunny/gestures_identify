<template>
    <div class="left">
        <div class="left-top">
            <div class="nav">
                <div class="title">上传文件</div>
            </div>
            <upload-csv></upload-csv>
        </div>
        <div class="left-bottom">
            <right-list></right-list>
        </div>
    </div>
</template>

<script setup>

import UploadCsv from '../../home/components/leftDisplay/components/uploadCsv/index.vue'
import RightList from '../../home/components/rightList/index.vue'

</script>

<style lang="less" scoped>
    .left{
        float: left;
        width: 20%;
        padding: 20px;
        box-sizing: border-box;
        height: 100%;
        .left-top{
            box-sizing: border-box;
            position: relative;
            height: 30%;
            width: 100%;
            .nav{
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                width: 100%;
                height: 40px;
                background-color: var(--title-bg-color);
                border-radius: 5px 5px 0 0;
                text-align: center;
                line-height: 40px;
                z-index: 1;
                .title{
                    color: #fff;
                }
            }
        }
        .left-bottom{
            height: 70%;
            .right_list_container{
                height: 100%;
                .nav{
                    .remove{
                        display: none !important;
                    }
                }
            }
        }
    }
</style>