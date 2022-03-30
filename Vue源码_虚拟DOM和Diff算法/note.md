视频地址：

https://www.bilibili.com/video/BV1v5411H7gZ




这个项目用的webpack的启动命令

npx webpack serve




# P1 简介（什么是diff算法和虚拟DOM）

diff(精细化比对，最小量更新)

diff算法可以进行精细化比对
实现最小量更新


虚拟DOM

真实的DOM处理起来比较复杂

<div class="box">
  <h3>我是一个标题</h3>
  <ul>
    <li>牛奶</li>
    <li>咖啡</li>
    <li>可乐</li>
  </ul>
</div>


于是我们把它变成一个js对象(真实的js对象，这个js对象就是虚拟DOM)

{
  "sel": "div",
  "data": {
    "class": { "box": true }
  },
  "children": [
    {
      "sel": "h3",
      "data": {},
      "text": "我是一个标题"
    },
    {
      "sel": "ul",
      "data": {},
      "children": [
        { "sel": "li", "data": {}, "text": "牛奶" },
        { "sel": "li", "data": {}, "text": "咖啡" },
        { "sel": "li", "data": {}, "text": "可乐" }
      ]
    }
  ]
}


sel: selector 选择器
data: sel上面的属性
children: sel的子元素


# P2 snabbdom简介

snabbdom: 瑞典语（虚拟算法的鼻祖，一个特别有名的 虚拟DOM库）

vue的源码 借鉴了 snabbdom



.d.ts 文件，是在把ts变成js的时候
需要额外用一个文件来保存 ts文件中的具体类型



问题1：
snabbdom/package.json

中有exports(路径的别名)

这里的exports 必须要webpack5才能读取(4不能，所以是个坑)

// 这里是因为老师装的 snabbdom 是2.1.0
我装的3.1.0 没有 exports
不过按照git的代码，一样可以使用


问题2：
webpack 的热更新 和热替换

// 热更新
// 指的是使用 webpack-dev-server 启动项目
修改了任何文件，浏览器启动的 http://localhost:8080/ 窗口都会把你的更新实时反应出来
(热更新有时候会无效，很烦)

// 热替换
// HMR：hot module replacement 热模块替换 / 模块热替换
// 这里的 热替换 指的是 热更新的时候，不需要刷新网页，重新读取所有的文件
// 而是只替换 更新的那一部分
// 有点类似 ajax 不刷新网页请求数据的意思



问题3：

2021-4-20
这个时候用的 publicPath 跟老师写的不一样了，不能这么用




# P3 虚拟dom 和 h函数

虚拟DOM：（就是js对象）
用JavaScript对象描述DOM的层次结构。
DOM 中的一切属性都在虚拟DOM中有对应的属性。



为什么要有虚拟dom，因为 diff 是在虚拟dom上进行比较

新虚拟DOM和老虚拟DOM进行diff（精细化比较），
算出应该如何最小量更新，
最后反映到真正的DOM上


diff发生在虚拟dom上



DOM如何变为虚拟DOM，
属于模板编译原理范畴，本次课不研究

研究1：  虚拟DOM如何被渲染函数（h函数）产生？
我们要手写h函数 

• 研究2：diff算法原理？
我们要手写diff算法

• 研究3：虚拟DOM如何通过diff变为真正的DOM的
事实上，虚拟DOM变回真正的DOM，是涵盖在diff算法里面的




h函数用来产生虚拟节点（vnode）

比如这样调用h函数：
h('a', { props: { href: 'http://www.atguigu.com' }}, '尚硅谷');

将得到这样的 虚拟节点：
{ "sel": "a", "data": { props: { href: 'http://www.atguigu.com' } }, "text": "尚硅谷" }

它表示的真正的DOM节点：
<a href="http://www.atguigu.com">尚硅谷</a>





一个 虚拟节点 整体有哪些属性？
{
  sel: "div"
  data: {}
  children: undefined
  text: "我是一个盒子" 
  elm: undefined
  key: undefined
}

sel: 选择器
data: 身上的属性/样式
children: 子元素
text: 文字
elm: 表示这个虚拟dom对应的真正dom节点，如果是undefined表示还没有上树
key: 表示这个节点的唯一标识



--

h函数创建虚拟节点

使用patch进行上树(通过init创建出来的)： patch函数 是diff 算法的核心函数

一个容器只能让一个虚拟节点上树(除非是嵌套的)



const patch = init([...省略一些不重要的信息])  // 生成patch函数

const vnode = h('a', { props: { href: 'http://www.atguigu.com' }}, '尚硅谷');   // 生成虚拟dom

const container = document.getElementById('app')

patch(container, vnode)    // 这样就上树了，网页上就有一个 a 标签了



