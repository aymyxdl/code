<template>
  <h2>setup和ref的基本使用</h2>
  <h3>{{ count }}</h3>
  <button @click="updateCount">更新数据</button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'App',
  // 需求： 页面打开后可以直接看到一个数字，点击按钮后，该数据可以发生变化
  // vue2的实现方法
  // data() {
  //   return {
  //     count: 0
  //   }
  // },
  // methods: {
  //   updateCount() {
  //     this.count += 1;
  //   }
  // }

  // vue3的实现方式
  // setup是组合API的入口函数

  setup() {
    // 变量
    // let count = 0;  // 此时的数据并不是响应式的数据（响应式数据：数据变化，页面跟着渲染变化）
    // ref是一个函数， 作用：定义一个响应式的数据，返回的是一个Ref对象
    // 对象中有一个value属性，如果需要对数据进行操作
    // 需要使用该Ref对象调用value属性的方式进行数据的操作
    // 但是html模板中是不要用使用value属性的写法
    // 一般用来定义一个基本类型的响应式数据
    const count = ref(0);
    // console.log(count);
    
    // 方法 好像必须写成 function 形式，不能用es6的简写 updateCount() {}
    function updateCount() {
      // console.log(count);
      // 报错的原因是： count是一个Ref对象，对象是不能进行 ++ 操作的
      // count += 1;
      count.value++
    }

    // 返回的是一个对象
    return {
      // 属性
      count,
      // 方法
      updateCount
    }
  }
});
</script>

<style>
</style>
