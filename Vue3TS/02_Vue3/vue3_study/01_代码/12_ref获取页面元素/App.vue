<template>
<h2>ref的另一个作用，可以获取页面中的元素</h2>
<input type="text" ref="inputRef">
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'App',

  // 需求：当页面加载完毕后，页面中的文本框可以直接获取焦点(自动获取焦点)

  setup() {
    // 默认是空的，页面加载完毕，说明组件已经存在了，获取文本框元素
    const inputRef = ref<HTMLElement | null>(null);

    //页面加载后的生命周期组合API
    onMounted(() => {
      // 有一点不明白，setup是最早的生命周期，这时候this都没有
      // 这期间 inputRef 也是null
      // 什么时候就变成了 元素对象了？什么时候，在哪里赋值的？
      inputRef.value?.focus();
    });

    return {
      inputRef
    }
    
  }
});
</script>

<style>
</style>