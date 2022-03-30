
视频地址：https://www.bilibili.com/video/BV1G54y1s7xV
视频名称：【尚硅谷】Vue源码解析之数据响应式原理


## P1

vue非侵入式


侵入式：需要其它的api(方法)
就比如小程序要更新数据,要修改数据，要调用setData方法

this.setData({
  a: 12
})


而vue不用，直接this.a = 12，这就是非侵入式



## P2 Object.defineProperty函数

Object.defineProperty()方法会直接在一个对象上定义一个新属性，或者修改
一个对象的现有属性，并返回此对象


var obj = {};
Object.defineProperty(obj, 'a', {
  value: 3
});
Object.defineProperty(obj, 'b', {
  value: 5
});
console.log(obj);
console.log(obj.a, obj.b);


// 可能会有人问，这个Object.defineProperty 用起来这么繁琐，
比直接var obj = { a: 3, b: 5 } 麻烦多了，为什么还要用defineProperty

这时因为defineProperty 可以智能的定义很多的隐藏属性
就比如：


Object.defineProperty(obj, 'a', {
  value: 3,
  // 是否可写：不可以修改，相当于常量了
  writable: false
});

Object.defineProperty(obj, 'b', {
  value: 5,
  // 是否可以被枚举： for (var key in obj) 不会被显示
  enumerable: false
});



getter/setter
叫的的时候叫 getter/setter
实际就是 get/set

Object.defineProperty(obj, 'a', {
  // value: 3, // 有了get就不能有value
  // getter
  get() {
    console.log('试图访问obj的a属性')
    // 如果没有返回值，直接输出obj是不会有a属性的
  }
  // setter
  set() {
    console.log('试图修改obj的a属性')
  }
});


其实这里已经就涉及到了vue的非侵入式的原理了
因为数据被get，set劫持了
我们访问它的属性，自动就进入到get，set





这里有一个小坑：用闭包存储get和set的值
get/set 就是 劫持数据




## P3 defineReactive函数

getter/setter需要变量周转才能工作（为什么？）

var temp;
Object.defineProperty(obj, 'a', {
  // getter
  get() {
    console.log('你试图访问obj的a属性');
    // return 7 // 这样就写死了
    return temp;
  },
  // setter
  set(newValue) {
    console.log('你试图改变obj的a属性', newValue);
    temp = newValue;
  }
});


因为obj.a 的值是get函数返回的值
但是get怎么知道返回的是什么？
如果固定写死7，每次都返回7，
哪怕后面修改了a的值，也还是返回7

所以就需要一个中间变量来进行周转
这里用一个全局变量temp，每次调用set函数，修改temp
然后get的时候，返回temp

这就是一个周转的过程


---

因为使用临时变量不太美观
所以把它封装到了一个函数当中

因此引出了defineReactive函数
而这个函数使用了闭包的特性

使用defineReactive函数不需要设置临时变量了，而是用闭包

因此 defineReactive 的作用就是提供了一个闭包环境



function defineReactive(data, key, val) {
  Object.defineProperty(data, key, {
    // 可枚举
    enumerable: true,

    // 可以被配置，比如可以被delete
    configurable: true,

    // getter
    get() {
      console.log('你试图访问obj的' + key + '属性');
      return val;
    },

    // setter
    set(newValue) {
      console.log('你试图改变obj的' + key + '属性');
      if (val === newValue) {
        return;
      }
      val = newValue;
    }
  });
}



defineReactive(obj, 'a', 10)  // 设置响应式数据，并赋予初始值


defineReactive 的目的就是提供一个闭包环境
让代码写的方便，简洁



另外 defineProperty 和 defineProperties 的区别

defineProperty(obj, a, {
  set,
  get
})


defineProperties() 参数就不一样
defineProperties(obj, {
  a: {
    get,
    set
  }
})

直接把数据的 描述对象 传进去了




## P4 递归侦测对象全部属性


但是上面初级的 defineReactive 方法，无法做到嵌套式的数据的响应式处理

比如 var obj = {
  a: {
    m: {
      n: 1
    }
  }
}


初级defineReactive 只能对一层的对象进行处理
因此需要进一步完善 defineReactive ，使得它能处理深层嵌套的对象

