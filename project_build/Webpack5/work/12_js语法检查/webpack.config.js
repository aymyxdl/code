const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      /*
        语法检查：希望团队有统一的代码风格，还可以检查一些常见的语法错误，让代码不容易出现问题
        eslint-loader eslint
          注意：只检查自己写的源代码，第三方库是不用检查的
          设置检查规则：
            package.json中 eslintConfig 设置
              "eslingConfig": {
                "extends": "airbnb-base"
              }

            推荐使用 airbnb 规则 ---> eslint-config-airbnb-base   eslint  eslint-plugin-import
      */
    //  {
    //    test: /\.js$/,
    //    exclude: /node_modules/,
    //    loader: 'eslint-webpack-plugin'
    //    options: {
    //      // 自动修复eslint的错误
    //      fix: true
    //    }
    //  }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ESLintPlugin({
      // 自动修复eslint的错误
      fix: true
    })
  ],
  mode: 'development'
  // mode: 'production'
}