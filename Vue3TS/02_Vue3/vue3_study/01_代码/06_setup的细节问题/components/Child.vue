<template>
  <h2>Child子级组件</h2>
  <h2>{{ msg }}</h2>
  <!-- <h2>setup: {{ msg2 }}</h2>
  <h2>data: {{ count }}</h2> -->
  <button @click="ccc">分发事件</button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Child",
  props: {
    msg: {
      type: String,
      default: () => 'hello'
    },
    ddd: {
      type: Function,
      default: () => { console.log(1) }
    }
  },
  
  // setup细节问题：
  // setup是在beforeCreate生命周期回调之前就执行了，而且就执行一次
  // 由此可以推断出：setup在执行的时候，当前的组件还没有创建出来，也就意味着：组件实例对象this根本就不能用
  // this是undefined，说明：就不能通过this再去调用data/computed/methods/props中的相关内容了
  // 其实所有的composition API相关回调函数中也都不可以


  // setup返回值的细节：
  // setup中的返回值是一个对象，内部的属性和方法是给html模板使用的
  // setup中的(返回值)对象内部的属性和data函数中的return对象对象中的属性都可以在html模板中使用
  // setup中的对象中的属性和data函数中的对象中的属性会合并为组件对象的属性（合并）
  // setup中的对象中的方法和methods对象中的方法会合并为组件对象的方法(合并)
  // 在Vue3中尽量不要混合的使用data和setup及methods和setup(既然用了vue3，推荐使用setup)
  // 一般不要混合使用：methods中可以访问setup提供的属性和方法，但是在setup方法中不能方位data和methods
  // 因为刚刚开始说过的，setup的生命周期是最早的，那时候还没有this,所以根本无法使用this去调用data和methods
  // set不能是一个async函数： 因为返回值不再是retrun的对象，而是promise，模板看不到return对象中的属性数据


  // 数据初始化的生命周期回调
  /* beforeCreate() {
    console.log('beforeCreated执行了');
  },

  setup() {
    console.log('setup执行了', this);

    const msg2 = ref('msg2!!!!');

    const showMsg1 = () => {
      console.log('setup中的 showMsg1!!!!!!');
    };
    
    return {
      msg2,
      showMsg1
      // setup中一般都是返回一个对象，对象中的属性和方法都可以再html模板中直接使用
    }
  },

  data() {
    return {
      count: 100
    }
  },

  // 页面渲染完毕(页面渲染后的生命周期回调)
  mounted() {
    // 注意，vue3中的this不再是普通的对象了，而是一个Proxy对象，可以输入看一下this，会发现是代理类型的对象
    console.log(this);
    this.showMsg2();
    
  },

  // 方法
  methods: {
    showMsg2() {
      console.log('methods中的 showMsg2~~~', this.msg2);
    }
  }, */

  // setup参数详解
  // 一般更多的是 解构 的写法
  // setup(props, context) {
  setup(props, {attrs, emit, slots}) {
    // props参数：包含sprop配置中 声明且传入了的 所有属性的对象
    // 换句话说：就是一个proxy对象，里面有父级组件向子级组件传递的数据，并且是在子级组件中使用props接收到的所有的属性
    
    // console.log('props----', props);
    // console.log(props.msg);

    // context参数，是一个对象，里面有attrs对象，emit方法(分发事件的)，slots对象(插槽)
    // attrs: 包含没有在props配置中声明的属性的对象，相当于 this.$attrs
    // 换句话说：(获取当前组件标签上的所有的属性的对象，但是该属性是在props中没有声明接收的所有的属性的对象)

    // console.log(context.attrs);
    // console.log(context.attrs.msg2);
    // console.log('emit----', emit);

    // emit的分发事件
    // 按钮的点击事件的回调函数
    const ccc = () => {
      // setup中的this的undefined，那么如何调用emit等方法呢？
      // this.$emit('ccc', '你好');
      // 这个时候就要用到context方法了
      // context.emit('aaa', 'hello');
      emit('aaa', 'hello');    // 可以成功调用aaa
      // emit('ddd', 'hello');    // 可以成功调用ddd
      // props.ddd('prop.ddd')       // 这个只会调用上面默认的console.log(1), 而不是调用组件上传递的ddd方法
    }

    // slots后面讲
    
    return {
      ccc,
    }
    
  }
});
</script>

<style>
</style>
