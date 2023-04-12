<template>
    <div class='cell-box'
        :class='classes'>
    </div>
</template>

<script setup>
import { watch } from 'vue';


const props = defineProps(['type']);

// 小格子的颜色
const classes = computed(() => {
  return {
    head: props.type === 2,
    body: props.type === 1,
    food: props.type === -1,
  };
});

watch(()=>props.type,(val)=>{
  console.log(val);
},{
  deep:true,
  immediate:true
})

</script>

<style lang="less" scoped>
.cell-box {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  margin: 2px;
}

  .head {
  background: #510ce0;
  box-shadow: 0 0 10px #1e88e5, 0 0 20px #1e88e5, 0 0 40px #1e88e5;
  z-index: 9999;
}
.body {
  background: black;
  box-shadow: 0 0 5px #76ff03, 0 0 5px #76ff03, 0 0 10px #76ff03;
  z-index: 9999;
}
.food {
  background: #d500f9;
  border-radius: 50%;
  animation-name: shineFood;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}

@keyframes shineFood {
  0% {
    box-shadow: 0 0 5px #d500f9, 0 0 5px #d500f9, 0 0 5px #d500f9;
  }
  50% {
    box-shadow: 0 0 10px #d500f9, 0 0 20px #d500f9, 0 0 20px #d500f9;
  }
  100% {
    box-shadow: 0 0 5px #d500f9, 0 0 5px #d500f9, 0 0 5px #d500f9;
  }
}  
</style>