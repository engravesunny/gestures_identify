<template>
    <div>
        <el-upload
            :multiple="true"
            drag
            :before-upload="toUploadCsv"
            :show-file-list="false"
            class="upload_container"
        >
            <div class="icon iconfont">&#xe636;</div>
            <el-button style="background:rgba(0,0,0,0);color:#fff;border:none;">上传文件</el-button>
        </el-upload>
    </div>
</template>

<script setup>
import readCsv from '../../../../../../utils/readCsv';
import useGesStore from '../../../../../../store';
let toUploadCsv = async (file) => {
    console.log(file);
    console.log('读取csv文件');
    readCsv(file)
    useGesStore().getGes(file)
    return false
}
</script>

<style lang="less" scoped>
.upload_container{
    .icon{
        font-size: 50px;
        color: #fff;
    }
}
</style>