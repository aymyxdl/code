const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, 'bulid'),
  },
  module: {
    rules: [
      // loader的配置
      {
        test: /\.css$/,
        // 多个loader用use
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'development',
  // 解析模块的规则
  resolve: {
    // 配置 解析模块 路径别名: 优点简写路径 缺点路径没有提示
    alias: {
      // 因为大项目中路径层次非常的深，经常引用文件时会出现非常长的路径名
      // 使用别名可以省略一大串文字，vue中的 @ 就是用这个配置的
      $css: resolve(__dirname, 'src/css')
    },
    // 配置省略文件路径的后缀名，默认是js和json
    // 就是import后面的后缀名
    // import index from './index'
    // import './index.css'
    // 补充顺序从左往右
    extensions: ['.js', '.json'],
    // 告诉 webpack 解析模块是去找哪个目录, 默认是 node_modules
    modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
  }
}