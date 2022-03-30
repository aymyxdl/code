/*
  loader: 1. 下载   2. 使用（配置loader）
  plugins： 1. 下载   2. 引入  3. 使用
*/

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/myself/index.js',
  // entry: './src/index.js',
  // entry: ['./src/index.js', './www/index.html'],
  output: {
    filename: 'built.js',
    // publicPath: 'xuni',
    path: resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './www/index.html'
    })
  ],
  mode: 'development',

  // 开发服务器 devServer： 用来自动化（自动编译，自动打开浏览器，自动刷新浏览器~~）
  // 特点：只会在内存中编译打包，不会有任何输出
  // 启动devServer 为 webpack-dev-server
  devServer: {
    // 项目构建后路径
    contentBase: resolve(__dirname, 'www'),
    // 启动gzip压缩，体积更小，这样加载就更快
    compress: true,
    // 端口号
    port: 8080,
    // 自动打开默认浏览器
    // open: true
  }
}