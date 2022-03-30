/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};



function add(x, y) {
  return x + y;
} // eslint-disable-next-line


console.log(add(3, 5));

function sum() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.reduce(function (p, c) {
    return p + c;
  }, 0);
} // eslint-disable-next-line


console.log(sum(1, 2, 3, 4, 5, 6, 7, 8));
/******/ })()
;