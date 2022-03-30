// 手写diff算法
import h from './mysnabbdom/h';
// 创建patch.js 并引入
import patch from './mysnabbdom/patch';


// const myVnode1 = h('h1', {}, 'hello');


// const myVnode1 = h('ul', {}, [
//   h('li', {}, 'A'),
//   h('li', {}, 'B'),
//   h('li', {}, 'C')
// ]);

const myVnode1 = h('section', {}, [
  h('p', {key: 'A'}, 'A'),
  h('p', {key: 'B'}, 'B'),
  h('p', {key: 'C'}, 'C')
]);


const container = document.getElementById('container');

patch(container, myVnode1);


const myVnode2 = h('section', {}, [
  h('p', {key: 'A'}, 'A'),
  h('p', {key: 'B'}, 'B'),
  h('p', {key: 'M'}, 'M'),
  h('p', {key: 'N'}, 'N'),
  h('p', {key: 'C'}, 'C')
]);

// const myVnode2 = h('section', {}, [
//   h('p', {}, 'A'),
//   h('p', {}, 'B'),
//   h('p', {}, 'C'),
//   h('p', {}, [
//     h('p', {}, 'BB'),
//     h('p', {}, 'CC')
//   ])
// ]);

const btn = document.getElementsByClassName('btn');
btn[0].onclick = function() {
  patch(myVnode1, myVnode2);
}

