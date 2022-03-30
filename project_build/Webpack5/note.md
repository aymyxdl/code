01_webpack简介.

静态模块打包器：
以后的项目开发(模块开发)，通常会在一个文件中，引入整个项目需要的所有资源
也就是引入 js资源，样式资源，图片、字体等资源

这个文件就叫做入口文件
然后webpack会根据这个入口文件进行打包

比如从 入口文件index.js 引入各种依赖，形参一个 依赖关系树状结构图

根据这个  依赖关系树状结构图 依次把这些资源引进了，形成一个东西: chunk(代码块)

然后再对代码块进行 各项处理：将less 编译成 css， js资源 编译成 浏览器能识别的 js
这个过程，统一称作：打包
打包好了后，将这些资源输出出去，叫 bundle


webpack的功能就是这样，所以叫做静态模块打包器



######


webpack的五个核心概念(看 尚硅谷前端技术之webpack从入门到精通(上).pdf)
  entry
  output
  loader
  plugin
  mode




02_webpack初体验

webpack ./src/index.js -o ./build/built.js --mode=development

执行命令 4版本的webpack出了问题
./build/built.js 是目录，而且默认打包名称是 main.js
所以结果是 目录 ./build/built.js 下的 main.js 文件
./build/built.js/main.js 文件




03_打包样式资源

引入css文件需要使用 css-loader


1. 首先创建 webpack.config.js 在里面先写好基本的结构(对应 webpack 的五个核心)

2. loader的配置 是 rules数组中的 一个个对象成员， 每个成员对应一种配置规则
    在 test 属性来设置 解析文件的类型
    在 use 属性中设置 用哪些loader来进行处理
      use属性是个 数组, 其中对 test 类型的文件的处理顺序是 从后往前
    

打包的流程分析：
打包命令 会读取配置文件中的配置信息
首先，找到entry 的入口文件
  这个时候找到 index.js 文件，将它加载进来
  entry 会分析里面 内部依赖图，发现依赖了 css 资源

然后 资源会经过 rules 里面的 loader，对每个资源进行处理
  先是js资源，没有命中规则，跳过
  然后是 css 资源， 命中了 /\.css$/
    然后就会使用下面的两个loader 对 css文件进行处理

然后 通过输出配置，对文件进行输出









我这里有个问题： webpack打包，控制台输出的格式不一样
这种格式看着还以为报错了

asset built.js 16.6 KiB [emitted] (name: main)
runtime modules 937 bytes 4 modules
cacheable modules 8.99 KiB
  modules by path ./src/ 778 bytes
    ./src/index.js 44 bytes [built] [code generated]
    ./src/index.css 332 bytes [built] [code generated]
    ../node_modules/css-loader/dist/cjs.js!./src/index.css 402 bytes [built] [code generated]
  modules by path ../node_modules/ 8.23 KiB
    ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js 6.67 KiB [built] [code generated]
    ../node_modules/css-loader/dist/runtime/api.js 1.57 KiB [built] [code generated]
webpack 5.28.0 compiled successfully in 354 ms


处理 less 的时候，less-loader 仅仅只是将 less 转成 css文件，对css文件的后续处理也不能少





04_打包html资源

html-webpack-plugin 插件是用来打包输出 html的,默认会创建一个空的 html文件，引入打包输出的所有资源(js/css)
在 plugins进行配置

如果是用默认的配置，什么额外的都不需要做

plugins: [
  new HtmlWebpackPlugin()
]



如果有需求，则进行配置

plugins: [
  new HtmlWebpackPlugin({
    // 复制 './src/index.html'  html文件，并 自动注入 打包输出的所有资源
    template: './src/index.html'
  })
],


注意，插件会自动帮我们引入资源文件，所以无须我们手动引入，引入两次反而容易出问题

另外必须 要有路径符号
下面2种都可以
entry: './src/index.js',
entry: '/src/index.js',

这种会报错
entry: 'src/index.js',








