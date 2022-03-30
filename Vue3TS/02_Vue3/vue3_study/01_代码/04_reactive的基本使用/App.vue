<template>
  <h2>reactive的基本使用</h2>
  <h3>名字：{{ user.name }}</h3>
  <h3>性别：{{ user.gender }}</h3>
  <h3>年龄：{{ user.age }}</h3>
  <h3>媳妇：{{ user.wife }}</h3>
  <button @click="updateUser">点击</button>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'App',

  // 需求：现实用户的相关信息，点击按钮，可以更新用户的相关信息数据
  setup() {
    // 把数据变成响应式的数据
    // 返回的是一个Proxy的代理对象，被代理者就是reactive中传入的对象
    // const user = reactive({
    //   name: '小明',
    //   age: 20,
    //   wife: {
    //     name: '小甜甜',
    //     age: 18,
    //     cars: ['宝马', '奔驰', '奥托']
    //   }
    // })

    // 换一种写法
    // const obj: any = { //是为了写obj.gender = '男' 的时候不出现错误才这么书写
    const obj = {
      name: '小明',
      age: 20,
      wife: {
        name: '小甜甜',
        age: 18,
        cars: ['宝马', '奔驰', '奥托']
      }
    }
    // 返回的是一个Proxy的代理对象，被代理的目标对象是就是obj对象
    // user现在就是代理对象，obj是目标对象
    // user对象的类型是 proxy
    const user = reactive(obj);

    // 会发现user不是普通的对象，而是一个代理对象
    console.log(user);
    

    // 方法
    // function updateUser () {}

    const updateUser = () => {
      // 直接使用目标对象的方式来更新目标对象中的成员的值，是不可能的
      // 只能使用代理对象的方式来更新数据（响应式数据）
      // obj.name += '333'

      // 下面的可以
      // user.name += '==';
      // user.age += 2;
      // user.wife.name = '大甜甜'
      // user.wife.cars[0] = '玛莎拉蒂'

      // user ----> 代理对象， obj ----> 目标对象
      // user对象或者obj对象添加一个新的属性，哪一种方式会影响界面的更新
      // obj.gender = '男';   //  这种方式，界面没有更新渲染
      // 这里报错，也可以在obj: any处理
      // 或者使用泛型 const user = reactive<any>(obj);
      // user.gender = '男';     // 这种方式，界面可以更新渲染，而且这个数据最终也添加到了obj对象上了


      // user对象或者obj对象中移除一个已经存在的属性，哪一种方式会影响界面的更新
      // delete obj.age  //  界面没有更新渲染，但是obj中确实没有了age这个属性  // 另外 obj.age有波浪线不知道为什么，但是没报错
      // delete user.age;  //    界面更新渲染了，obj中确实没有了age这个属性
      
      // 结论：如果操作代理对象，目标对象中的数据也会随之变化，同时如果想要在操作数据的时候，界面也要跟着重新更新渲染
      // 那么也要操作代理对象

    }

    return {
      user,
      updateUser
    }
  }
});
</script>

<style>
</style>
