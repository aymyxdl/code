1、首先使用 npm init -y     创建一个package.json文件

2、使用命令安装所需的依赖   cnpm i -D webpack webpack-cli typescript ts-loader

3、创建webpack的配置文件    webpack.config.js

    首先，需要引入包

    const path = require('path');       

    // 引入的 path 是node中的一个模块，主要内容是帮助我们来拼接路径

4、创建tsconfig.json文件

5、修改package.json文件，添加 打包命令

    "build": "webpack"


//  这时候，一个最最基本的wenpack和ts整合就完成了

// 继续往下走，此时，虽然已经把ts文件打包好了
// 但是，文件要运行的话，还是要放到网页中去，这是很简单的，我们可以手动创建一个html文件，然后再把js引入
// 不过，又有问题，这样手动创建，很麻烦，因为后面可能需要非常多的js或者css文件，如果手动一个个的去导入，很不优雅，也不现实
// 所以，需要webpack自动帮我们生成这个html文件，然后自动根据配置导入这些js或者css
// 因此，需要安装一个插件   npm i -D html-webpack-plugin

6、安装 html-webpack-plugin 插件，然后在webpack中引入此模块。
     npm i -D html-webpack-plugin 
     const htmlWebpackPlugin = require('html-webpack-plugin');       



7、配置webpack插件

plugins = [
    new HtmlWebpackPlugin(),
]

// 这样虽然创建了一个html文件，但是里面的东西不是自己配置的
// 这是可以传参数

plugins: [
    new HtmlWebpackPlugin({
        title: '创建的模板',
    }),
]

// 但是这样也不方便，所以我们是否可以自己创建一个html文件的模板，里面用我们自己想要的内容
// 这个时候，使用template参数

plugins: [
    new HtmlWebpackPlugin({
        // title: '创建的模板',
        // 传入模板文件的位置
        template: './src/index.html'
    }),
]


// 这个时候，html文件有了，但是每次我们手动打开html文件查看开发实际效果确认很麻烦
// 所以是否可以有一个webpack服务器启动项目，我们通过网址访问每次打包后的文件（这个就是开发中经常用的 npm start 或者 npm run dev）

8、安装  webpack开发服务器

npm i -D webpack-dev-server

"start": "webpack serve --open chrome.exe"

// 这个时候，就已经对项目文件进行了实时监测更新(热加载)



// 这个时候，基本的webpack配置就已经完成了
// 还有2个小细节
// 一般情况下，dist目录的文件，并不会删除，而是每次打包生成的新文件会替换旧文件
// 所以我们就希望每次更新前，把旧文件删除，这样就能保证每次的都是新文件，没有旧缓存


9、安装clean插件

npm i -D clean-webpack-plugin


// 引入clean插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

    // 配置webpack插件
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // title: '创建的模板',
            template: './src/index.html'
        }),
    ]


// 当ts文件 import其他ts文件的时候，打包会出错
// 因为在webpack中，它默认是不知道可以把 ts 作为模块引入的

10、使用 resolve 配置

    // 用来设置引用模块
    // 和plugins同级
    resolve:{
        extensions: [ '.js', '.ts']
    }



// babel 把新语法转换成旧语法，让代码可以在旧版本的浏览器中正常运行（兼容性）

11、设置babel

// @babel/core

// @babel/preset-env 预设了各种浏览器的环境，包括但不限于谷歌，IE，火狐，等等

// babel-loader 把babel和webpack结合起来的工具

// core-js  js的运行环境，或者说模拟js运行环境的代码，它的作用就是让老版本的浏览器，可以用到新标准的技术（不用旧的浏览器环境，我给你提供一个新的）
// 但是core-js 本身是一个很大的工具，很多地方我们用不上，稍后会在配置项中进行按需加载的配置
npm i -D @babel/core @babel/preset-env babel-loader core-js

//  安装完之后，进行webpack.config.js 的配置， 因为加了新的加载器（loader），所以只需要改modules里面的配置
//  因为同样对ts文件进行配置，所以 use改成数组，ts-loader放在后面的原因是loader的执行顺序是从后往前
//  意思就是希望先把ts转传js，再把新版js的代码转换成旧版的js代码

// babel的设置可以简单的 'ts-loader' 这样粗略的设置
// 也可以使用对象进行具体的设置

// 下面是配置文件


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


// 如果不使用上面面的babel的配置，会使用 tsconfig.json 中 compilerOptions.target的配置
// 然后再用上面面的配置继续进行转换

// 上面的  corejs: 3， 一般都是用在特殊类的转换上面
// 就比如  Promise,  console.log(Promise)
// 如果代码没用到特殊类，那打包的文件很小，如果用到了特殊类，那么打包的文件很大（这也是之前 按需加载的配置 实现）

// 实际上，上面的代码配置完了之后，打包出来的文件，不一定能在ie 11中运行
// 那是因为 webpack 打包的时候，它把js文件打包成了箭头函数（函数内部的箭头函数会被babel进行转换，但是bebel不转换这个最外面的箭头函数）
// 此时，需要对webpack进行配置（因为webpack默认也是放弃了IE 11）
// 在 output中配置 environment 对象

    output: {

        path: path.resolve(__dirname, 'dist'),

        filename: 'bundle.js',

        // 在enviroment 中设置
        // 告诉webpack不使用箭头函数
        environment: {
            arrowFunction: false
        }

    },