05_打包图片资源

这里需要用到 file-loader url-loader 
不过因为 url-loader 是基于 file-loader的封装
所以用只用url，但是下载需要下2个

在loader种配置 url

// 这里用了两种写法，一种是只用了一种loader的写法
{
  // 问题：默认处理不了html标签中的图片（img）
  test: /\.(jpg|png|gif)$/,
  // 如果只使用一个loader，则可以简写
  loader: 'url-loader',
  options: {
    // 图片大小小于 8KB，就会被 base64处理
    // 优点：减少请求数量（减轻服务器压力）
    // 缺点：图片体积会更大（文件请求速度更慢）
    limit: 8 * 1024
    // 给图片进行重命名
    // [hash:10]取图片的hash的前10位
    // [ext]取文件原来的扩展名
    // [name]取文件原来的名字
    // name: '[name].[ext]'
  }
}


// 另一种还是 rules的写法
// 注意 对象中的 属性名 loader 和 options
// 简略形式可以把外层的都省略，直接写内层的格式
{
  test: /\.(jpg|png|gif)$/,
  // 如果只使用一个loader，则可以简写
  rules: [
    {
      loader: 'url-loader',
      options: {
        // 图片大小小于 8KB，就会被 base64处理
        // 优点：减少请求数量（减轻服务器压力）
        // 缺点：图片体积会更大（文件请求速度更慢）
        limit: 8 * 1024
        // 给图片进行重命名
        // [hash:10]取图片的hash的前10位
        // [ext]取文件原来的扩展名
        // [name]取文件原来的名字
        // name: '[name].[ext]'
      }
    }
  ]
}




不过这里有个问题，url-loader默认是处理不了 img标签中引用路径的图片的
因为打包后的资源文件名，和路径都变了

所以，需要另外的loader进行处理
html-loader

{
  test: /\.html$/i,
  loader: 'html-loader'
}
// 这样直接使用有问题，因为html打包了个新的图片，这个图片不知道为什么不能显示，直接用jpg等工具也无法浏览

{
  test: /\.html$/i,
  use: [
    {
      loader: 'html-loader',
      options: {
        // 因此，加上这个参数，这样就不会新打包个文件了
        // 而是路径直接以用url打包出来的那个文件
        // 关闭es6模块化，使用commonjs模块化
        esModule: false
      }
    }
  ]
}







06_打包其它资源

其它资源打包使用的都是 file-loader

这里exclude不能用的原因很有可能是 忘记了排除 js
记住js也要排除，如果有json也要加进去
所以，大项目，不推荐使用exclude，太多了


{
  test: /\.(eot|svg|ttf|woff)$/,
  // exclude: /\.(jpg|png|gif|less|html|js)$/,
  loader: 'file-loader',
  options: {
    name: '[hash:10].[ext]'
  }
},





07_devServer
通过 webpack-dev-server 构建自动化项目

需要先安装 webpack-dev-server

然后在 webpack.config.js 文件中配置启动项

// 开发服务器 devServer： 用来自动化（自动编译，自动打开浏览器，自动刷新浏览器~~）
// 特点：只会在内存中编译打包，不会有任何输出
// 启动devServer 为 webpack-dev-server
devServer: {
  // 项目构建后路径
  contentBase: resolve(__dirname, 'build'),
  // 启动gzip压缩，体积更小，这样加载就更快
  compress: true,
  // 端口号
  port: 3000,
  // 自动打开默认浏览器
  // open: true
}


这里碰到的问题： 视频中说用 npx webpack-dev-server 来启动项目
之前的项目里视频说 webpack-dev-server 启动
在各自的项目视频中，这个都是正确的
但是我这里不行，2021-4-1 安装的 webpack webpack-cli webpack-dev-server 都是最新版本的
我这边的配置命令变了 
webpack serve
直接就可以启动了
webpack这一点真的很烦，三天两头改命令




