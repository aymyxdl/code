// 体验diff算法

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

var vode1 = h('ul', {}, [
  // h('li', {}, 'A'),
  // h('li', {}, 'B'),
  // h('li', {}, 'C'),
  // h('li', {}, 'D'),
  

  // 这里配合 vode4增加key
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'B'}, 'B'),
  h('li', {key: 'C'}, 'C'),
  h('li', {key: 'D'}, 'D'),
]);


const container = document.getElementById('container');
const btn = document.getElementsByClassName('btn')
console.log(btn);

patch(container, vode1);



var vode2 = h('ul', {}, [
  h('li', {}, 'A'),
  h('li', {}, 'B'),
  h('li', {}, 'C'),
  h('li', {}, 'D'),
  h('li', {}, 'E'),
]);



btn[0].onclick = function() {
  patch(vode1, vode2);
  // 如何证明它是最小量更新呢？
  // 直接在浏览器调试窗口改掉前面的li的内容
  // 然后再次点击，发现改动的内容不变

  // 这里有个问题，一直点，就一直增加
  // 因为
}


var vode3 = h('ul', {}, [
  h('li', {}, 'E'),
  h('li', {}, 'A'),
  h('li', {}, 'B'),
  h('li', {}, 'C'),
  h('li', {}, 'D'),
]);


btn[1].onclick = function() {
  patch(vode1, vode3);
  // 如果使用vode3的话，相比较于vode2，把E节点放在了前面
  // 测试后会发现，它是把所有的节点都更新了(vode2的测试方法)
  // 这时因为这些虚拟dom没有加 key，导致上树的时候，算法以为把
  //  A => E
  //  B => A
  //  C => B
  //  D => C
  //  新增了D

  // 如果给虚拟节点加上 key：唯一标识，测试后就会发现，并没有全部更新
}


var vode4 = h('ul', {}, [
  h('li', {key: 'E'}, 'E'),
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'B'}, 'B'),
  h('li', {key: 'C'}, 'C'),
  h('li', {key: 'D'}, 'D'),
]);

btn[2].onclick = function() {
  patch(vode1, vode4);
  // 说明：key是服务于最小量化更新的
}




// 只有是同一个虚拟节点，才进行精细化比较
// 把ul 改成了 ol
var vode5 = h('ol', {}, [
  h('li', {key: 'E'}, 'E'),
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'B'}, 'B'),
  h('li', {key: 'C'}, 'C'),
  h('li', {key: 'D'}, 'D'),
]);

btn[3].onclick = function() {
  patch(vode1, vode5);
  // 这里测试发现，全部改变了
  // 证明不是同一虚拟dom，diff暴力删除
}




// 不会跨层比较
var vode6 = h('ul', {}, h('section', {}, [
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'B'}, 'B'),
  h('li', {key: 'C'}, 'C'),
  h('li', {key: 'D'}, 'D'),
]));

btn[4].onclick = function() {
  patch(vode1, vode6);
  // 这里测试发现，全部改变了
  // 证明跨层，diff暴力删除
}



// 命中：只要是同一虚拟dom，改变节点的顺序， 不会重新渲染
var vode7 = h('ul', {}, [
  h('li', {key: 'C'}, 'C'),
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'D'}, 'D'),
  h('li', {key: 'B'}, 'B')
]);

btn[5].onclick = function() {
  patch(vode1, vode7);
  // 这里测试发现，并无改变
}