我们这里用一个类 class Observer 来完成这个递归(特殊的递归)遍历功能


Observer：将一个正常的object转换为每个层级的属性都是响应式（可以被侦测的）的object
这个是最终功能，也就是这个 类 Observer 最终要实现的功能


但是里面肯定是有很多代码辅助协同来一起完成的



这里先写一个observe函数，进行初步的判断处理

function observe (value) {
  // 如果value不是对象，什么都不做
  if (typeof value != 'object') return;
  // 定义ob
  var ob;
  if (typeof value.__ob__ !== 'undefined') {
    ob = value.__ob__;
  } else {
    ob = new Observer(value);
  }
  return ob;
}




调用observe(obj)
1.首先看对象 obj 身上有没有 __ob__ 属性，没有的话，
将 Observer 的实例赋值给 __ob__ 

（一般来说，肯定是没有的，因为一开始的数据都是普通数据，未响应式的，
有的话，就代表这个数据经过了响应式的处理）


2.然后再遍历下一层属性，这样，最后逐个defineReactive
当然，遍历的过程也是有很多功能代码的，只是大体的阶段是这样划分的
而且遍历的过程，又会从2 返回到 1这样循环


而在2 -> 1 的过程中，也不仅仅是什么都没发生
这期间可能还有个过程3

3.当设置某个属性值的时候，会触发set，
里面有newValue。这个newValue也得被observe()一下







在 Observer 内部功能是如何实现的,一步一步来

import { def } from './utils.js';

class Observer {
  constructor(value) {
    
    console.log('我是Observer构造器', value);
    // 一开始, 类中什么都没有，我们要完成上面的把 Observer 的实例 赋值给 __ob__
    // value.__ob__ = this // 但是因为我们不希望 __ob__ 这个属性可以被枚举(就是不希望别人能轻易看见这个属性)
    // 因此我们希望它是不可枚举的，所以可以用 object.defineProperty() 来设置，因此这里封装一下,可以看util.js 这个工具类

    def(value, '__ob__', this, false)  // 功能就是value.__ob__ = this
    // 给value 这个对象 添加了__ob__属性，值是这次new的实例（this，一定要注意，构造函数中的this不是表示类本身，而是表示实例）


    // 这个时候已经有点绕了，


    // 我们可以同时回过头来看一下 observe 里面的判断处理
    //  if (typeof value.__ob__ !== 'undefined') {
    //    ob = value.__ob__;
    //  } else {
    //    ob = new Observer(value);
    //  }


    // value.__ob__  和  new Observer(value) 其实会是一个东西
    // 因为一开始大家是不可能进 true 的逻辑的，因此全都会走进false的处理
    // 这个时候就都通过 Observer 里面的代码，给 value 这个对象添加了 __ob__ 属性，而值就是 Observer 的实例，也就是ob

    // 然后经过了这一次处理的数据，后面某个时候再次进入到这个逻辑处理的时候，就已经有了 __ob__属性
    // 因此就直接 赋值 ob = value.__ob__
  }
}




然后就到了最关键的地方了，到底，这个类要干什么
不要忘记初心，Observer类的目的是：
将一个正常的object转换为每个层级的属性都是响应式（可以被侦测的）的object



class Observer {
  constructor(value) {
    def(value, '__ob__', this, false)

    walk(value)
  }


  // 遍历
  // 递归实现，每个层级转化成响应式
  walk(value) {
    for (let k in value) {
      defineReactive(value, k);
    }
  }
}

因此这个 defineReactive 方法，实际上 其实是被 Observer 的walk 方法调用了


但是因为我们目前的 defineReactive 功能还不完善，只写了第一层级的响应式处理
只能把对象的第一层的数据进行 get,set 劫持

因此我们新增一些功能
function defineReactive(data, key, val) {

  if (arguments.length == 2) {
    val = data[key];
  }
  
  // 新增1: 子元素要进行observe，至此形成了递归。这个递归不是函数自己调用自己，而是多个函数、类循环调用
  // let childOb = observe(val);  // 这里childOb暂时还没用到可以，可以不写
  observe(val)

  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      return val;
    },
    set(newValue) {
      if (val === newValue) {
        return;
      }
      val = newValue;
      // 新增2: 当设置了新值，这个新值也要被observe
      // childOb = observe(newValue);
      observe(newValue)
    }
  });
}


