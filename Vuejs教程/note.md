视频地址：

https://www.bilibili.com/video/BV15741177Eh?from=search&seid=1619756536099140063

视频名称：
最全最新Vue、Vuejs教程，从入门到精通



这个视频是2019-12月录制的 ，现在学习的时间是 2021-4-27
不知道这个版本会不会有点旧








渐进式框架


可以将vue作为项目的一部分进行开发

比如：一个大型的项目，可以将其中一个大型功能使用vue进行重构
然后一步一步的逐渐全部重构
一点一点的过程，就可以把它叫做渐进式的



vue的高级功能
1. 解耦视图和数据
2. 可复用的组件
3. 前端路由技术
4. 状态管理
5. 虚拟DOM





=========

P4：

new Vue(对象)   => 参数是一个对象

new Vue({
  el: '',               // 用于挂载要管理的元素
  data: {}              // 定义数据
})




编程范式：命令式编程

命令式编程：就是一步一步告诉你怎么做，明确的告诉你下一步怎么做才不会出问题

就比如之前的jquery，

vue不是命令式，而是

编程范式：声明式编程



好处：数据和页面 完全分离


什么叫响应式：当数据发生变化的时候，界面会自动进行响应，进行修改





P6: 
12分钟



会出现一个问题：

我们在methods里面使用data里的变量的时候

new Vue({
  el: '',
  data: {
    a,
    b
  },
  methods: {
    test: function () {
      this.a;
    }
  }
})


都是在test中直接通过 this.a, this.b 来调用的(我以前老是会写成this.data.a)

按理来说，这个this在实际执行的过程中，会指向调用此方法的对象

一般都是 指向methods对象
再不济也是 指向 app这个实例

怎么也不会把this指向了 data这个属性啊
这时因为 vue内部做了代理设置 proxy
老师后面讲



就比如这个：

const test = {
  a: '我是test里面的a',
  data: {
    a: 'aaaaa',
    b: 'bbbbb'
  },
  methods: {
    a: '我是methods里面的a',
    getParam: function() {
      console.log(this);
      console.log(this.a);
    }
  }
}

test.methods.getParam();





p0-p6 无需再看，没有必要再看，都是熟透了的常识，看了浪费时间


有几个地方重点标出来了：
重点：


P4 会讲一个 编程范式

以前的jquery是 命令式编程
现在的vue是 声明式编程


P6 会提出一个问题：为什么方法中 this.a 能直接读取data里面的数据
然后简单的说明一下这时使用了代理 proxy ，老师说后面会详细讲







=========


P7

MVVM


Model–view–viewmodel

View层：
视图层
在我们前端开发中，通常就是DOM层。
主要的作用是给用户展示各种信息。


Model层：
数据层
数据可能是我们固定的死数据，更多的是来自我们服务器，从网络上请求下来的数据。
在我们计数器的案例中，就是后面抽取出来的obj，当然，里面的数据可能没有这么简单。
(通俗点讲就是data)


VueModel层：
视图模型层
视图模型层是View和Model沟通的桥梁。
一方面它实现了Data Binding，也就是数据绑定，将Model的改变实时的反应到View中
另一方面它实现了DOM Listener，也就是DOM监听，当DOM发生一些事件(点击、滚动、touch等)时，可以监听到，并在需要的情况下改变对应的Data。
(通俗点讲就是vue的实例)



参考图片：




=========
P8: options

el: string | HTMLElement 
data: Object | Function

注意它们的类型， 
可以是dom结构
el: document.getElementById('#app')

可以是函数(在组件开发中，一定要写成函数)
data () {
  return {

  }
}





方法和函数的区别

方法：methods
函数：function

在全局下面定义的叫做 函数
在类(对象)中的叫做 方法



不过很多人都没有特意去区分，随便怎么叫




===========

生命周期:事物从诞生到消亡的过程

P9

vue的生命周期

创建vue实例的时候，表面看着简单只有new vue了一下
其实这个过程中内部是做了很多事情的，一步一步操作接着执行，
而在这个过程中，我希望你(vue实例)执行到某一部操作的时候，告诉我你进行到第几步操作了
通知我一声，因为我需要在不同的操作上面，做对应的某些事情


这就是我们理解生命周期的意义

首先，我们先理解有生命周期，
然后，再理解当它执行到某个阶段的时候
它会对我们开始定义的函数，进行回调(生命周期钩子函数：其实就是回调函数)




=======

P10



生命周期钩子函数，本质上就是回调函数
当内部代码顺序执行到某一步的时候，内部就会通过callHook函数调用一下这个时期对应的回调函数

hook: 钩子

所以生命周期函数也叫钩子函数



========




P13


将一些不常用，但是偶尔有奇效的指令

v-once

该指令后面不需要跟任何表达式
该指令表示元素和组件(组件后面才会学习)只渲染一次，不会随着数据的改变而改变。


v-html

某些情况下，我们从服务器请求到的数据本身就是一个HTML代码
url: '<a href="http://www.baidu.com">百度一下</a>'
<div v-html="url"></div>

v-text

v-text作用和Mustache比较相似：都是用于将数据显示在界面中
但是一般很少用，因为不够灵活，它是渲染覆盖之前的内容

<div>{{ message }}, hhh </div>
<div v-text="message">这里的内容会被覆盖</div>



v-pre

v-pre用于跳过这个元素和它子元素的编译过程，用于显示原本的Mustache语法。
第一个h2元素中的内容会被编译解析出来对应的内容
第二个h2元素中会直接显示{{message}}


<h2>{{message}}</h2>
<h2 v-pre>{{message}}</h2>


