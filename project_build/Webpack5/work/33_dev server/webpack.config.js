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
  mode: 'development',
  resolve: {
    alias: {
      $css: resolve(__dirname, 'src/css')
    },
    extensions: ['.js', '.json'],
    modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
  },
  // devServer一定是用于开发环境
  devServer: {
    // 运行代码的目录
    contentBase: resolve(__dirname, 'build'),
    // 监视 contentBase 目录下的所有文件， 一旦文件变化就会reload
    watchContentBase: true,
    watchOptions: {
      // 忽略文件
      ignored: /node_modules/
    },
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 5000,
    // 域名
    host: 'localhost',
    // 自动打开浏览器
    open: true,
    // 开启HMR功能
    hot: true,
    // 不要显示启动服务器日志信息
    clientLogLevel: 'none',
    // 除了一些基本启动信息意外，其它内容都不要打印
    quiet: true,
    // 如果出错了，不要全屏提示~
    overlay: false,
    // 服务器代理 --> 解决开发环境的跨域问题
    proxy: {
      // 一旦devServer(5000)服务器接收到 /api/xxx 的请求，就会把请求转发到另外一个服务器(3000)
      '/api': {
        target: 'http://localhost:3000',
        // 发送请求时，请求路径重写：将 /api/xxx --> /xxx(去掉/api)
        pathRewrite: {
          '^/api': ''
        }
      }
    }
    /*

      跨域是浏览器特有的,服务器则不存在
      意思就是只有浏览器和服务器的通信，才会存在跨域（同源策略）
      而服务器和服务器之间的通信，并没有跨域问题

      而我们代码通过代理服务器(devServer)运行，因此，我们的浏览器和代理服务器(devServer)是没有跨域问题的
      所以浏览器把请求发送到代理服务器上
      而代理服务器替你转发到另外一个服务器上
      因为服务器之间没有跨域问题，所以请求成功
      而代理服务器则把响应体 再发送到浏览器
      从而解决开发环境下的跨域问题
    
      // 看视频弹幕说，生产环境需要反向代理？
      // 因为这里的代理是配置在 devServer 中配置的，而生产环境没有 devServer
      // 另外，生产模式一般已经是放在服务器上面了，所以服务器之间的通信不会有问题
      
    */
  }
}