--

h函数可以嵌套使用，从而得到虚拟DOM树（重要）

h('ul', {}, [
  h('li', {}, '牛奶'),    // 记住，这里也要套用 h 函数，而不能直接写节点（非常重要）
  h('li', {}, '咖啡'),    // 可以省略空对象，我这里没有省略
  h('li', {}, '可乐')
]);


将得到这样的虚拟DOM树：

{
  "sel": "ul",
  "data": {},
  "children": [
    { "sel": "li", "text": "牛奶" },
    { "sel": "li", "text": "咖啡" },
    { "sel": "li", "text": "可乐" }
  ]
}





# P4 手写h函数



vnode.js 

// vnode 函数非常简单，就是把传进来的参数组合成一个对象返回
export default function (sel, data, children, text, elm) {
  return {
    sel, data, children, text, elm
  }
}



// h函数

import vnode from './vnode.js'

export default function (sel, data, c) {
  // 我们这里只写低配版的h函数，必须传入三个参数

  if (arguments.length !== 3) throw new Error('请传入三个参数')

  if (typeof c === 'string' || typeof c === 'number') {
    // 传入的是文本节点
    return vnode(sel, data, undefined, c, undefined)
  } else if (Array.isArray(c)) {

    // 如果是数组，这些数组也必须是h函数，因此，数组成员也就是vnode对象
    const children = []

    c.forEach(sub => {
      if (!(typeof sub === 'object'  && sub.hasOwnProperty('sel'))) 
        // 表明不是vnode节点，说明传递的数组成员有问题
        throw new Error('数组成员有问题')

      // 重点，我们这里不需要递归调用，哪怕传入的参数是非常多的深层嵌套的数组
      // 因为传入的参数中值直接调用 h 函数，所以，我们这里不需要递归
      children.push(sub)
    })

    return vnode(sel, data, children, undefined, undefined)
  } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
    // 表明传入的是h函数,：因为是函数，调用h函数的最终返回结果一定是一个对象，而且是vnode对象，简略判断一下sel属性就行
    return vnode(sel, data, [c], undefined, undefined)
  } else {
    throw new Error('对不起，传入的第三个参数有问题')
  }
}




这里的h函数最主要的就是 数组的判断
因为有多个子节点，需要遍历

而且这个h函数本身不需要递归去处理children里面的数据
因为我们调用h函数的时候，children里面的数据，也是自己手动调用了h函数的
（这就很方便）



到这里 h函数 和 虚拟dom 就已经实现了
其实非常的简单



# P5 感受diff算法




如何证明diff算法是最小量更新？
你可以在页面按F12，手动改一下旧节点的dom里面的数据
然后进行更新操作，看看旧节点是否有变化

如果没有变化，则说明，确实是最小量更新



key是服务于最小量更新的
（按照刚刚的操作，如果不加key的话，你在vnode的前面插入一个新数据，然后更新，会发现全部变了
加了key后，则不会）



const vnode1 = h('ul', {}, [
  h('li', {}, 'A'),
  h('li', {}, 'B'),
  h('li', {}, 'C'),
  h('li', {}, 'D'),
])

const vnode2 = h('ul', {}, [
  h('li', {}, 'E'),
  h('li', {}, 'A'),
  h('li', {}, 'B'),
  h('li', {}, 'C'),
  h('li', {}, 'D'),
])

patch(vnode1, vnode2)

不加key的话，如果 E 放在最前面，那么就会全部变化，加了key，则不会




----加key


const vnode1 = h('ul', {}, [
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'D' }, 'D'),
])


const vnode2 = h('ul', {}, [
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'D' }, 'D'),
  h('li', { key: 'E' }, 'E'),   // 这样不管放到前面，还是后面，都不会改动 ABCD
])


心得1：key很重要

-------




const vnode1 = h('ul', {}, [
  ...
])


const vnode2 = h('ol', {}, [
  ...
])

必须对应同一个节点，如果ul,变成了ol，则会全部更新，那么里面的key一样

它们不是same节点，则暴力删除再插入
（因为变节点的父级，一般在工作当中不会碰见，）

心得2：



-------





const vnode1 = h('ul', {}, [
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B')
])


const vnode2 = h('ul', {}, [
  h('ul', {},[          // 如果多了一层，哪怕children不变，也会暴力删除
    h('li', { key: 'A' }, 'A'),
    h('li', { key: 'B' }, 'B')
  ])
])


心得3：



-------






心得：

1.最小量更新太厉害啦！真的是最小量更新！
当然，key很重要。key是这个节点的唯一标识，
告诉diff算法，在更改前后它们是同一个DOM节点。


