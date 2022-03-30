import '../css/iconfont.css';
import '../css/index.less';

function add(x, y) {
  return x + y;
}

// eslint-disable-next-line
console.log(add(3, 5));

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// eslint-disable-next-line
console.log(sum(1, 2, 3, 4, 5, 6, 7, 8));