这次，基本的递归响应式处理就已经完成了


总结：
整理一下基本逻辑：

var obj = {
  a: {
    m: {
        n: 5
    }
  },
  b: 10,
  c: {
    d: {
      e: {
        f: 6666
      }
    }
  }
};

一上来，一个对象 obj 被 observe
在 observe 函数中，判断 obj 没有 __ob__
因此 new Observer()


在 Observer中，先给obj添加 __ob__
再调用 walk函数进行 递归 defineReactive
这第一次调用，会先把 a, b, c 三个属性进行响应式的处理

那么 m, n, d, e, f 这些更深层次的子属性是什么时候变成响应式的？

是在 defineReactive 的时候
因为我们调用 defineReactive 的时候，只传了两个值 defineReactive(data, key)

在 defineReactive 能自动拿到 a 的值(是个对象)
if (arguments.length == 2) {
  val = data[key];
}


然后又通过 observe(val) 的时候，把对象数据进行了再深层一次的响应式处理
如果还有深层对象属性，就又会再一次的递归
因为 observe 里面有判断不是对象就返回，所以如果到底了，就不会再触发了


而触发set，设置新值的时候，
也是会observe(newValue)，把 newValue 进行响应式处理



这里的递归难以理解的地方，就是不是普通的自身调用自身的递归
而是


observe         调用 Observer
Observer        调用 defineReactive
defineReactive  调用 observe

1 -> 2 -> 3 -> 1
这样来回递归调用



总结：

observe 用来给数据添加 __ob__ 属性（调用Observer 给数据添加__ob__）

Observer 用来给数据设置响应式
  在walk里面进行设置响应式(第一层数据)：(其实本质上是 walk调用 defineReactive 来响应式处理)

在 defineReactive 中进行 get/set 的设置
  在 defineProperty 之前，还要调用一次 observe(防止值是对象格式)
  但是set的时候，又会调用一次 observe (因为新值可能还是对象)

上面三个进行间接递归



## P5 数组的响应式处理

面试经常会问：数组如何进行响应式的

vue底层改写了数组的7个方法

push
pop
shift
unshift
splice
sort
reverse


数组的这些方法，都是写在原型链上的， Array.prototype


vue 使用 Object.setPrototypeOf(arr, arrayMethods)
将数组的隐式原型设置为 arrayMethods
而这 arrayMethods 里面重写了上面的7个方法
而且 arrayMethods.__proto__ 还是指向 Array.prototype
因此剩余的数组方法还可以继续使用


Object.setPrototypeOf(a, b) 可以强制的将 a 的原型设置为 b
当然也可以手写：o.__proto__ = arrayMethods


总结：

1.实际上是以 Array.prototype 为原型
创建了一个 arrayMethods 的对象

2.然后使用 Object.setPrototypeOf 这个方法
强制将数组的 __proto__ 指向 arrayMethods

3.将新改写的7个函数变成响应式的数据(这样，调用这7个方法的时候，就会被劫持)




// 得到Array.prototype
const arrayPrototype = Array.prototype;

// 对应 1. 以 Array.prototype 为原型创建arrayMethods对象
// vue 里面是使用 Object.create() 来创建的
const arrayMethods = Object.create(arrayPrototype);
// 这时 arrayMethods.__proto__ === Array.prototype  这个是true



// 完善 类 Observer 里面的判断
if (Array.isArray(value)) {
  // 对应2. 强制将数组的  value.__proto__ 指向 arrayMethods
  Object.setPrototypeOf(value, arrayMethods);
} else {
  this.walk(value);
}



// 3.重写要被改写的7个数组方法
const methodsNeedChange = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

import { def } from './utils.js';
// 另外，还需要用到之前封装的utils工具类，来将方法变成响应式的
// 因为现在只是形成了一个 arr.__proto__ -> arrayMethods -> Array.prototype 的原型链条



