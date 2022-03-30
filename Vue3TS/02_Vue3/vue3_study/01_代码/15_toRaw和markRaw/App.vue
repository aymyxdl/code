<template>
  <h2>toRaw和markRaw</h2>
  <h3>state: {{ state }}</h3>

  <br>

  <button @click="testToRaw">测试toRaw</button>
  <button @click="testMarkRaw">测试markRow</button>
</template>

<script lang="ts">
import { defineComponent, toRaw, markRaw, reactive } from 'vue';

interface UserInfo {
  name: string;
  age: number;
  likes?: string[];
}

export default defineComponent({
  name: 'App',
  setup() {
    const state = reactive<UserInfo>({
      name: 'xiaoming',
      age: 20
    })


    const testToRaw = () => {
      // 把代理对象变成了普通对象了，数据变化，界面不变化
      const state2 = toRaw(state);
      state2.name += '---';
      console.log(state2);
    };

    const testMarkRaw = () => {
      // state.likes = ['1', '2'];
      // state.likes[0] += '---';


      const likes = ['吃', '喝'];
      // markRaw标记的对象数据，从此以后都不能再称为代理对象了
      state.likes = markRaw(likes);
      setInterval(() => {
        if(state.likes) {
          state.likes[0] += '===';
          console.log(state);
        }

        // 为什么这样不可以？
        // state.likes?[0] += '===';
        
        // 写成这样可以，或者if判断
        // state.likes ? state.likes[0] += '===' : '';
        // 这样也可以
        // state.likes && (state.likes[0] += '===');
        console.log(state);
      }, 1000);
    };

    return {
      state,
      testToRaw,
      testMarkRaw
    }
  }
});
</script>

<style>
</style>