2.只有是同一个虚拟节点，才进行精细化比较，
否则就是暴力删除旧的、插入新的。
延伸问题：如何定义是同一个虚拟节点？
答：选择器相同且key相同。

3.只进行同层比较，不会进行跨层比较。
即使是同一片虚拟节点，但是跨层了，对不起，精细化比较不diff你，
而是暴力删除旧的、然后插入新的。



然后这里有时候就会有疑问了：
diff并不是那么的“无微不至”啊！真的影响效率么？？

答：上面2、3操作在实际Vue开发中，基本不会遇见，所以这是合理的优化
机制。


diff在同一层比较，效率是最高的，哪怕打乱了顺序，测试也不会重新渲染
而是知道你重新排序了




# P6 diff处理新旧节点不是同一个节点时

patch函数：
1.进来首先判断老节点是否是虚拟节点
因为首次上树的老节点，不是虚拟节点，而是DOM节点

如果是DOM节点，则调用函数进行包装，把DOM包装为虚拟节点


2.判断 oldVnode 和 newVnode 是不是同一个节点

如果不是同一个节点，则暴力删除，插入新的
如果是同一个节点，则进入精细化比较（最麻烦的）



如何定义“同一个节点”这个事儿：
旧节点的key要和新节点的key相同
且
旧节点的选择器要和新节点的选择器相同


暴力删除，插入新节点的时候
比较麻烦的地方在于
创建节点时，所有子节点需要递归创建的



# P7 手写第一次上树



const myVnode1 = h('div', {}, '你好')
const old = document.getElementById('container')
patch(old, myVnode1)


---patch.js

import vnode from './vnode.js'
import createElement from './createElement.js'

export default function (oldVnode, newVnode) {
  // 1.判断旧的是vnode还是dom
  if (oldVnode.sel === '' || oldVnode.sel === undefined) {
    // 将dom转化为vnode
    // oldVnode = h(oldVnode.tagName.toLowerCase(), {}, '')
    // 这里的eml要传入oldVnode这个 dom节点，因为它是真是存在的dom节点
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], '', oldVnode)
    console.log('oldVnode', oldVnode)
  }
  
  // 2.判断 oldVnode 和 newVnode 是不是同一个节点

  if (newVnode.key && oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
    // 是同一个节点，直接上树
    console.log(1)
  } else {
    // 不是同一个节点，则暴力插入新的，再删除旧的
    // 这里为什么要先插入再删除呢？
    // 因为插入需要一个标杆，插入到原来的前面，然后再删除旧的，删掉了，就没有标杆了

    // 创建新的节点
    const newDom = createElement(newVnode)

    oldVnode.elm.parentNode.insertBefore(newDom, oldVnode.elm)
    oldVnode.elm.parentNode.removeChild(oldVnode.elm)
  }
}






----createElement.js

// 真正创建节点。将vnode创建为DOM

export default function createElement (vnode) {

  let domNode = document.createElement(vnode.sel);

  // 有子节点还是有文本
  if (vnode.text !== '' && (vnode.children === undefined || vnode.children.length === 0)) {
    // 它内部的文字
    domNode.innerText = vnode.text;
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 有可能是空数组
  }

  // 这里记住要把elm标记上
  vnode.elm = domNode;
  return domNode;
}


到这里，一个非常简单的上树操作就完成了
目前的newVnode 是 一个新节点 并且是 一级结构（复杂的后续完善）






# P8 手写递归创建子节点


当子节点是一个数组时
创建子节点的时候，会发现标杆不太好用
（视频老师讲解的标杆，是因为一开始它是把上树操作放在createElement.js里面的，这样就导致
深层递归的时候，递归的节点想要上树会很麻烦，因为如果要上树，则需要标杆（也就是vNode.elm）
老节点，肯定是有标杆的，因为它是真是存在的dom，新节点的最外层的标杆也能得到，就是老节点的标杆
因为新节点要替换老节点，放到老节点原来的位置
但是新节点的子节点是没有标杆的，它们根本不知道要插入的dom的哪里


所以先把这些节点组装起来，在patch.js里面进行统一上树
这样只需要最后完成了所有节点的组装后，直接上树操作一次就行了）


而我一开始的代码就是优化后的格式，所以不需要改动



所以需要改进
因为循环子节点的时候，没有标杆，无法插入
所以改成只创建孤儿节点
插入统一放到外面处理


---

这里有点绕：

首先在 createElemet.js中
只做创建孤儿节点的任务
然后需要把 虚拟节点 vnode的 elm属性设置为 刚刚创建的真正的dom节点（因为刚刚创建的节点要挂载到vnode的这个地方）

然后在最下面返回vnode.elm(也就是domNode)

