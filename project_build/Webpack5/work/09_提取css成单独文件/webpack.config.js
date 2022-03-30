// import { resolve } from 'path';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    // publicPath: resolve(__dirname),
    // publicPath: '/build/',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 'style-loader',
          // 这个 loader 取代了 style-loader. 作用: 提取js中的css成单独文件
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(jpg|png|fig)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          outputPath: 'imgs',
          name: '[hash:10].[ext]'
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.css'
    })
  ],
  mode: 'development'
}