const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    // 文件名称（指定名称+目录）
    filename: 'js/[name].js',
    // 输出文件目录（将来所有资源输出的公共目录）
    path: resolve(__dirname, 'bulid'),

    // 所有资源引入公共路径的前缀 ---> 'imgs/a.jpg' 经过处理后会变成 '/img/a.js'
    // 这个需要一点服务器知识
    // imgs/a.jpg 是在当前路径下直接找 imgs
    // /imgs/a.jpg 会以当前服务器地址去补充：去服务器的根目录下去找imgs
    // 当服务上线的时候，更倾向于用 publicPath
    // publicPath: '/',

    chunkFilename: 'js/[name]_chunk.js', // 非入口chunk的名称
    // 什么叫入口chunk？entry里面的就是入口chunk
    // 只要不是单入口和多入口，额外的chunk就由此命名
    // 那么如何产生额外的chunk呢？
    // 两种方式：1. 通过import语法（动态import）
    // 2.通过optimization将node_modlues里面的文件分成单独的chunk


    library: '[name]',  // 整个库向外暴露的变量名
    libraryTarget: 'window' // 变量名添加到哪个上 browser
    // libraryTarget: 'global' // 变量名添加到哪个上 node
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  // devServer: {
  //   // 项目构建后路径
  //   contentBase: resolve(__dirname, 'build'),
  //   // 启动gzip压缩，体积更小，这样加载就更快
  //   compress: true,
  //   // 端口号
  //   port: 3000,
  //   // 自动打开默认浏览器
  //   // open: true
  // },
  mode: 'development'
}