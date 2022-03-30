<template>
  <h2 :style="`color: ${color}`">GrandSon孙子组件</h2>
  {{ color }}
  {{ person }}

  
  <button @click="update">孙子组件更改年龄</button>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';

export default defineComponent({
    name: 'GrandSon',
    setup() {
        // 注入的操作
        const color = inject('color');
        const person: any = inject('person');

        
        const update = () => {
            person.age += 1
        }


        return {
            color,
            person,
            update
        }
    }
});
</script>

<style>
</style>