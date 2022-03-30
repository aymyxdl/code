<template>
  <h2>App父级组件</h2>
  <h2>msg: {{ msg }}</h2>
  <button @click="msg += '==='">更新数据</button>
  <hr>
  <child :msg="msg" msg2="真香" @aaa="bbb" @ddd="ddd" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
// 引入子级组件Child
import Child from './components/Child.vue';

export default defineComponent({
  name: 'App',
  components: {
    Child
  },

  setup() {
    // 定义一个Ref类型的数据
    const msg = ref('what are u');

    const bbb = (txt: string) => {
      // 因为msg 是 const类型，所以直接加会报错？
      // msg += txt;

      // 为什么使用msg.value没问题？
      // （是因为msg不是字符串，而是一个Ref对象，const对应的也不是字符串，是Ref对象，这也是上面的原因）
      msg.value += txt;
    }
    const ddd = (txt: string) => {
      msg.value += txt + '13';
    }
    return {
      msg,
      bbb,
      ddd
    }
  }
});
</script>

<style>
</style>