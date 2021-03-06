/*
  HMR：hot module replacement 热模块替换 / 模块热替换
    作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）
      极大提升构建速度

      样式文件：可以使用HMR功能，因为style-loader内部实现了
      js文件：默认不能使用HMR ---> 需要修改js代码，添加支持HMR功能的代码
        注意：HMR功能对js的处理，只能处理非入口js文件的其它文件。
      html文件：默认不能使用HMR功能，同时会导致问题：html文件不能热更新了（不需要HMR功能）
        解决：修改entry入口，将html文件引入(只解决了热更新)

*/

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = 'development';

module.exports = {
  entry: ['./src/js/index.js', './src/index.html'],
  output: {
    filename: 'js/bundle.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      // loader的配置
      {
        // 处理less资源
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        // 处理css资源
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8 * 1024,
            name: '[hash:5].[ext]',
            outputPath: 'imgs'
          }
        }]
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          esModule: false
        }
      },
      {
        exclude: /\.(html|js|css|less|json|png|jpg|gif)$/,
        // test: /\.(eot|svg|ttf|woff)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'media',
            name: '[name].[ext]',
          }
        }]
      },
      
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development',
  devServer: {
    // contentBase: './src/index.html', // 这里写错了,不应该这么写
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: '3000',
    // 开启HMR功能
    // 当修改了webpack配置，新配置想要生效，必须重启webpack
    hot: true
  },
  // browserslist 的配置会导致 devServer 无效，因此需要配置 target
  target: 'web'
}