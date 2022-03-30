const { resolve } = require('path');
const Webpack = require('webpack');


/*
  使用dll技术，对某些库（第三方库： jquery，react，vue...）进行单独打包

*/

module.exports = {
  entry: {
    // 最终打包生成的 [name] --> jquery(这个是key)
    // ['jquery'] ---> 要打包的库是 jquery(这个是value里的)
    // ['jquery'] 是数组，表示以后jquery相关的都可以放进来 ['jquery', xxx, xxx]
    // 这里只演示 jquery一个
    jquery: ['jquery']
  },
  output: {
    path: resolve(__dirname, 'dll'),
    // entry 的 [name]
    filename: '[name].js',
    library: '[name]_[hash]', // 打包的库里面向外暴露出去的内容叫什么名字
  },
  plugins: [
    // 这里需要建立一个依赖关系，将来告诉webpack不要打包 jquery的第三方库
    // 需要借助一个插件来生成一个文件：插件是 webpack 自带的
    new Webpack.DllPlugin({
      name: '[name]_[hash]', // 映射库的暴露的名称内容
      path: resolve(__dirname, 'dll/manifest.json'),  // 输出文件路径
    })
  ],
  mode: 'production'


  /*
    上面的配置：
    entry和output 是专门用来打包jquery的，同时设置 juqery向外暴露的名称是 [name]_[hash]

    而 plugins 是用来帮我们生成一个 manifest.json 文件
    用来提供一个映射关系（因为目前只有juqery，所以只是提供jquery的映射）
    将来通过映射就知道，jquery这个库不需要打包
    并且对外暴露的内容是 [name]_[hash]
  
  */
}