vnode.elm = domNode;
return vnode.elm; (返回真正的dom节点，就是这个 createElemet.js文件要干的活)

然后在 patch函数中接收这个节点，进行上树

oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm);



createElemet.js中的核心就是递归调用
有children就递归
递归到最后就是文本节点，就是结束条件
然后把这些dom节点append起来(因为是递归顺序来的)
(这里的append也是上树，只不过上的dom是脱离dom流，
整个虚拟节点都是没有在dom里面的)

这个时候就把新的节点创建好了，在外面进行一次整体上树就完成了




----

createElement.js
if (vnode.text !== '' && (vnode.children === undefined || vnode.children.length === 0)) {
} else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
  let arr = vnode.children
  for (let i = 0; i < arr.length; i += 1) {
    let chDom = createElement(arr[i])

    // 这里需要用 domNode，是上面创建的真实孤儿dom节点
    domNode.appendChild(chDom)
  }
}



虚拟dom和diff算法

通过h函数生成虚拟dom(vnode)
然后使用diff算法，进行最小量更新
把更新后的虚拟dom通过patch函数上树



# P9 diff处理新旧节点是同一个节点时



这一节没有代码
就是讲解了一下后面的是同一个节点时的
一系列后续判断逻辑
可以看一下源码中的流程图




# P10 手写新旧节点text不同的情况


patch.js


if (oldVnode.sel === newVnode.sel) {
  // 是同一个节点
  console.log('新老节点是同一个节点')

  // 这里我不太理解，这里只是地址相等吧，万一改了对象里面的某个属性呢？
  // 判断新旧节点是否是同一个节点
  if (oldVnode === newVnode) return

  const children = newVnode.children

  // 判断新vnode是否有text属性 
  if (newVnode.text !== undefined && (children === undefined || children.length === 0)) {
    console.log('命中：新vnode有text属性');
    
    // 然后再看新老节点的text是否相同，如果不同，再修改
    // 这里不需要判断老节点里面的是什么数据，因为新节点是文本数据，肯定会覆盖
    if (newVnode.text !== oldVnode.text) {
      // 这里使用elm，都不用执行专门上树了
      oldVnode.elm.innerText = newVnode.text;
    }
  } else {
    // 表明新节点是有children
    // 判断老节点是否是文本节点还是children
    console.log('新节点有儿子节点', children)

    const oldCh = oldVnode.children
    if (oldVnode.text !== undefined && (oldCh === undefined || oldCh.length === 0)) {
      // 表明新节点是children，老节点是text
    // console.log('新节点儿子节点', )
      oldVnode.elm.innerText = ''

      const newDom = createElement(newVnode)
      oldVnode.elm.appendChild(newDom)

      // children.forEach(sub => {
      //   oldVnode.elm.appendChild(createElement(sub))
      // })
      
    } else {
      // 这里则是最复杂的判断：要进入精细化比较了
    }
  }
  
}



这里目前写了三种判断

新老节点是同一个节点的情况下

1.新老节点是否完全相同，相同表示没有变化，则返回，啥也不做

2.新节点是否是text
  如果是，则再次判断新老节点的text是否相同
    相同则不变，不同再修改

  3.如果新节点有children属性，再判断老节点是text还是childred

    如果是text，则修改

    如果老节点也是children，那么就将进入最麻烦的精细化比较






# P11 diff算法的子节点更新策略


新创建的节点(newVnode.children[i].elm)插入到所有
未处理的节点(oldVnode.children[um].elm)之前
而不是所有已处理节点之后

因为在遍历循环的时候 i在当前循环未处理完之前 是不变的
因此如果有两条 M，N要插入
那么按照所有处理的之后会变成先插入N，再插入M




# P12 diff算法的子节点更新策略


四种命中查找：
① 新前与旧前
② 新后与旧后
③ 新后与旧前（此种发生了，涉及移动节点，那么新前指向的节点，移动的旧后之后
④ 新前与旧后（此种发生了，涉及移动节点，那么新前指向的节点，移动的旧前之前）


四种命中，命中一个，就不再继续命中判断了
如果都没有命中，就需要用循环来寻找了。(vue里面是标记未undefined)移动到oldStartIdx之前。


---


这种命中查找
是非常经典的diff算法优化策略
因为这总算法非常符合人们开发中碰到的情况




// 循环条件
while(新前<=新后&&旧前<=旧后){
}



新增的情况
如果是旧节点先循环完毕，说明新节点中有要插入的节点。

这个时候循环结束，表明新节点后面的全部都是要新增的，直接新增就行了




删除的情况

如果是新节点先循环完毕，如果老节点中还有剩余节点，说明他们是要被删除的节点。
旧前和旧后之间的节点就是要删除的节点














