<template>
  <h2>App父级组件</h2>
  <button @click="isShow = !isShow">切换组件</button>
  <br />
  <child v-if="isShow" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Child from './components/Child.vue';

export default defineComponent({
  name: "App",
  components: {
    Child
  },

  setup() {
    // 这里使用v-if来控制组件的显示隐藏
    // 是因为组件的挂载，卸载，可以更好的理解生命周期
    const isShow = ref(true);

    return {
      isShow
    }
  }
});
</script>

<style>
</style>