const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

/*
  entry: 入口起点
    1. string   -->   './src/index.js'
      单入口
      打包形成一个chunk，输出一个bundle文件
      此时chunk的名称默认是 main

    2. array    -->   ['./src/index.js', './src/add.js']
      多入口
      所有入口文件最终只会形成chunk，输出出去只有一个bundle文件
        用处 ---> 只有在HMR功能中让html热更新生效
        会将数组中所有的包打包到第一个包中

    3. object
      多入口
      有几个入口文件就形成几个chunk，输出几个bundle文件
      此时chunk的名称是key


      ---> 特殊用法

        {
          // 所有入口文件最终只会形成一个chunk，输出出去只有一个bundle文件
          index: ['./src/index.js', './src/count.js'],
          // 形成一个chunk，输出一个bundle文件
          // 这种情况一般用于 dll
          add: './src/add.js'
        }



    问题：我这里有2个问题：
    1. 我打包后，在浏览器调试窗口，调用add和count方法报错
    好像是打包把这两个方法删掉了，这个怎么解决？(看index.html)

    2. 用多入口打包后(不管娜种多入口)
      因为多入口，不需要在index中再引入，所以我直接使用其它文件中的方法
      打包后的文件，控制台会报错

      上面那种情况都好说，大不了我不再控制台调用方法
      可这种多入口导致项目报错，就没有办法继续写代码啊？


*/


module.exports = {
  // entry: './src/index.js',

  // entry: {
  //   index: './src/index.js',
  //   add: './src/add.js'
  // },

  entry: {
    index: ['./src/index.js', './src/count.js'],
    add: './src/add.js'
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'bulid')
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  // devServer: {
  //   // 项目构建后路径
  //   contentBase: resolve(__dirname, 'build'),
  //   // 启动gzip压缩，体积更小，这样加载就更快
  //   compress: true,
  //   // 端口号
  //   port: 3000,
  //   // 自动打开默认浏览器
  //   // open: true
  // },
  mode: 'development'
}