另外：我想知道全局安装和本地安装有什么不一样，每次我以为我知道各自不同的时候，都会出现新的问题，让我无法理解，无法用现有的知识解释现象


按理来说，我全局安装了 webpack webpack-cli 我的本地居然还提示我需要安装


我猜测可能是 我启动 webpack serve 命令的时候，
webpack webpack-cli 安装在了全局
webpack-dev-serve 安装在了本地

因此全局的webpack需要启动依赖 serve，在全局环境下找不到
它也不可能找到本地的路径，所以报错了

就是不知道如果我本地装了webpack webpack-cli 
但是没装 webpack-dev-serve 是否，本地能向上索引到全局 的依赖？

我实验了把全局 webpack webpack-cli 删除
安装本地 webpack webpack-cli 
发现，竟然无法使用 webpack 命令，不是内部或外部命令
所以上面的 webpack-dev-serve 根本无法验证











08_开发环境配置
进行一个完整的 开发环境配置
// 详情见 08_开发环境配置/webpack.config.js 配置文件

需要注意的是,这里对打包输出的资源也进行了 文件夹的分类
通过 options 中的 outputPath 属性设置

另外开发服务器的 路径别写错了
contentBase: resolve(__dirname, 'build'),






09_提取css成单独文件

css 是被打包整合到 js 文件中的,这样会有问题
1. 体积过大,加载时间变长,因为css 是通过style标签加载的,会出现闪屏现象: 需要将css提取出来
2. css体积大,需要压缩
3. css 和 部分js会有兼容性问题,比如 flash css3等, 需要加些前缀才能在部分浏览器运行

解决的好处
1. 能让代码更快,性能更好的运行
2. 能在各个浏览器,平稳运行

因为这些处理太多,放在开发环境来做的话,会让开发环境做的事情太多,比较累赘,从而然打包速度变得非常的慢
因此这些,都放在生产环境中来做

由此引出 生产环境的配置


提取css文件进行打包的话,需要使用插件
mini-css-extract-plugin
这个plugin自带loader: MiniCssExtractPlugin.loader
这个loader 取代了 style-loader,因此css 规则中不再需要 style-loader
作用是在把css 写成style标签 之前,提取js中的css成单独文件

module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader'
      ]
    }
  ]
}


plugins: [
  new MiniCssExtractPlugin({
    // 另外还能重命名
    filename: 'css/built.css'
  })
],

不过重命名后出现问题,因为提取到了 css文件夹,这样css中的图片的路径就会出问题
评论里说加各种各样的 publicPath: xxx
都没有,因为我认为这个 publicPath 是路径前面的起始路径
就算能匹配上一个,如果其它的url 层级深一点,就匹配不上了
就算图片匹配上了,js等文件也会出问题

这个问题先放着这里吧





10_css兼容性处理

要完成兼容性处理，需要借助两个依赖
css兼容性处理: postcss --> postcss-loader postcss-preset-env

