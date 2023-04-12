<template>
    <div class="game">
        <div class="container">
            <div class="nav">
                <div class="title">游戏界面</div>
            </div>
            <div class="game_container">
                <game />
            </div>
        </div>
    </div>
</template>

<script setup>
    import game from './game.vue';
</script>

<style lang="less" scoped>
    .game{
        width: 80%;
        height: 100%;
        // background-color: #fff;
        padding: 20px;
        box-sizing: border-box;
        float: right;
        .container{
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: 5px;
            overflow: hidden;
            background-color: var(--content-bg-color);
            padding-top: 40px;
            box-sizing: border-box;
            .nav{
                position: absolute;
                top: 0;
                width: 100%;
                height: 40px;
                background-color: var(--title-bg-color);
                text-align: center;
                .title{
                    height: 100%;
                    line-height: 40px;
                    color: #fff;
                }
            }
            .game_container{
                width: 100%;
                height: 100%;
            }
        }
    }
</style>