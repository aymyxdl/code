<template>
  <h2>App父级组件：Suspense组件的介绍</h2>

  <Suspense>
    <template #default>
      <!-- 异步组件 -->
      <!-- <async-component /> -->
      <async-address />
    </template>
    <template v-slot:fallback>
      <!-- loading内容 -->
      <h2>Loading...</h2>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';
// 引入组件：静态引入和动态引入

// Vue2中的动态引入:(在Vue3中这种写法不行)
// const AsyncComponent = () => import('./AsyncComponent.vue');

// 很长，需要用到组合API中的方法
// const AsyncComponent = defineAsyncComponent(() => import('./AsyncComponent.vue'))
// 动态加载组件时，如果网速有点慢，就会出现页面空白的情况，对于交互不是很友好

// 组件中返回promise，这边用静态引入方式, 这样来模拟异步加载
// 因为promise是异步的，所以这里不再需要通过动态加载来模拟异步了

// 不仅可以用返回 new promise的方式，还可以用 async await的方式来达到异步的方式


// import AsyncComponent from './AsyncComponent.vue';

import AsyncAddress from './AsyncAddress.vue';

export default defineComponent({
  name: 'App',
  components: {
    // AsyncComponent
    AsyncAddress
  }
});
</script>

<style>
</style>