{
  loader: 'postcss-loader',
  options: {
    // 下面注释的是视频老师讲解的，因为这里 postcss-loader 版本更新了，语法变了，查看npmjs重新写了
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

然后 postcss-preset-env 的用法是 使用在 package.json文件中的 browserslist 配置

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

这里要注意开发和生产的区别

所以，总的看起来很多，其实也就三步
1. 首先配置 postcss-loader, 在其中注明使用 postcss-preset-env 插件
2. 在 package.json 中设置 browserslist 列表
3. 设置node环境变量， 以此来设置使用 哪种 browserslist 配置






11.压缩css
视频这里使用的是，但是我这里安装报错，5.x 装不了这个
于是我直接使用了webpack官网介绍的
// optimize-css-assets-webpack-plugin

css-minimizer-webpack-plugin

// 和 module，plugins同级
optimization: {
  // true 表示在开发环境也启用
  minimize: true,
  minimizer: [
    new CssMinimizerPlugin(),
  ],
},






12_js语法检查

// 这是原本的 eslint-loader 的配置

module: {
  rules: [
    /*
      语法检查：希望团队有统一的代码风格，还可以检查一些常见的语法错误，让代码不容易出现问题
      eslint-loader eslint
        注意：只检查自己写的源代码，第三方库是不用检查的
        设置检查规则：
          package.json中 eslintConfig 设置
            "eslingConfig": {
              "extends": "airbnb-base"
            }

          推荐使用 airbnb 规则 ---> eslint-config-airbnb-base   eslint  eslint-plugin-import
    */
  //  {
  //    test: /\.js$/,
  //    exclude: /node_modules/,
  //    loader: 'eslint-webpack-plugin'
  //  }
  ]
}

// 但是现在 eslint-loader 弃用了，改成了 eslint-webpack-plugin

所以不需要使用 loader的配置了


const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  // ...
  plugins: [new ESLintPlugin(options)],
  // ...
};

// 改成 plugins 的配置，这个options 可以不传，使用默认值
package.json 中的 eslintConfig 不可以省略， 还是跟以前一样




// 自动修复eslint的错误
new ESLintPlugin({
  fix: true
})

会自动修改源文件





13_js兼容性处理

兼容性处理时为了让老版本的浏览器也可以运行我们写的代码
因为老版本不支持es6+ 的语法，所以需要转换成 es5 才行

js兼容性处理：babel-loader @babel/preset-env @babel/core
  1. 基本js兼容性处理 --> @babel/preset-env
    问题：只能转换基本语法，如promise不能转换
  2. 全部js兼容性处理 --> @babel/polyfill   （之前我使用 es2015）
    这个不是插件，只需要在 入口文件最上面引用即可
    问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了
    另外，这个包已经废弃了
  3. 需要做兼容性处理的就做：按需加载 --> core-js


{
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    // 预设：提示babel做怎么样的兼容性处理
    presets: [
      [
        '@babel/preset-env',
        {
          // 按需加载
          useBuiltIns: 'usage',
          // 指定core-js版本
          corejs: {
            version: 2
          },
          // 指定兼容性做到哪个版本浏览器
          targets: {
            chrome: '60',
            firefox: '60',
            ie: '9',
            safari: '10',
            edge: '17'
          }
          
        }
      ]
    ]
  }
}

// 这里同时用了1，3，先用3，再用1










16_生产环境配置

这里复习一下统一配置，然后设置生产环境的配置

首先，在 webpack.config.js 中 定义五个核心
然后对 css js 图片 html 这几个方面进行配置

1. css 的配置
一般是使用 style-loader， css-loader
不过，默认是打包到js中，我们希望单独打包出来
所以将 style-loader 替换成 mini-css-extract-plugin
设置一下 css 的打包路径
同理，对 less，sass 等文件进行处理

然后，对css进行兼容性的处理，这个要用到 postcss-loader 
然后 postcss-preset-env 要在 package.json 中设置 browserslist
另外要设置nodejs的环境变量为生产环境，这个和 核心的mode 无关

less等文件也要进行兼容性处理，不过要注意顺序

然后发现 这些loader里面的配置，很多重复了，所以可以提取出来(提取成数组)，然后 ... 展开

最后还要对 css 进行压缩，这里使用 css-minimizer-webpack-plugin


2. js 资源的配置
首先，要对js进行语法检查，注意，检查的是自己的文件，因此，要排除node_modules文件夹
使用es-lint进行检查，需要在 package.json 文件中进行 eslintConfig 的配置，来指示eslint进行哪些检查
为了使检查更加的专业，我们使用 airbnb 这个规则
需要使用 eslint-config-airbnb-base
使用过程中，会出现报错的现象，因此我们设置自动修复

提示，现在 eslint-loader 弃用了，使用 eslint-webpack-plugin

