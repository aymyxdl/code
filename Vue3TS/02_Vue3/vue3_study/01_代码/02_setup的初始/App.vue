<template>
  <div>111111111</div>
  <!-- {{ number }} -->
</template>

<script lang="ts">
// 这里可以使用ts的代码

// defineComponent函数，目的是定义一个组件，内部可以传入一个配置对象
import { defineComponent } from 'vue';


// 暴露出去一个定义好的组件
// 这里和vue2的不同，这里调用一个函数
// 函数的最终返回值是一个对象，然后把这个对象暴露出去
export default defineComponent({
  // 当前组件的名字是 App
  name: 'App',
  // 测试代码  setup是组合API中第一个要使用的函数
  // setup () {
  //   console.log(222222);
  //   const number = 10;
  //   return {
  //     number
  //   }
  // }
});
</script>

<style>
</style>
