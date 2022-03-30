function add(x, y) {
  return x + y;
}


/*
  demo3
  通过js代码,让某个文件被单独打包成一个chunk
  import 动态导入语法: 能将某个文件单独打包
  但是文件名称不好看,是根据生成的id来命名的
  在import中加入参数
*/

import(/* webpackChunkName: 'test' */'./test')
  .then((result) => {
    // 文件加载成功
    // eslint-disable-next-line
    console.log(result);
    console.log(result.mul(100, 100));
  })
  .catch(() => {
    // eslint-disable-next-line
    console.log('文件加载失败');
  })


// eslint-disable-next-line
console.log(add(3, 5));

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// eslint-disable-next-line
console.log(sum(1, 2, 3, 4, 5, 6, 7, 8));