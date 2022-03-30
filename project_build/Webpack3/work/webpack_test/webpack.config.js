const path = require('path');   // node内置的模块用来去设置路径的

// 使用commonjs格式
// 配置完了webpack.config.js文件后，就可以直接使用webpack命令打包了，而不用写一长串
module.exports = {
  entry: './src/js/entry.js',   // 入口文件的配置
  output: {                     // 出口/输出的配置
    filename: 'bundle.js',      // 输出的文件名
    path: path.resolve(__dirname, 'dist/js/'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader"
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
};