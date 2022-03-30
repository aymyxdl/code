<template>
  <h2>toRefs的使用</h2>
  <!-- <h3>name: {{ state.name }}</h3>
  <h3>age: {{ state.age }}</h3> -->

  <!-- 我希望不使用 state. 而直接使用age，name,这是setup中的return使用 ...state -->
  <h3>name: {{ name }}</h3>
  <h3>age: {{ age }}</h3>

    <h3>name2: {{ name2 }}</h3>
  <h3>age2: {{ age2 }}</h3>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

// 模拟hook
function useFeatureX() {
  const state = reactive({
    name2: '自来也2',
    age2: 472
  });
  return {
    // state //不适合返回
    // ...state //也不适合返回
    ...toRefs(state)
  }
}

export default defineComponent({
  name: 'App',
  setup() {
    const state = reactive({
      name: '自来也',
      age: 47
    });

    // toRefs可以把一个响应式对象转换成普通对象，该普通对象的每个 property都是一个ref
    // const state2 = toRefs(state);
    // console.log(state2);
    const { name, age } = toRefs(state);

    // 那么一般什么时候使用toRefs呢？
    // 一般都是在使用外部hook的地方用到，上面进行模拟
    // 这里使用
    const { name2, age2} = useFeatureX();


    // 定时器，更新数据(如果数据变化了，界面也会随之变化，肯定是响应式数据)
    setInterval(() => {
      // state.name += '===';
      // name2.value += '--'
      console.log('------');
    }, 1000)

    return {
      // state
      // 下面的方式不行
      // ...state, // 不是响应式的数据了----> { name: '自来也', age: 47}
      // ...state2
      name,
      age,
      name2,
      age2
    }
  }
});
</script>

<style>
</style>