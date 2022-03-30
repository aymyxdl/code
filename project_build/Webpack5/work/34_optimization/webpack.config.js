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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'production',
  resolve: {
    alias: {
      $css: resolve(__dirname, 'src/css')
    },
    extensions: ['.js', '.json'],
    modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
  },
  // optimization 在生产环境下才有意义
  optimization: {
    chunks: 'all',
    minSize: 30 * 1024, // 分割的chunk最小为30kb
    maxSize: 0, // 最大没有限制
    minChunks: 1, // 要提取的chunk最少被引用一次
    maxAsyncRequest: 5, // 按需加载时并行加载的文件的最大数量
    maxInitialRequests: 3, // 入口js文件最大并行请求数量
    automaticNameDelimiter: '~', // 名称连接符
    name: true, // 可以使用命名规则
    cacheGroups: {  // 分割chunk的组
      // node_modules 文件会被打包到 vendors 组的chunk中，也就会被命名为 vendors~xxx.js
      // ~ 是上面配置了 automaticNameDelimiter
      // vendors 是这里配置的
      // 满足上面的公共规则，如：大小超过30kb，至少被引用一次
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        // 优先级
        priority: -10
      }
    }
  }
}