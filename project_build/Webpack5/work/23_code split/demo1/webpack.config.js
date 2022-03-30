const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

/*
  这里只关注代码分割：所以多余的配置都删掉，不需要
*/

module.exports = {
  /*
    一般的代码压缩，都是将多个js文件合并成一个文件并输出
    我们如果需要将不同的js文件打包成单独输出
    将入口文件改为 对象 形式
  */
  // 单入口
  // entry: './src/js/index.js',
  entry: {
    // 多入口：有几个入口，最终输出就有几个bundle
    main: './src/js/index.js',
    test: './src/js/test.js'  // 这里引入了test.js，index里面就不需要引入了，可以删除
  },
  output: {
    // 因为上面设置了多入口，如果输出的都叫做built，那么不好分辨
    // filename: 'js/built.[contenthash:10].js',
    // [name]: 取文件名，这个文件名是上面 多入口 中取的key值
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build'),
  },
  // 到这里会发现，多入口这样设置的话，有些不太灵活，因为经常更改（增加删除）入口文件的话
  // entry的对象也要进行改动,很麻烦
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: false,
        removeComments: true
      }
    })
  ],
  mode: 'production'
}