<template>
  <h2>计算属性和监视</h2>
  <fieldset>
    <legend>姓名操作</legend>
    姓氏：<input
      type="text"
      placeholder="请输入姓氏"
      v-model="user.firstName"
    />
    <br />
    姓氏：<input type="text" placeholder="请输入名字" v-model="user.lastName" />
    <br />
  </fieldset>
  <fieldset>
    <legend>计算属性和监视的演示</legend>
    姓名：<input type="text" placeholder="显示姓名" v-model="fullName1" />
    <br />
    姓名：<input type="text" placeholder="显示姓名" v-model="fullName2" />
    <br />
    姓名：<input type="text" placeholder="显示姓名" v-model="fullName3" />
    <br />
  </fieldset>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  watch,
  watchEffect,
} from "vue";

export default defineComponent({
  name: "App",

  setup() {
    // 定义一个响应式对象
    const user = reactive({
      // 姓氏
      firstName: "东方",
      // 名字
      lastName: "不败",
    });

    // 通过计算属性的方式，实现第一个名字的显示
    // vue3中的计算属性
    // 计算属性的函数中如果只传入一个回调函数，表示的是get

    // 第一个姓名：
    // 返回的是一个Ref类型的对象
    const fullName1 = computed(() => {
      // console.log(1);
      return user.firstName + "_" + user.lastName;
    });

    // 第二个姓名
    // 如果需要get和set，那么必须传入一个对象，而不是直接的
    const fullName2 = computed({
      get() {
        // console.log(2);
        return user.firstName + "_" + user.lastName;
      },
      set(val: string) {
        // console.log('====', val);
        // console.log(3);
        const names = val.split("_");
        user.firstName = names[0];
        user.lastName = names[1];
      },
    });

    // 监视----监视指定的数据
    const fullName3 = ref("");
    // watch(user, (val) => {})
    // 或者使用解构
    watch(user, ({firstName, lastName}) => {
      // console.log(4);
      fullName3.value = firstName + '_' + lastName;
    }, { immediate: true, deep: true })
    // immediate 默认会执行一次watch, deep 深度监视

    // 监视，不需要配置immediate,本身默认就会进行监视(默认执行一次)
    // watchEffect(() => {
    //   console.log(5);
    //   fullName3.value = user.firstName + "_" + user.lastName;
    // })

    // 监视fullName3的数据，改变firstName和lastName
    // 个人结论： watchEffect 到底监听哪些参数
    // 不像 watch 需要指定监听的参数
    // watchEffect不需要指定，它会默认监听表达式右边的属性(如果右边的属性有外部属性: 也就是return的，它就会自动监听)
    // 这些监听的属性如果发生了改变，就会进入到watchEffect中来
    watchEffect(() => {
      // console.log(6, fullName3.value);
      const names = fullName3.value.split("_");
      // console.log(user.firstName);
      // console.log(user.lastName);
      user.firstName = names[0];
      user.lastName = names[1];
      // console.log('来来来');


      // 个人尝试
      // 另外，如果这里面改变了fullName3的值，或者外面watch或者computed改了fullName3的值，
      // 非常容易陷入死循环
      // setTimeout(() => {
      //   console.log(user.lastName, names[1], '加之前');
      //   user.lastName = names[1] + '---';
      //   console.log(user.lastName);
      //   console.log('来来来');
      // }, 3000)
      
    });

    // watch---可以监视多个数据的
    watch([() => user.firstName, () => user.lastName, fullName3], () => {
      // 这里因为firstName和lastName是reactive对象中的属性
      // 所以在watch中需要由函数来指定
      // 而fullName3 Ref类型的，所以不需要函数的写法
      console.log('----');
      // fullName3.value = user.firstName + '_' + user.lastName;
    })

    return {
      user,
      fullName1,
      fullName2,
      fullName3,
    };
  },
});
</script>

<style>
</style>