methodsNeedChange.forEach(methodName => {
  // 备份原来的方法，因为push、pop等7个函数的功能不能被剥夺
  const original = arrayPrototype[methodName];
  // 定义新的方法
  def(arrayMethods, methodName, function () {
    // 恢复原来的功能
    console.log('啦啦啦');
    original.apply(this, arguments);
  }, false);
});


// 这里的def是要把 value.push value.pop 等七个方法处理成响应式的

def(Object, key, value, enumerable) 对应我们这里的响应式处理

def(arrayMethods, methodName, function () {}, false);
// 非常重要的一点，function () {} 不能写成箭头函数 () => {}
// 箭头函数在实际调用的时候会造成错误的作用域问题



// 上面的备份原来的方法很重要：表明我们的重写，并不是真正意义上的重新写一遍那7个方法
// 而是我们中间设置了一个拦截，在拦截的时候做一些数据的处理
// 真正的push,pop等方法还是调用 原来Array.prototype 上的那些方法

// 因此我们需要 apply()
original.apply(this, arguments);




// 所以这里哪怕是数组，也用到了 Object.defineProperty
// 只不过是还用到了其他的方法，一起协同合作完成功能

目前来看用到了

1.Object.defineProperty()
2.Object.setPrototypeOf()
3.Object.create()

Object.defineProperty() 用来进行响应式处理(数据劫持)
而且和对象的处理不同，对象是通过 set/get 方法来劫持
而数组是通过 value 方法来进行劫持（因为数组只是重写7个方法）

Object.setPrototypeOf() 来设置数组的原型链

Object.create() 来生成 以 Array.prototype 为原型链的 对象






继续完善：



// 完善 类 Observer 里面的判断
if (Array.isArray(value)) {
  Object.setPrototypeOf(value, arrayMethods);
  // 新增: 让这个数组变得observe
  this.observeArray(value)
} else {
  this.walk(value);
}


// 数组的特殊遍历

observeArray(arr) {
  for (let i = 0, l = arr.length; i < l; i++) {
    // 逐项进行observe
    observe(arr[i]);
  }
}



另外，在重写的方法中，push,unshift,splice这三个比较特殊
因为它们会插入新的数据，而为了保证这些新插入的数据也要是响应式的
因此它们也必须observe一下(因为新数据没有__ob__)




def(arrayMethods, methodName, function () {
  // 恢复原来的功能
  const result = original.apply(this, arguments);
  // 把类数组对象变为数组
  const args = [...arguments];
  // 把这个数组身上的__ob__取出来，__ob__已经被添加了，为什么已经被添加了？
  // 因为数组肯定不是最高层，比如obj.g属性是数组，obj不能是数组，第一次遍历obj这个对象的第一层的时候，已经给g属性（就是这个数组）添加了__ob__属性。
  const ob = this.__ob__;

  // 有三种方法push\unshift\splice能够插入新项，现在要把插入的新项也要变为observe的
  let inserted = [];

  switch (methodName) {
    case 'push':
    case 'unshift':
      inserted = args;
      break;
    case 'splice':
    // splice格式是splice(下标, 数量, 插入的新项)
    inserted = args.slice(2);
    break;
  }

  // 判断有没有要插入的新项，让新项也变为响应的
  if (inserted) {
    // 新数据要observe
    ob.observeArray(inserted);
  }

  console.log('啦啦啦');  // 这个啦啦啦就相当于响应中，你要做的后续处理
  // 比如更新试图什么的

  return result;
}, false);






---

另外，这里一笔带过了 value 属性的详细说明
Object.defineProperty(data,key, { value })


var obj = {};
// 在对象中添加一个属性与数据描述符的示例
Object.defineProperty(obj, "a", {
  value : 20,  // 属性 a 的初始化值是37
  writable : true,  // 可修改值内容  
  enumerable : true, // 可枚举，默认 false  
  configurable : true // 可删除，默认 false
});



// value值为字符串、数值、对象 的时候，用value 和 get/set 的效果一样
// 也可以用 get/set 这样写

