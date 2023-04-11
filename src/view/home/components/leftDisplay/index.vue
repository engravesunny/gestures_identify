<template>
    <div class="left_display_container">
        <div class="nav">
            <div class="title">上传文件</div>
        </div>
        <div class="uploadArea">
            <upload-csv></upload-csv>
        </div>
        <div class="column_display_container">
            <column-display></column-display>
        </div>
    </div>
</template>

<script setup>
import UploadCsv from './components/uploadCsv/index.vue'
import ColumnDisplay from './components/columnarisplay/index.vue'

</script>

<style lang="less" scoped>
    .left_display_container{
        position: relative;
        width: 100%;
        height: 100%;
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
        .uploadArea{
            height: 30%;
        }
        .column_display_container{
            width: 100%;
            height: 70%;
        }
    }
</style>