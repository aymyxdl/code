项目地址
https://www.bilibili.com/video/BV1ra4y1H7ih


视频名称
尚硅谷2021最新Vue.JS教程快速入门到项目实战（Vue3/VueJS技术详解）

我是从 p41开始的，前面的ts介绍没看





vue3的几个重要点：
使用Proxy 代替 defineProperty实现数据响应式
重写虚拟DOM的实现 和 Tree-Shaking

新增 Composition(组合) API





Tree-Shaking 摇树是什么：

webpack有一个入口文件
可以把入口文件看作树干
引入的一些其他依赖包文件看成树枝

然后打包渲染的时候，把没有用到的代码内容删掉
变得更加简洁，打包变得更小




------



两种创建项目的方式：

1.使用cli脚手架，也就是  vue-cli
2.使用vite脚手架


这里推荐使用cli脚手架
首先安装 cli脚手架

1.npm install -g @vue/cli

安装成功验证： vue -V  或者 vue -v
然后使用create命令创建项目

2.vue create 项目名称
vue create vue3_demo01

这时候会提示创建vue的版本
使用键盘上下键选择vue3版本


3.创建成功，直接使用命令跑起来项目就行（热加载的）


-------------


vite创建项目

npm init vite-app 项目名称
npm install
npm run dev (默认不是serve)


---
yarn create vite-app 项目名称
yarn
yarn dev





===========


vite 的编译速度比 vue-cli 快很多


但是vue-cli更稳定一些，模块也更多一些
所以目前还是推荐用cli
当然，如果你对编译速度有要求，也可以使用vite






-----------但是我们这里因为是使用vue3 + ts

所以使用 vue create 项目 的时候，不能选择第二个，因为没有ts
我们要选择第三个选项
选了第三个之后，不能立即回车
使用空格 选择勾选上 typescript，其他的一些选项看需求勾选（我们这里不需要）
然后一路回车




----------

p42

vue3里面无需使用根标签










----------

p43




import { defineComponent } from 'vue';

// 和vue2暴露出去一个定义好的组件不同的是
// 这里是调用一个函数
// 函数的最终返回值是一个对象，然后把这个对象暴露出去
这里使用 defineComponent()
export default defineComponent({
  // 当前组件的名字是 App
  name: 'App',
  components: {}
});



-----------

p44  setup


export default defineComponent({
  name: 'App',
  // setup是组合API中第一个要使用的函数

  setup () {
    console.log(222222);
    const number = 10;
    return {
      number
    }
  }
});


setup 相当于是一个整合容器
把以前vue2里面的 对象，函数，还有一些钩子函数都包在里面了

代码可以在setup里面直接写




-----------

p45  ref


单纯的声明变量，然后通过setup返回，
并不会得到响应式的数据

要通过 ref 这些函数，才能得到响应式的数据
而且函数返回的是一个对象
要通过 .value 才是我们要的那个数据

ref 一般用来定义一个基本类型的响应式数据


-----------

p46  reactive

返回的是一个Proxy的代理对象，被代理者就是reactive中传入的对象

直接使用目标对象的方式来更新目标对象中的成员的值，是不可能的
只能使用代理对象的方式来更新数据（响应式数据）



-----------

p48  proxy代理原理



reflect 是不可构造的（也就是不能 new 对象，只能使用reflect的静态方法）
而且 reflect 是配合 proxy里面的 handler对象进行使用的




-----------

p50  setup执行机制

vv3 快捷键生成代码片段


setup的返回对象中的属性 和 data函数中的对象中的属性 会合并为组件对象的属性（合并）
方法也和 methods 合并

在Vue3中尽量不要混合的使用data和setup及methods和setup(既然用了vue3，推荐使用setup)

一般不要混合使用：methods中可以访问setup提供的属性和方法，但是在setup方法中不能方位data和methods
因为刚刚开始说过的，setup的生命周期是最早的，那时候还没有this,所以根本无法使用this去调用data和methods
set不能是一个async函数： 因为返回值不再是retrun的对象，而是promise，模板看不到return对象中的属性数据




-----------

p52  setup的参数


setup(props, {attrs, emit, slots})

props 是组件上传递的参数（但是需要在子组件中进行props的声明，才会放到props这里）

attrs 是组件上传递的参数（这里的属性是没有在props里面声明的）

