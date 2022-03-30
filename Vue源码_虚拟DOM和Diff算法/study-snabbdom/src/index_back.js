import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

// 创建出patch函数
const patch = init([classModule, propsModule, styleModule, eventListenersModule]);

// 创建虚拟节点
var myVnode1 = h('a',{
  props: {
    href: 'http://www.baidu.com',
    target: '_blank'
  }
}, '百度');

var myVnode2 = h('div',{}, '我是一个盒子');




// 让虚拟节点上树

const container = document.getElementById('container');
// patch(container, myVnode1);
// patch(container, myVnode2);




// h函数一个非常重要的知识点：可以嵌套使用，这样就能用了产生 虚拟dom树

var myVnode3 = h('ul', [
  h('li', '苹果'),
  h('li', '西瓜'),
  h('li', '香蕉'),
]);


patch(container, myVnode3);