然后对js进行兼容性的处理，使用 babel-loader
两个步骤，首先使用预设 presets 告诉webpack 使用什么方式进行处理，这里使用 @babel/preset-env
使用最基本的环境最一些处理，这个只能对基础语法进行处理，但这样是远远不够的(只能处理 const 箭头函数 三点运算符等等)
而不能处理 promise object.keys/values 方法就不行，

因此，使用升级方案 core-js

本来是需要指定 eslint的 enforce参数的，不过我们这里没用 eslint-loader了
使用的使用 eslint-webpack-plugin 插件，所以不需要了

对于js的压缩来说，将 mode 设置为生产环境，就会自动压缩了


3. 图片格式

对jpg、png、gif格式的图片使用 url-loader 处理(url是基于 file-loader 的封装)
然后进行一些详细的配置，比如大小的限制，name的设置，以及输出目录的设置

4. hmml 资源的处理

使用 html-webpack-plugin插件进行处理，
设置 template 参数，以指定 html模板来创建新的 html文件

然后又有新的问题， html中的 img标签的图片处理不了，因此需要用到 html-loader
这里有个需要注意的地方，我们 html-loader 使用的是 commonjs，
而 url-loader 使用的是 es6
因此需要关闭 url-loader 的 esModule
（最新的html-loader 也需要关闭 esModule，然后 url反而无所谓了，不过严谨一点，也关闭吧）

最后对html进行一下压缩，minify 是个对象，去除空格以及注释，这样就算压缩了

5. 其它文件
最后最后，还需要处理一下其它文件， 这里使用排除法（排除的是上面使用到的loader的文件）
使用 file-loader,原封不动的输出文件，
可以设置指定的输出目录以及重命名




17_优化配置介绍

webpack优化从下面几个方面出发


# webpack性能优化
* 开发环境性能优化
* 生产环境性能优化

##  开发环境性能优化
* 优化打包构建速度
* 优化代码调试


##  生产环境性能优化
* 优化打包构建速度
* 优化代码运行的性能





18_HMR

问题：这里会出现一个问题，使用dev server 发现修改了任何文件，页面都不会自动更新
这是因为我们后面的配置使用了 browserslist 会导致 webpack 5 无法自动更新
需要在 webpack.config.js 中配置 target: 'web'
与 五个核心 平级



启动开发服务器会发现，无论你修改什么文件，浏览器整个页面都会重新刷新
哪怕我们修改的只是一个小小的样式，这对开发来说开销太大,很不友好
因为我们只需要修改的那一个模块进行更新就行，而不必所有的模块都更新

因此，我们需要webpack的 HMR 功能
很简单，在 webpack.config.js 的 devServer 配置中 加上 hot: true 就行了


样式资源：style-loader 里面已经进行了 HMR的处理，所以我们不需要进行配置，只需要使用style-loader就行了
（那么我们生产环境不使用 style-loader 的情况下该怎么办？
答：感觉问的有些智障了，生产都已经上线了，怎么可能还需要实时开发替换？
所以开发使用style-loader,加快速度，生产直接提取css文件）

html不需要做 HMR 功能：
因为现在的项目都是 spa ，所以只有一个 html文件
不像js有很多个，修改其中一个，其它的不变
而html只有一个，修改了这个，肯定会改变


js文件：在 入口文件中最底部加上 if (module.hot) 的判断

问题：这个 hmr 对 js文件的处理，感觉 耦合太高了，我万一有一万个js文件，
if (module.hot) 里面要写一万个配置，然后回调函数里面的代码该怎么写？（需要用到变量的情况下，怎么变化？）
太麻烦了，后面有没有好的优化方案？








19_source-map

没有配置source-map 的情况下，为什么也能找到错误信息？
我这里只能提示错误语句，不能跳转（视频有的人说可以精确跳转）
有人解释说是webpack默认会配置 source-map，有人说是浏览器默认配置






20_oneOf

