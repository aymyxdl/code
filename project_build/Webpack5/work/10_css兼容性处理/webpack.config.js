const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 设置nodejs环境变量
// process.env.NODE_ENV = 'development';

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          /*
            css兼容性处理: postcss --> postcss-loader postcss-preset-env

            帮postcss找到package.json中 browserslist 里面的配置，通过配置加载指定的css兼容性样式
              "browserslist": {
                // 开发环境  --->  设置node环境变量： process.env.NODE_ENV = 'development'
                "development": [
                  "last 1 chrome version",  // 最新的 chrome
                  "last 1 firefox version", // 最新的 firefox
                  "last 1 safari version"   // 最新的 safari
                ],
                // 生产环境：默认是看生产环境，跟mode的模式没有关系
                "production": [
                  ">0.2%",                  // 大于0.2
                  "not dead",               // 不要已经死了的版本
                  "not op_mini all"         // 不要 op_mini 浏览器
                ]
              }
          */
          // 使用loader的默认配置
          // 'postcss-loader'
          // 修改loader的配置
          {
            loader: 'postcss-loader',
            options: {
              // ident: 'postcss',
              // plugins: () => {
              //   // postcss的插件
              //   require('postcss-preset-env')()
              // }
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ]
                ]
              }
            }
          }
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