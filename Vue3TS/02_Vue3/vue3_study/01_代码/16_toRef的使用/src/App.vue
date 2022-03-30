<template>
  <h2>toRef的使用特点:</h2>
  <h3>stage: {{ stage }}</h3>
  <h3>age: {{ age }}</h3>
  <h3>money: {{ money }}</h3>

  <hr>
  <button @click="update1">ref update1 age</button>
  <br>
  <button @click="update2">toRef update2 money</button>
  <br>

  =========================

  <child :age="age" />
  
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRef } from 'vue';
import Child from './components/child.vue'

export default defineComponent({
  name: 'App',

  components: {
    Child
  },

  setup() {
    const stage = reactive({
      age: 5,
      money: 100
    });

    // 把响应式数据stage对象中的某个属性age变成了ref对象

    // 把响应式对象中的某个属性使用ref进行包装，变成了一个ref对象
    const age = ref(stage.age)
    const money = toRef(stage, 'money');

    const update1 = () => {
      age.value += 1;
      // stage.money += 2;
    }
    const update2 = () => {
      money.value += 1;
      // stage.money += 2;
    }



    // 这里有个初步总结：
    // const stage = {
    //   age: 5,
    //   money: 100
    // };
    // ref 是深拷贝（和原来数据的地址已经不同了，所以改变ref对象的值，不影响原数据的值，而且ref会影响UI的刷新）
    // toRef 是浅拷贝（和原来数据公用地址，所以改变toRef对象的值，原数据的值也会一起变化，不会影响UI的刷新，这时因为 stage 不是响应式数据，所以UI不更新）


    // 但是，如果把stage改成响应式的
    // const stage = reactive({
    //   age: 5,
    //   money: 100
    // });

    // toRef刷新也会导致UI更新（但是不要误会，并不是toRef导致的UI变化，而是stage变成了响应式，是由stage引起的UI变化）

    // 所以toRef 并不会影响UI的变化

    return {
      stage,
      age,
      money,
      update1,
      update2,
    }
  }
});
</script>

<style>
</style>