var obj = {};
var bValue;
Object.defineProperty(obj, "a", {
  get: function(){
    return bValue;
  },
  set: function(newValue){
    bValue = newValue;
  },
  // writable: true,  // 可修改值内容 , 这里会报错，注释掉
  enumerable: true, // 可枚举，默认 false  
  configurable: true // 可删除，默认 false
});

obj.a = 20;




使用Object.defineProperty() 定义对象属性时，如已设置 set 或 get, 
就不能设置 writable 和 value 中的任何一个了，不然会报如下错误
VM200:3 Uncaught TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute

因为不再需要value和writable的属性了，所有关于value的操作都由get和set代理了。



// value值为function

function def (obj, key) {
  Object.defineProperty(obj, key, {
    writable: true,
    enumerable: true,
    configurable: true,
    value: function(...args) {
      console.log('key', key);
      console.log('args', args);
      }
    }
  );
}


// 定义一个方法
let obj = { push() {}}  // ES6 的简略写法
// { push: function() {}}

// 方法的绑定
def(obj, 'push');  // 这里不会输出


obj.push([1, 2], 7, 'hello!');
// 控制台输出 key push
// 控制台输出 args [Array(2), 7, "hello!"]


通过如上代码我们就可以知道，
用户使用了某个对象上的方法后：方法名以及参数我们都可以拦截到，
利用这个拦截的过程就可以做一些变化的通知。
// 这里奇妙之处在于不应以参数, 而使用 args 或者 arguments



const arrayProto = Array.prototype
// 获取Array的原型

function def (obj, key) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    value: function(...args) {
      console.log(key); 
      // 控制台输出 push
      console.log(args);
      // 控制台输出 [Array(2), 7, "hello!"]
      // 获取原生的方法
      let original = arrayProto[key];
      // 将开发者的参数传给原生的方法，保证数组按照开发者的想法被改变
      const result = original.apply(this, args);
      // do something 比如通知Vue视图进行更新
      console.log('我的数据被改变了，视图该更新啦');
      this.text = 'hello Vue';
      return result;
      }    
    }
  );
}
// 新的原型
let obj = { push() {}}
// 重写赋值
def(obj, 'push');
let arr = [0];
// 原型的指向重写
arr.__proto__ = obj;
// 执行push
arr.push([1, 2], 7, 'hello!');
console.log(arr);









## P6 依赖收集


需要用到数据的地方，称为依赖

Vue1.x，细粒度依赖，用到数据的DOM都是依赖； 
Vue2.x，中等粒度依赖，用到数据的组件是依赖；（数据变化了，通知用到数据的组件就行了）

在getter中收集依赖，在setter中触发依赖



用到了 Dep 和 Watcher （最难的两个类）


Dep 类
把依赖收集的代码封装成一个Dep类，它专门用来管理依赖，
每个Observer的实例，成员中都有一个Dep的实例；
（dep的实例化，存在 Observer 的实例中，
而Observer的实例,存在于对象的每个层级的属性中->因为通过递归，会让每个属性都有__ob__
因此，只要有 Observer 的实例，也就必定有 Dep的实例）


Watcher类
Watcher 是一个中介，数据发生变化时通过Watcher中转，通知组件





• 依赖就是Watcher。只有Watcher触发的getter才会收集依赖，哪个
Watcher触发了getter，就把哪个Watcher收集到Dep中。

• Dep使用发布订阅模式，当数据发生变化时，会循环依赖列表，把所
有的Watcher都通知一遍。

• 代码实现的巧妙之处：Watcher把自己设置到全局的一个指定位置，
然后读取数据，因为读取了数据，所以会触发这个数据的getter。在
getter中就能得到当前正在读取数据的Watcher，并把这个Watcher
收集到Dep中。




只有对象类型才会进行 __ob__(Observer实例化)的挂载，普通属性没有(在observe.js 里面就返回了)
所以，每个对象结构都会触发一次 Dep 的实例化(xxx.__ob__.dep.notify())


dep负责 收集依赖(dep.depend()) 和 通知依赖(dep.notify())

我们这里先说通知依赖，什么时候需要通知依赖？
那必定是当数据被修改了才需要通知依赖
因此dep.notify() 就存在于2个地方
1.object 的setter中
2.array 改写的7个方法中

