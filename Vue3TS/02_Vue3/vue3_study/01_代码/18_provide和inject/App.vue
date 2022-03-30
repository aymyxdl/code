<template>
<h2>父级组件</h2>
<h2>当前颜色：{{ color }}</h2>
<button @click="color = 'red'">红色</button>
<button @click="color = 'yellow'">黄色</button>
<button @click="color = 'green'">绿色</button>

<button @click="update">更改人名</button>

<br>
<son />
</template>

<script lang="ts">
import { defineComponent, inject, provide, reactive, ref } from 'vue';
import Son from './components/Son.vue';

export default defineComponent({
  name: 'App',
  components: {
    Son,
  },
  setup() {
    const color = ref('red');
    const obj = reactive({
      name: 'Tom',
      gender: 'male',
      age: 10
    })
    provide('color', color);
    provide('person', obj);

    const update = () => {
      obj.name += 1
    }

    return {
      color,
      update
    }
  }
});
</script>

<style>
</style>