当配置文件中有多个loader时，一个文件需要经过层层匹配，来确定是否符合当前loader的配置
如果不符合，进行下一个loader的匹配，哪怕命中了，执行loader之后，还是会继续匹配剩下的（虽然剩下的都不会命中）
这样，无形中就增加了很多开销
因此，rules中可以通过 oneOf 来进行loader的匹配，在oneOf 中的 loader 只会命中一次，也就是一个文件通过loader处理一次后，就不会继续往下匹配了
这样就能节省不少开销
不过，如果有一个文件需要经过两次loader的处理时，那么也只会执行一次，另外的就不会执行了
（就比如js文件，不仅需要用于 eslint 规范检查，还需要进行压缩打包）
这个时候，就需要将js文件的其它loader的处理放到 oneOf 外面


视频老师说这个是 优化生产环境 构建打包速度的配置，这个我认为也可以放到开发环境下吧？






21_缓存

在开发中，js永远是最多的文件，在编译过程中，如果生产模式只改了一个文件
按理来说，只需要重新编译改动的文件，剩下的文件，不需要重新编译(太浪费开销了，时间成本)
这点，跟之前的hmr 功能一样，不过 HMR 是针对的开发环境，生产无须 HMR（hmr是基于 devserver的，生产不需要devserver）
因此，可以开启babel缓存来达到效果
webpack会把一开始编译的文件进行缓存处理，重新打包的时候，如果发现文件没有进行改动，那么就用缓存，而无须重新进行编译打包处理

在loader的options中加上 cacheDirectory: true

但是缓存开启后，会有一个问题
从服务器获取文件的时候，如果开了缓存，这时如果文件名没有改变，那么返回的就是缓存数据
哪怕你修改了数据，重新打包编译，返回的也是之前的缓存
因此，前端直接刷新的话，还是旧数据，需要强制刷新

于是，需要对打包后的文件名也进行设置，这里使用在文件名后面加上hash的做法来解决这个问题

这个时候，重新获取数据的话，虽然有缓存，但是文件名变了，所以会请求新的数据（当然，哪些没有改变的文件，还是用缓存）

这里hash有多种写法


/*
  缓存：
    babel缓存
      cacheDirectory: true
      --> 让第二次打包构建速度更快
    文件资源缓存
      hash: 每次wepack构建时会生成一个唯一的hash值。
        问题: 因为js和css同时使用一个hash值。
          如果重新打包，会导致所有缓存失效。（可能我却只改动一个文件）
      chunkhash：根据chunk生成的hash值。如果打包来源于同一个chunk，那么hash值就一样
        问题: js和css的hash值还是一样的
          因为css是在js中被引入的，所以同属于一个chunk
      contenthash: 根据文件的内容生成hash值。不同文件hash值一定不一样    
      --> 让代码上线运行缓存更好使用
*/




这里一定要注意，hash的写法
hash
chunkhash
contenthash
这里没有大写，千万不要写错了

hash:10 
修改前
built.d4afa7850e.css
built.d4afa7850e.js
单独修改js后
built.cf3a2cbc6c.css
built.cf3a2cbc6c.js

刷新页面自动获取最新代码，没有拿缓存

换成chunkhash一样：更改代码后，刷新页面自动获取最新代码，没有拿缓存






视频评论有人说 contentHash 弃用了(不过我倒是感觉用着还可以)





22_treeshaking

什么是 tree shaking
可以把你的应用程序想做是一棵树,而你在应用程序中引用的源代码，可以想象成树上的绿色的树叶（或的树叶）
那么这个库里可能有一些没有引入的代码，可以看作灰色的树叶（枯萎的树叶）
为了去掉这些灰色的树叶，我们需要摇晃这棵树，那么，就可以去掉他们，这就是树摇的概念




树摇的目的是为了去除在应用程序中没有使用的代码，这样能让代码体积变得更小

有的版本，tree shaking 可能会无意中删除一些代码
（1. 设置了 "sideEffects": false,  2. 或者某些过去的版本中，没有配置 sideEffects，会自动删除css文件之类的）
所以最好设置一下 sideEffects

