<template>
  <h2>readOnly和shallowReadOnly</h2>
  <!-- <h3>state: {{ state }}</h3> -->
  <h3>state2: {{ state2 }}</h3>

  <hr>
  <button @click="update">update</button>
</template>

<script lang="ts">
import { defineComponent, reactive, readonly, shallowReadonly } from 'vue';

export default defineComponent({
  name: 'App',

  setup() {
    // 写法用错了
    // 应该是用reactive响应式，在使用函数
    // const state = readonly({
    //   name: 'sasuke',
    //   age: 17,
    //   cars: {
    //     name: 'benz',
    //     color: 'yellow'
    //   }
    // });

    // const state2 = shallowReadonly({
    //   name: 'sasuke',
    //   age: 17,
    //   cars: {
    //     name: 'benz',
    //     color: 'yellow'
    //   }
    // });

    const state = reactive({
      name: 'sasuke',
      age: 17,
      cars: {
        name: 'benz',
        color: 'yellow'
      }
    });

    // 只读的数据----深度的只读
    // const state2 = readonly(state);

    // 只读的数据----浅只读的
    const state2 = shallowReadonly(state);


    const update = () => {
      // state2.name += '---';
      // state2.cars.name += '---';

      // state2.name += '---';
      state2.cars.name += '---';
    }

    return {
      // state,
      state2,
      update
    }
  }
});
</script>

<style>
</style>