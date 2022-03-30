/*
  loader: 1. 下载   2. 使用（配置loader）
  plugins： 1. 下载   2. 引入  3. 使用
*/

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
    ]
  },
  plugins: [
    // plugins的配置
    // html-webpack-plugin
    // 功能：默认会创建一个空的 html文件，引入打包输出的所有资源(js/css)
    // 默认的情况 new HtmlWebpackPlugin() 就行
    // 如果有需求，则进行配置
    // 需求：需要有结构的html文件
    new HtmlWebpackPlugin({
      // 赋值 './src/index.html'  html文件，并 自动注入 打包输出的所有资源
      template: './src/index.html'
    })
  ],
  mode: 'development'
}