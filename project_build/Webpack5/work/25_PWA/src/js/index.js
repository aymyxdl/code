import '../css/iconfont.css';
import '../css/index.less';
import { mul } from './test';

function add(x, y) {
  return x + y;
}

// eslint-disable-next-line
mul(100, 100);

// eslint-disable-next-line
console.log(add(3, 5));

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// eslint-disable-next-line
console.log(sum(1, 2, 3, 4, 5, 6, 7, 8));

/*
  1. eslint不认识 window、navigator全局变量
    解决：需要修改package.json中eslintConfig配置
      "env": {
        "browser": true // 支持浏览器端全局变量
      }
   2. sw代码必须运行在服务器上
      --> nodejs
      -->
        npm i serve -g
        serve -s build 启动服务器，将build目录下所有资源作为静态资源暴露出去
*/

// 注册 serviceworker
// 处理兼容性问题：这里有就用，没有就不用
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // 这里需要传入个文件，这个文件会有 webpack的 workbox-webpack-plugin 插件生成
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => {
        // eslint-disable-next-line
        console.log('sw注册成功了');
      })
      .catch(() => {
        // eslint-disable-next-line
        console.log('sw注册失败了');
      });
  });
}