在package.json中配置  "sideEffects": false


有个问题： sideEffects 为什么不可以设置成 true？
https://zhuanlan.zhihu.com/p/41795312









23_code split

code-split（很重要）
代码分割主要是将我们打包的一个chunk(打包输出的一个文件)，分割成多个文件
这样我们就能去实现各项功能
比如分割成3个文件，这样就能并行加载，从而加载速度更快

同时，分割成更多的文件，还可以完成 按需加载的功能（需要用，就加载，不用，就不加载）

按需加载：对我们来说是非常重要的
因为后面开发单页面应用的使用(比如vue)
整个页面是一个非常庞大的文件
那么肯定要按照路由去拆分一些文件，从而去按需加载
而需要拆分文件，就需要用到webpack的代码分割
首先需要将每个路由文件都拆成单独的js文件，这样才能实现按需加载



在 webpack.config.js 中，设置entry的单入口和多入口
单页面应用 一般使用 单入口
多页面应用 一般使用 多入口



根据 demo1 的多入口这样设置的话，会发现有些不太灵活，因为经常更改（增加删除）入口文件的话
entry的对象也要进行改动,很麻烦

问题: demo1中使用了多入口引入了 test.js,于是我在index.js中就没有再引入
不过使用test.js文件中的方法的时候报错了(所以这个多入口有啥用?)
答: 我检查了代码之后,发现这个多入口,是在index.html中的 head标签中,自动引入
entry里面设置的那些入口文件,
而导致方法报错的原因是,代码压缩打包后,test里面没有用到的函数,直接被删除了
这就导致,哪怕引入了test.js,里面的函数没有了,index.js里面才会报错
test里面的源方法删除了,哪怕你使用了,也会删除,因为打包后哪怕用到了原来的方法
也会被改成面目全非



demo2, demo3 懒得在note里写,后面补吧,可以直接看代码


感觉这三种都不咋样啊,最后spa应用肯定不用1,2
哪怕是第三种感觉也不实用啊





24_lazy loading

正常加载文件资源的时候，会并发请求多个，这个时候，多个文件请求负载很重，有时候会花很多时间
而有的暂时不需要用到的(后面才有用的)，就没必要第一时间加载进来


所以有了懒加载


document.getElementById('button').onclick = function () {
  懒加载
  第一次加载后,多次点击的话,并不会多次加载
  而是直接读取缓存的数据（可以通过看test的log验证）

  import(/* webpackChunkName: 'name' */'./test').then(({ mul }) => {
    console.log(mul(2, 3));
  })

  除了懒加载，还有另外一种 预加载
  预加载 prefetch: 会在使用之前，提前加载js文件
  import(/* webpackChunkName: 'name', webpackPrefetch: true */'./test').then(({ mul }) => {
    console.log(mul(2, 3));
  })

  
  // 正常加载可以认为是并行加载（同一时间加载多个文件）
  // 预加载 prefetch：等其它资源加载完毕，浏览器空闲了，再偷偷加载资源

  // 懒加载有个小问题：用的时候才加载(http请求)，如果文件过大，会有一点点延迟的效果
  // 预加载就不会，先给你偷偷加载好，用的时候已经加载好了，又不会影响其它资源的加载（不过兼容性很差，只能在pc高端浏览器使用，移动端，ie会有问题）

  // 懒加载用的时候才发送http请求
  // 预加载等其它资源优先加载完毕，再偷偷发送请求加载

  // 考虑到兼容性问题，用懒加载(资源大的时候，慢一点也没关系)，预加载慎用
}






25_PWA


pwa 是 service woker(??没听清) 加上 cache做出来的
是用来帮助让我们的网页像 app应用程序 一样，离线也可以访问，性能也更好
也叫做 渐进式网络 开发应用程序


好像很多都放弃了？（之前淘宝还在用，现在放弃了2020-4-7）

现在国内不流行pwa