v-cloak

cloak：斗篷的意思

用于将闪烁效果隐藏



因为浏览器解析html的时候，是从上往下顺序执行的
可能执行完了html的内容，但是加载js卡住了
就导致页面上直接展现的是 {{message}}
(可以用定时器把 new vue包裹住看下过)

这种情况，就不美观，可以用 v-cloak指令


在vue解析之前，div中有一个属性 v-cloak
在vue解析之后，vue会检查并删除这个属性

所以，还需要配合css来完成效果

style {
  [v-cloak]: {
    display: none
  }
}


不过这东西，后面基本上用不到，因为我们写的模板，都会被渲染成函数
到时候用的是虚拟dom




=========

P14 v-bind


mustache 语法只能在标签内(content处)使用


因为真实项目中，前台展示的数据，不可能是写死的，基本上都是从后台服务器取出来的
所以需要使用 v-bind 指令来动态展示数据

<img v-bind:src="imgSrc" />
或者 语法糖的写法
<img :src="imgSrc" />



=========

P15 v-bind动态绑定 class




1.字符串的形式：就是直接绑定变量

data: {
  active: 'active'
}

<h2 :class="active"></h2>

二.对象语法

2.直接对象的形式：

{key1: value, key2: value2}
{类名1: boolean, 类型2: boolean2}

当布尔值为true的时候，类名就会添加到标签上，false则不会
因此通过控制 布尔值来决定是否添加



data: {
  isActive: true,
  isLine: false
}
<h2 :class="{active: isActive , line: isLine}"></h2>

// 不过这里的类名通常用引号包起来，表示这时字符串(有的版本可以直接写)
<h2 :class="{'active': isActive , 'line': isLine}"></h2>


3.和普通的类同时存在，并不冲突 

=======

P16



指令中调用函数都要加上小括号： test()

@click 里面不加是因为自动给你省略，其它的地方一定需要加上



4.放在methods或者computed

<div :class="getLine()" @click="isLine = !isLine">测试class2{{ isLine }}</div>


视频评论有人说无效，我vue3测了，可以用，没问题





三：数组语法

<div :class="['active', 'line']">测试class</div>

<div class="active line">测试class</div>

有人可能会疑惑，既然数组和普通class一样，为什么还要用数组呢？

在数组中放变量

data: {
  active: 'aaa',
  line: 'bbb'
}

<div :class="[active, line]">测试class</div>





(代码测试)：：
vue3-create-project-default\src\components\vue_coderwhy\components\bindClass\BindClass.vue





================

P18

动态绑定style

两种方式：
对象语法
数组语法



<h2 :style={key(css的属性名): value(属性值)}></h2>

value 默认会认为是变量
如果想当成字符串，那么要用单引号包裹

<h2 :style="{fontSize: '50px'}"></h2>
<h2 :style="{'font-size': '50px'}">你好啊</h2>

fontSize 可以直接写
'font-size' 要加单引号




如果绑定的 :style 太长了，同样的可以写成methods或者computed



数组方式懒得写




(代码测试)：：
vue3-create-project-default\src\components\vue_coderwhy\components\bindStyle\BindStyle.vue





======

P20   计算属性



computed 能干的 methods里面也能干
不过因为调用方法需要额外加小括号 : {{ getFullName() }}
而 计算属性 则简洁明了 {{ fullName }}



computed
里面的函数起名虽然也可以叫做 getFullName 这种加get动词的
但是 computed 叫做计算属性
所以函数在起名字的时候 尽可能的按照属性 来起名



而计算属性 其实也是语法糖，默认只是实现了get方法



computed: {
  fullName: {
    set: function() {},
    get: function() {}
  }
}


但是我们一般希望只用fullName 的get属性
而不希望计算属性有set属性，只读属性

所以就有了语法糖的写法



计算属性和methods的对比

最重要的一点就是 计算属性的结果会进行缓存

当页面中多次调用计算属性的时候，实际上只会执行一次，后面的都是拿的缓存结果
而methods里面的方法，会多次调用

所以，在这方面，计算属性性能要更高





================
P25


为什么闭包能解决 var 没有块级作用域的问题？

因为函数是一个作用域(函数有自己的作用域)

函数有作用域，意味着内部的i一旦被赋值，不会(直接)被外面改变
外部的i你改变我管不住，我内部的i是我自己的，你改不了(当然，向外暴露，通过内部来改变肯定是可以的)


因为把i当作 闭包函数的参数传进来了
形参相当于在函数内部声明了一个变量


就像

var name = 'outer'

function foo(name) {
  window.name = 'changed';
  console.log(name)
}


或者这样理解

var name = 'outer';
function foo(name) {
  setTimeout(() => {
    console.log(name);
  }, 2000)
}
foo(name);
name = 'changed'


// 这种给立即执行函数传参 倒是可以用上面的形参比较详细的说明
for (var i = 0; i < 5; i += 1) {
  (function(i) {
    dom[i] = ...
  })(i)
}







// 这里没有给立即执行函数赋值，直接使用外部的 i ,不太好用上面的形参说得通
// 这里可以用尚学堂 js高级老师里面讲的来说明

for (var i = 0; i < 5; i += 1) {
  (function() {
    dom[i] = ...
  })()
}


闭包包含被引用变量(函数)的对象：
闭包是内部函数中包含了一个对象([[scope]].closure)，对象中有被引用的变量
这个变量的值就是当时外部变量的值
(而因为基本类型的值，赋值(拷贝)，都是在栈中重新开辟了一块内存来存放，然后两者就没有任何关系了)




进度：28没看