这样，当数据被修改时，dep就能够进行notify处理，做一些数据分发修改之类的处理(通知那些依赖，你们那边的值需要改动)






那么在哪里收集依赖？
在getter中收集依赖




而dep收集的依赖是什么？  这些依赖就是 Watcher
需要用到数据的地方，成为依赖，就是Watcher
而且只有Watcher 触发的 getter 才会收集依赖，哪个Watcher触发了getter，就把哪个Watcher 收集到Dep 中

Dep 使用发布订阅模式，当数据发生变化时，会循环依赖列表，把所有的Watcher 都通知一遍。
Watcher是一个中介的角色，数据发生变化时通知它，然后它再通知其他地方








Dep 和 Watcher 的总结：

单纯的从逻辑思维角度来讲，Dep 和 Watcher 挺好理解的
Dep 就是用来 收集依赖 和 通知依赖 的

在getter里面收集依赖 dep.depend()
在setter里面通知依赖 dep.notify()（修改数据的时候，通知那些依赖进行数据，视图的变更）

Dep的代码也不难理解



----

Watcher 的逻辑理解 
就是用到这些数据的地方，就是依赖本身(依赖就是Watcher)，
然后它本身化身为观察者的身份，他要时刻监视数据源是否发生改变
（而且只有Watcher 触发的 getter 才会收集依赖，哪个Watcher触发了getter，就把哪个Watcher 收集到Dep 中）

发生了变化，他也要紧跟着一起改变
（数据变了，就会引起虚拟DOM的重新计算，然后再挂载到DOM上，从而导致视图发生变化）





这里配合上面的 Vue2.x，中等粒度依赖，用到数据的组件是依赖。
就更好深入理解了

有一个数据源对象 obj, 非常非常多的组件用到了它
然后在某一个地方改变了obj，因为每个用到了这个数据的依赖(组件) 都观察了它
它发生了变化，它就会通知那些引用者，你们也要进行改变，这样就通过数组遍历的方式一个个的修改

然后由于组件的数据发生了变化，引起了虚拟DOM的重新计算，再挂载到DOM上，从而引起视图UI的更新




只是这里Watcher 的视频老师写的代码有点难懂







==============


vue的响应式原理

虽然说是 Object.defineProperty
但是这东西只是最核心的
不单单只是 Object.defineProperty 完成一系列的 响应式操作(数据劫持)

就比如，Object.defineReactive
用来封装 defineProperty，因为 getter/setter 需要用变量来存放数据
所以封装了一下，使用闭包，来替代变量的存放

然后还有像 Observer，observe, 他们共同协作，完成递归
对数据的深层结构完成响应式的处理 a.b.c 这种情况

这个时候，也仅仅是完成了对象类型的响应式
还有数组
vue底层就重写了 Array.prototype 上的7个数组方法
push,pop,shift,unshift,splice,join,reverse
把这些方法在 arrayMethods 对象上重些了一下
然后通过 Object.setPrototypeOf() 方法强行指定 数组数据的原型



这里会出现以前经常问的问题：
1.为什么vue2里面 直接对数组进行下标赋值，不会响应式
因为直接对下标操作，不是上面改写的7个方法的方式，所以，无法响应式处理

2.给data添加某个属性，为什么无法响应式的更新？
因为直接添加属性，不会进行数据劫持
新的属性 没有 设置 get/set 



----



这个时候就完成了数据的响应式处理
但这还不够，还需要追踪变化
（到目前为止也只是实现了数据的劫持（也就是 读取，修改的时候能触发拦截），但是还需要将数据的变化分发到对应的使用了这些数据的地方）

于是vue 使用 Dep 和 Watcher 来进行依赖的收集和触发

通过 Dep 的depend 来收集依赖
notify来通知更新
这个时候通过Watcher

来通知组件中那些依赖的数据进行更新
然后重新生成虚拟dom，再上树，更新dom
这样就完成了视图更新

所以说，vue的响应式原理 不单单就只是 Object.defineProperty
它是这一大批，Observer,observe,defineReactive
Dep,Watcher 所有功能组合起来，达到实现 响应式的功能



Watcher 就是起到 vue中的 watch作用





