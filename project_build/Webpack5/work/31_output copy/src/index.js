import count from './count';

console.log('index.js被加载了');

// import add from './add';
// 改成import导入
import('./add')
  .then(({ default: add }) => {
    console.log(add(222, 333));
  })

// console.log(add(1, 2));
console.log(count(6, 6));

function mul(x, y) {
  return x * y;
}

// return { add, count, mul };