子组件：


export default defineComponent({
  name: "Child",
  props: {                // 意思就是props这里声明了的，会放在 setup的props中
    msg: {                // 而这里没有声明的，但是在组件上传递了的，会放到 setup 的 attrs中
      type: String,
      default: () => 'hello'
    }
  },
  setup(props, {attrs, emit, slots}) {
  }
}

emit 是组件上传递的方法（ emit('方法名', 参数) ）
 


另外，props 只是用来接收参数的（属性，对象），而不是接收函数的

因此哪怕props: {} 里面声明了type: Function 的同名函数
要调用父组件传进来的函数的话，还是需要使用emit()







-----------

p52  ref和reactive的细节问题



ref用来处理基本类型数据，reactive用来处理对象(递归深度响应式)
如果用ref 来处理 对象/数组，内部会自动将对象/数组转换成reactive的代理对象
ref内部：通过给value属性添加getter/setter来实现对数据的劫持
reactive内部：通过使用Proxy来实现对 对象内部所有数据的劫持，并通过Reflect操作对象内部数据




-----------

p52  计算属性和监视

vue3中的计算属性也是写在setup中的

但是需要引入 computed 函数


import { computed, defineComponent, watch, watchEffect, } from "vue";

setup() {
  // 而且使用方式和vue2不一样
  // 计算属性的函数中如果只传入一个回调函数，表示的是get

  const fullName1 = computed(() => {
    // console.log(1);
  });

  // 如果需要get和set，那么必须传入一个对象，而不是直接的简略写法的一个函数
  const fullName2 = computed({
    get() {
      // console.log(2);
    },
    set(val: string) {
      // console.log('====', val);
    },
  })
}


// computed 返回的是一个Ref类型的对象





--------


vue3 中的watch，也是需要引入的，引入一个函数，不需要返回值，直接调用函数
第一个参数是监视的对象，第二个参数一个回调函数
第三个参数是配置项


watch(user, ({firstName, lastName}) => {
  // console.log(4);
  fullName3.value = firstName + '_' + lastName;
}, { immediate: true, deep: true })
// immediate 默认会执行一次watch, deep 深度监视


或者使用watchEffect

// 监视，不需要配置immediate,本身默认就会进行监视(默认执行一次)
// watchEffect(() => {})




watchEffect：
1.它是立即执行的，在页面加载时会主动执行一次，来收集依赖
2.不需要传递需要侦听的内容，它可以自动感知代码依赖，只需要传递一个回调函数
3.它不能获取之前数据的值
4.它的返回值(是个方法名，加括号就可以直接调用方法)
用来停止此监听（比如在回调里面写定时器调用返回值，就可以几秒后停止改监听）


watch : 
1.具备一定的惰性 lazy （ 但可配置 immediate , 使其主动）
2.参数可拿到更改之前的值和更改之后的值
3.可以侦听多个数据的变化，用一个侦听器承载(这里的意思是多个参数，共用一个函数逻辑处理)
如果要写多个不同逻辑的处理代码，那就要写多个watch函数


// watch---可以监视多个数据的
watch([() => user.firstName, () => user.lastName, fullName3], () => {
  // 这里因为firstName和lastName是reactive对象中的属性
  // 所以在watch中需要由函数来指定
  // 而fullName3 Ref类型的，所以不需要函数的写法
  console.log('----');
  // fullName3.value = user.firstName + '_' + user.lastName;
})







-----------

p56  计算属性和监视


vue3

beforeCreate
created
beforeMount
mounted
beforeUpdate
updated
beforeUnmount  => beforeDestory
unmouted  => destroyed



setup  => 对应 beforeCreate，created 但是要比它们先执行
onBeforeMount
onMounted
onBeforeUpdate
onUpdated
onBeforeUnmount
onMounted


所有的3.x的同生命周期都比 2.x的要早执行




-----------

p56  自定义hook函数



说白了，自定义hook函数，就是把代码封装起来，放到一个ts文件中，避免代码冗余，然后在主文件中引入这个功能，然后调用一下方法得到结果
这样就显得代码很简洁

类似于vue2的mixin(混入)





-----------

p59  toRefs

const state = reactive({
  name: '自来也',
  age: 47
});


// toRefs可以把一个响应式对象转换成普通对象，该普通对象的每个 property都是一个ref
const { name, age } = toRefs(state);



比如html模板中要 使用 state.name , state.age
这样觉得写的好累，想直接使用 name, age
单纯的在返回中解构是不生效的，不会变成响应式
return {
  ...state
}



因此使用toRefs  
const { name, age } = toRefs(state);
return {
  name,
  age
}




-----------

p60  ref的另一个作用

获取dom元素

<input type="text" ref="inputRef">

setup() {
  // 默认是空的，页面加载完毕，说明组件已经存在了，获取文本框元素
  const inputRef = ref<HTMLElement | null>(null);


  //页面加载后的生命周期组合API
  onMounted(() => {
    // 有一点不明白，setup是最早的生命周期，这时候this都没有
    // 这期间 inputRef 也是null
    // 什么时候就变成了 元素对象了？什么时候，在哪里赋值的？
    inputRef.value?.focus();
  });

  return {
    // 要配合 dom节点的 ref='inputRef'使用
    inputRef
  }
}





-----------

p61  shallowReactive 和 shallowRef



// 深度劫持(深监视)----深度响应式
reactive


// 浅劫持(浅监视)----浅响应式
shallowReactive


// 深度劫持(深监视)----深度响应式----做了reactive的处理
ref

// 浅劫持(浅监视)----浅响应式  
// /这里要用泛型，是因为 shallowRef 是用来处理一般数据类型的，而你非要处理对象类型，所以要泛型
const m4 = shallowRef<{} | string>({
  name: 'naruto',
  age: 17,
  cars: {
    name: '奔驰',
    yellow: 'red'
  }
});





-----------

p62  readonly 和 shallowReadonly



// 只读的数据----深度的只读
const state2 = readonly(state);

// 只读的数据----浅只读的
const state2 = shallowReadonly(state);


// 为啥有浅只读？因为深度的所有属性都不可修改，会报错
// 而浅只读，只是第一层属性不可修改，如果你属性还是个对象，这个深层次的属性是可以修改的，不会报错





-----------

p63  toRaw 和 markRaw



toRaw把 reactive之后的响应式代理对象 变回 普通对象，数据变化，界面不变化

markRaw 让对象变成不能reactive的（一个普通对象被markRaw后，就不会再被 reactive  变成响应式的数据）

这两个场景用的比较少





-----------

p64  toRef


ref 是对传入数据的拷贝(深拷贝，一个新的数据)
toRef 是对传入数据的引用(浅拷贝，共用地址)

// ref 是深拷贝（和原来数据的地址已经不同了，是两个数据了，所以改变ref对象的值，不影响原数据的值，而且ref会影响UI的刷新）
// toRef 是浅拷贝（和原来数据公用地址，所以改变toRef对象的值，原数据的值也会一起变化，不会影响UI的刷新，这时因为 stage 不是响应式数据，所以UI不更新）

当然toRef不影响UI更新的前提是，它的属性所在的那个对象并不是响应式数据（整体对象没有经过 reactive）





-----------

p64  customeRef 自定义ref

不想看，用的少






-----------

p64  provide和 inject

实现跨层级组件传值



非常简单，只要在爷爷组件中使用 provide 传入对象

const obj = reactive({
  name: 'Tom',
  gender: 'male'
})

provide('参数名1', obj)


---

在孙子组件中使用 inject  接收参数

const xxx = inject('参数名1')




这样既可以在爷爷组件中修改数据
也可以在孙子组件中修改数据

// 个人感觉比vue2的单向数据流好用一点？
// 因为vue2 不推荐在子组件中修改父组件的值
// 而vue3这里并没有报错和警告，个人用的还可以









-----------

p84  vue3面试题简述


1.vue3中设计了组合api  composition API 代替了 之前vue2的 option API，复用性更强了

vue2的时候，代码要分别写在 data,methods,watch,computed 里面
而vue3只要直接写在setup中就行，很多时候，就不用写重复的代码了

2.更好的支持TS

3.最主要，vue3使用 Proxy 配合 Reflect 代替了vue2的 Object.defineProperty() 方法实现数据的响应式(数据代理)

4.重写了虚拟DOM，速度更快了

5.新的组件：Fragment(片段) / Teleport(瞬移) / Suspense(不确定)

6.设计了新的脚手架工具：vite，启动更快，打包更小










