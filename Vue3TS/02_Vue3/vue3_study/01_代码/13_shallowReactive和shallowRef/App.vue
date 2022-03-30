<template>
  <h2>shallowReavtive和shallowRef</h2>
  <h3>m1: {{ m1 }}</h3>
  <h3>m2: {{ m2 }}</h3>
  <h3>m3: {{ m3 }}</h3>
  <h3>m4: {{ m4 }}</h3>

  <hr>
  <button @click="update">更新数据</button>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, shallowRef, shallowReactive } from 'vue';

export default defineComponent({
  name: 'App',

  setup() {
    
    // 深度劫持(深监视)----深度响应式
    const m1 = reactive({
      name: 'naruto',
      age: 17,
      cars: {
        name: '奔驰',
        yellow: 'red'
      }
    });

    // 浅劫持(浅监视)----浅响应式
    const m2 = shallowReactive({
      name: 'naruto',
      age: 17,
      cars: {
        name: '奔驰',
        yellow: 'red'
      }
    });


    // 深度劫持(深监视)----深度响应式----做了reactive的处理
    const m3 = ref({
      name: 'naruto',
      age: 17,
      cars: {
        name: '奔驰',
        yellow: 'red'
      }
    })


    // 浅劫持(浅监视)----浅响应式
    const m4 = shallowRef<{} | string>({
      name: 'naruto',
      age: 17,
      cars: {
        name: '奔驰',
        yellow: 'red'
      }
    });

    const update = () => {
      // 更改m1的数据----reactive方式
      // m1.name += '==';
      // m1.cars.name += '===';

      // 更改m2的数据----shallowReactive方式
      // m2.name += '==';
      // 上面这行如果不注释，下面这行也会成果
      // m2.cars.name += '===';

      // 更改m3的数据----ref方式
      // m3.value.name += '==';
      // m3.value.cars.name += '===';

      // 更改m4的数据----shallowRef方式
      // 下面2行修改对象都没有响应式
      // m4.value.name += '==';
      // m4.value.cars.name += '===';


      // 这里直接修改value就可以成果(不过定义的时候需要加上泛型)
      // m4.value = '????';

      // 这是因为 shallowRef: 只处理了value的响应式，不进行对象的reactive处理
      // shallowRef()一般是用来做基本类型的响应式，而这里非要处理对象
      // 那么 正常的 ref会用reactive进行处理
      // 但是shallowRef不会，所以对象参数不会变成响应式的

      // console.log(m3, m4);
    }

    return {
      m1,
      m2,
      m3,
      m4,
      update
    }
  }
});
</script>

<style>
</style>