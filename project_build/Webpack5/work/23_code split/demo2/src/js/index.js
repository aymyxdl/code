// 因为 webpack.config.js 里面的 entry 配置了多入口，这里就不再需要单独引入了
// import { mul } from './test';
import $ from 'jquery';
console.log($);

function add(x, y) {
  return x + y;
}

// eslint-disable-next-line
// mul(100, 100);

// eslint-disable-next-line
console.log(add(3, 5));

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// eslint-disable-next-line
console.log(sum(1, 2, 3, 4, 5, 6, 7, 8));