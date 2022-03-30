import h from './mysnabbdom/h';

const result = h('div', {}, [
  h('p', {}, '喜喜'),
  h('p', {}, '喜1'),
  h('p', {}, '喜2'),
  h('p', {}, h('p', {}, '喜3')),
]);

console.log(result);