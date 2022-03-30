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
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        // 问题：默认处理不了html标签中的图片（img）
        test: /\.(jpg|png|gif)$/,
        // 如果只使用一个loader，则可以简写
        // 但是需要下载两个，因为url是依赖file的
        // file-loader url-loader
        loader: 'url-loader',
        options: {
          // 图片大小小于 8KB，就会被 base64处理
          // 优点：减少请求数量（减轻服务器压力）
          // 缺点：图片体积会更大（文件请求速度更慢）
          limit: 8 * 1024,
          // 给图片进行重命名
          // [hash:10]取图片的hash的前10位
          // [ext]取文件原来的扩展名
          // [name]取文件原来的名字
          // name: '[name].[ext]'
          name: '[hash:10].[ext]'
        }
      },
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',
            options: {
              esModule: false
            }
          }
        ]
      }
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