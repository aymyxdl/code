/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/css/iconfont.css
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/css/index.less
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/js/test.js
function mul(x, y) {
  return x * y;
}
function count(x, y) {
  return x - y;
}
;// CONCATENATED MODULE: ./src/js/index.js




function add(x, y) {
  return x + y;
} // eslint-disable-next-line


mul(100, 100); // eslint-disable-next-line

console.log(add(3, 5));

function sum() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.reduce(function (p, c) {
    return p + c;
  }, 0);
} // eslint-disable-next-line


console.log(sum(1, 2, 3, 4, 5, 6, 7, 8)); // 注册 serviceworker
// 处理兼容性问题：这里有就用，没有就不用

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    // 这里需要传入个文件，这个文件会有 webpack的 workbox-webpack-plugin 插件生成
    navigator.serviceWorker.register('/service-worker.js').then(function () {
      // eslint-disable-next-line
      console.log('sw注册成功了');
    }).catch(function () {
      // eslint-disable-next-line
      console.log('sw注册失败了');
    });
  });
}
/******/ })()
;