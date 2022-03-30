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
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: '3000',
    hot: true
  },
  target: 'web',
  devtool: 'source-map'
  /*
    source-map: 一种 提供源代码到构建后代码映射 技术 （如果构建后代码出错了，通过映射可以追踪源代码错误）

      [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map

      source-map：外部
        错误提示：
          错误代码准确信息 和 源代码的错误位置
          （能精确到源代码的文件，以及行和列
            如果不开启，默认谷歌调试点击报错信息，只会跳转到打包后的文件，这样的提示说实话，没有用处，因为是编译打包压缩，兼容处理后的文件，对调试没有任何帮助
            开启了的话，点击跳转，可以跳转到打包前的目录下的文件的精准定位，还会提示出错误的行和列
            ）

      inline-source-map：内联
        只生产一个内联source-map
        错误提示：
          错误代码准确信息 和 源代码的错误位置(和 source-map 一致)
      hidden-source-map：外部
        错误提示：
          错误代码错误原因，但是没有错误位置
          不能追踪到源代码的错误，只能提示到构建后代码的错误位置
          （调试的 console 输出控制台，能够打印错误的语句原因，但是点击跳转，不能跳转到精准的打包前的位置）
      eval-source-map：内联
        每一个文件都生产对于的source-map，都在eval函数中
        错误提示：
          错误代码准确信息 和 源代码的错误位置(和 source-map 一致)
          (这里视频老师的情况是一致的，我现在2021-4-5调试发现有点不一样
            我这里错误提示直接点进去是打包后的文件，没啥用
            但是错误提示的第二行，点击提示跳转，可以找到打包前的文件的精准定位，文件名后面有几个哈希值)

      nosources-source-map：外部
        错误提示：
          错误代码准确信息(也就是错误语句),但是没有任何源代码信息
            为了防止源代码泄漏，起到保护的举措

      cheap-source-map：外部
        错误提示：
          错误代码准确信息 和 源代码的错误位置
          但是只能精确到行，不能精确到列
          （会提示错误的整行信息，而无法提示哪句表达式错误
            另外，和eval一样，要点击错误提示的第二行才能跳转）
      cheap-module-source-map：外部
        错误提示：
          错误代码准确信息 和 源代码的错误位置
          但是只能精确到行，不能精确到列(和 cheap-source-map 一致)
          那么：cheap-module 和 cheap 到底有什么区别？
            区别在于 module：
              module 会将loader的source-map 也加进来

      内联 和 外部的区别：1. 外部生成了文件，内联没用 2.内联构建速度更快

      
      提供了这么多的选择，还可以任意组合，那么到底应该怎么用呢？

      开发环境：速度快，调试更友好
        速度快(eval>inline>cheap>...) 
          eval-cheap-source-map （组合起来最快）
          eval-source-map

        调试更友好
          source-map  (因为精确到行和列)
          cheap-module-source-map (因为加上了所有内容)
          cheap-source-map


        折中均衡结果 --->
          eval-source-map / eval-cheap-module-source-map

      生成环境：源代码要不要隐藏？调试要不要友好？
        内联会让代码变得非常大，所以生产环境下不用内联

        隐藏：
          hidden-source-map     只隐藏源代码，会提示构建后的代码错误信息
          nosources-source-map  全部隐藏

        调试：
          source-map / cheap-module-source-map


      这里太绕了，很多组合，我建议开发直接用 source-map(因为我这里的eval，第一行直接点击无法跳转到源代码)
      生产就 nosources-source-map
  
  */
}