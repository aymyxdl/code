// 引入一个包
const path = require('path');

// 引入html插件
const HtmlWebpackPlugin = require('html-webpack-plugin');  

// 引入clean插件

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// 正式编写配置文件
// webpack中的所有配置信息都应该写在module.exports中
module.exports = {

    // 指定入口文件
    entry: './src/index.ts',

    // 指定打包文件的所在目录

    output: {

        // 指定打包文件的目录

        // 可以直接写目录
        // path: './dist'

        // 但是都引入了path，所有使用path来拼接
        // 搞清楚  __dirname什么意思
        path: path.resolve(__dirname, 'dist'),

        // 打包后文件的名称
        filename: 'bundle.js',

        // 告诉webpack不使用箭头函数
        environment: {
            arrowFunction: false
        }

    },

    // 指定webpack打包时要使用的模块
    module: {
        // 指定要加载的规则
        // 因为项目中有各种各样的后缀名的文件，  ts  js  png  svg  vue  所以需要使用不同的规则来对应处理这些文件

        rules: [
            {
                // test指定的是规则生效的文件
                test: /\.ts$/,
                // use 指定使用的规则(loader)
                use: [
                    // 配置babel
                    {
                        // 指定加载器
                        loader: 'babel-loader',
                        // 设置babel
                        options: {
                            // 设置预定义的环境
                            presets: [
                                [
                                    // 指定环境的插件
                                    '@babel/preset-env',
                                    // 配置信息(对象结构)
                                    {
                                        // 指定代码最终在哪些版本运行（要兼容的浏览器）
                                        targets: {
                                            'chrome': '54',
                                            // 这里的ie 11 其实就是兜底了，应该ie 11不支持const这些es6的语法
                                            'ie': '11'
                                        },
                                        // 指定用哪个版本的corejs转换（指定corejs的版本）
                                        'corejs': '3',
                                        // 使用corejs的方式，usage表示按需加载
                                        // corejs中提供了很多功能，但是很多我们用不上，如果一起打包，会让打包后的文件变得更大，运行起来更耗费浏览器内存
                                        // 使用按需加载，这样能够确保打包后的文件有一个最小的大小
                                        'useBuiltIns': 'usage'
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                // 要排除的文件
                exclude: /node_modules/
            }
        ]
    },

    // 配置webpack插件
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // title: '创建的模板',
            template: './src/index.html'
        }),
    ],

    // 用来设置引用模块
    resolve:{
        extensions: [ '.js', '.ts']
    }
}