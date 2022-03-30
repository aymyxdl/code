/*
  index.js: webpack入口起点文件

  1. 运行指令：
    开发环境：webpack ./src/index.js -o ./build/built.js --mode=development
      webpack会以 ./src/index.js 为入口文件打包，打包后输出到 ./build/built.js
      整体打包环境是 开发环境

    生产环境：webpack ./src/index.js -o ./build/built.js --mode=production
      webpack会以 ./src/index.js 为入口文件打包，打包后输出到 ./build/built.js
      整体打包环境是 生产环境

  2. 结论：
    1. webpack能处理 js/json 文件， 不能处理 css/img 等其它资源
    2. 生产环境和开发环境将 ES6 模块化编译成浏览器能识别的模块化
    3. 生产环境 比 开发环境 多一个压缩js代码的功能
*/

import data from './data.json';
console.log(data);


function add(a, b) {
  return a + b;
}

console.log(add(2, 5));