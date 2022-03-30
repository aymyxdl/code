import h from './h.js'
import patch from './patch.js'

/* 

const vv = h('ul', {}, [
  h('li', {}, '苹果'),
  h('li', {}, '西瓜'),
  h('li', {}, '柠檬'),
  h('li', {}, [
    h('li', {}, '优质苹果'),
    h('li', {}, '劣质苹果'),
    h('li', {}, [
      h('li', {}, h('span', {}, '扔掉的苹果')),
    ]),
  ]),
  h('li', {}, '哈密瓜'),
])
console.log(vv)

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
  h('li', { key: 'E' }, 'E'),
])

patch(vnode1, vnode2)

*/



// const myVnode1 = h('div', {}, '你好')


const myVnode1 = h('ul', {}, '123')


const myVnode2 = h('ul', {}, [
  h('li', {}, '苹果'),
  h('li', {}, '西瓜'),
  h('li', {}, '柠檬'),
  h('ol', {}, [
    h('li', {}, '优质苹果'),
    h('li', {}, '劣质苹果'),
    h('ol', {}, [
      h('li', {}, h('span', {}, 'c吃掉的苹果')),
      h('li', {}, h('span', {}, '扔掉的苹果')),
    ]),
  ]),
  h('li', {}, '哈密瓜'),
])

const old = document.getElementById('container')

patch(old, myVnode1)


const btn = document.getElementsByClassName('btn');
btn[0].onclick = function() {
  patch(myVnode1, myVnode2);
}