26_多进程打包

需要安装 thread-loader，一般给babel-loader用，因为处理最多的是js文件




27_externals

在 webpack.config.js中进行 externals 的配置
就是把本来需要打包的文件，忽略打包
（就比如jquery，太大了，80多k，忽略打包的话，整体就可以大大缩小
不过忽略了，打包后代码如何使用jquery呢？这时候别忘记在模板html中引入jquery的网络资源标签）


用处：把某些需要cnd引入的资源，拒绝进行打包，节省开销

externals: {
  // 拒绝jQuery 被打包进来
  jquery: 'jQuery'
}

注意这个 externals 的 key-value

注意: key是包名, value是页面引入jq时提供的变量(对象)
value是第三方库暴露出来的方法名（cdn提供的是 jQuery）




28_dll 
dll: 动态连接库
和 externals 一样，用来指示哪些库不需要打包
但是和 externals 又有不同：dll 会对某些库进行单独打包，输出打包成一个chunk

意义：正常情况下，node_modules 里的库会被打包成一个chunk
但是第三方库非常非常多，如果全部打包成一个文件，那么体积就会非常的大
所以通过dll技术，将这些第三方库单独拆开来，打包成一个个的单独的文件
打包成一个个的chunk，这样更加利于性能的优化



操作：
简单来讲，就是对代码进行单独打包
但是单独打包，需要另外写配置文件
这里新建一个 webpack.xxx.js
我们这里因为使用dll技术，所以叫做 webpack.dll.js


当运行webpack时，默认是查找 webpack.config.js 配置文件
当需要运行其它的文件时，比如 webpack.dll.js
--> webpack --config webpack.dll.js


运行上面的打包命令后，就会生成一个dll文件，里面就把juqery打包出来了
而jquery.js 向外暴露的名称就是 [name]_[hash] 的格式，这个hash就是文件生成的hash值

而 manifest.json 文件里面的映射，就是为了以后告诉 webpack jquery不用打包了

生成了dll文件夹后，以后jquery就不用再打包了，直接使用jquery就可以了


而 webpack.config.js 同样也要引入插件
// 这里简写，看文件
new Webpack.DllReferencePlugin()


这样将来打包运行 webpack(执行 webpack.config.js 配置文件)时，就不会再打包 jquery了

但是这里还有问题,就是虽然已经打包好了，代码也已经替换了
但是发现html的模板文件中，没有自动引入jquery

所以需要安装插件
add-asset-html-webpack-plugin
作用是：将某个文件打包输出出去，并在html中自动引入该资源

视频老师的没有问题：我的有个问题，打包后的html的路径
前面多了个 auto
<script defer src="auto/jquery.js"></script>
不知道是webpack升级导致的，还是 add-asset-html-webpack-plugin 插件的问题



另外，视频弹幕说vue和react去除了dll，不知道真假

和 externals 不同的是，externals 是不打包，引用外部 cdn的库
而 dll 是单独先打包，最后生成不打包，把之前打的包引入进来




















29总结 

# webpack性能优化
* 开发环境性能优化
* 生产环境性能优化

##  开发环境性能优化
* 优化打包构建速度
  * HMR
* 优化代码调试
  * source-map


##  生产环境性能优化
* 优化打包构建速度
  * oneOf
  * babel缓存
  * 多进程打包
  * externals
  * dll
* 优化代码运行的性能
  * 缓存(hash-chunkhash-contenthash)
  * tree shaking
  * code split
  * 懒加载/预加载
  * pwa











问题：webpack多入口报错（看29_entry）


30_output

问题：这个library除了在 dll时用到？
还有什么时候会用到，根本不知道怎么用


34_optimization
太多了，看不下去了，这个视频后面看吧

https://www.bilibili.com/video/BV1e7411j7T5?p=38
看到了08:30





webpack打包的文件是闭包


最后，还是对 vue-cli 的webpack的配置不太了解，尴尬


