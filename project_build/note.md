1、什么是项目构建？

答：就是去
  编译项目中的 js,sass,less
  合并js/css等资源文件
  压缩js/css/html等资源文件
  JS语法的检查

  简单点就是进行编译，对项目源文件进行合并压缩等一系列操作



2、我们这里学的是项目构建工具
工具的作用就是帮我们  简化项目构建，自动化完成构建


3、构建工具
  Grunt
  Gulp
  Webpack

  占比重比重大的是 gulp 和 webpack(最火的)
  有的gulp和webpack一起使用

  grunt国外市场比较多



// ===========

Grunt:
      视频地址：

      视频名称：尚硅谷前端Grunt教程，自动化构建工具grunt

    需要全局安装  grunt-cli
    npm install -g grunt-cli

    项目安装 grunt
    npm insatll grunt --save-dev


    Gruntfile.js  grunt的配置文件
    这个和 babelrc文件的性质一样
    grunt在执行任务的时候，上来就去读取这个文件
    所有需要执行的任务，都在这里配置

    配置文件整体分为三部分
      1. 初始化配置grunt任务
      2. grunt任务执行的时候去加载对应的任务插件
      3. 注册grunt的默认任务


    grunt的常用命令

    grunt-contrib-concat  // 合并文件的操作

    npm install grunt-contrib-concat --save-dev

    具体的配置去官网查
    任务名: 通常和插件名称一样(任务名里还有一系列的配置)

    配置完成后,执行grunt 任务名


    // 任务名里面需要配置 操作的项目文件
    ./js/*.js 表示打包js目录下的.js文件
    但是这样并不能打包js目录下面所有文件夹里面的js文件
    问题1: 怎么配置?
    src/**/*.js

    问题2: concat不只能合并js文件,同时需要合并css文件的时候
    该如何使用命令分别操作js和css的配置呢?

    js 使用 concat合并,uglify压缩
    cssmin 则把 压缩合并全干了




    // ==========

    grunt-contrib-uglify  // 压缩命令

    npm install grunt-contrib-uglify --save-dev

    配合完了后,还需要添加 导入插件 的配置

    // 多个任务时,不能使用数组,需要多个 loadNpmTasks
    // grunt.loadNpmTasks(['grunt-contrib-concat', 'grunt-contrib-uglify']);

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');


    // =======
    启动默认任务
    情景: 当有多次操作需要重新执行的时候,手动从上到下按顺序执行一遍命令,太繁琐了
    所以,可以配置默认任务,里面时你要执行的命令(依次顺序执行,也就是同步的)
    [] 里面时任务名

    grunt.registerTask('default', ['concat', 'uglify']);

    另外,压缩的时候,如果你声明了变量或者函数,但是没有使用的话,不会把这些代码进行压缩展示(就是帮你删掉了)

    视频里说:grunt 不支持 es6 的写法,需要先用babel编译成 es5
    不过我这里默认的是可以转换的: 2021-3-31


    // =====
    grunt-contrib-jshint

    npm install grunt-contrib-jshint --save-dev

    jshint: {
      options: {
        jshintrc: '.jshintrc' // 指定配置文件
      },
      build: ['Gruntfile.js', 'src/**/*.js']
      // all 是目前 2021-3-31的最新配置
      // all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js']
    }

    // 这个jshint有的乐, grunt好像默认都能转换 es6了,然后jshint帮你检查不能使用es6


    // =====

    使用watch插件(真正实现自动化)
    grunt-contrib-watch

    npm install grunt-contrib-watch --save-dev

    watch: {
      scripts: {
        // 源文件
        files: ['**/*.js'],
        // 当监视的源文件发生变化时,会自动执行这些命令
        tasks: ['jshint'],
        options: {
          // spawn 英文有 大量生产的意思
          // 在这里表示变量更新(哪种类型的文件修改了,就调用对应文件的执行命令)
          // 比如只修改了某个css文件，就调用cssmin命令，其它的不执行
          // true 表示全量更新(只要修改了监听的文件，所有命令全部执行一遍)
          spawn: false,
        },
      },
    },






// ========

Gulp

视频地址：https://www.bilibili.com/video/BV18s411E7T5

视频名称：尚硅谷前端Gulp教程，自动化构建工具gulp


gulp的特点：

  任务化： 首先需要创建gulp任务
  基于流： 数据流io

    gulp内存：
      输入流：先读取文件
        后面所有的操作都是在gulp内存中进行
      输出流：所有操作玩成后，输出到本地


问题：
  视频讲解时间是 2017-12，当时的gulp版本是 3.9.1
  现在时间是 2021-3-31，现在的gulp版本是 4.0.2

  4.x版本的gulp语法变了，和3.9的不一样了
  于是我尝试安装 3.9版本的gulp，但是又有问题
  因为我现在的node版本是 12+，和3.9的gulp有冲突
  要不然就降级node，要不就升级gulp，用最新的命令


  我这边决定一边听老师讲解旧版本的gulp，一边尝试修改成最新的命令


相关插件：
  gulp-concat :   合并文件(js/css)
  gulp-uglify :   压缩js文件
  gulp-rename :   文件重命名
  gulp-less :   编译less
  gulp-clean-css :   压缩css
  gulp-livereload :   实时自动编译刷新



npm install --save-dev gulp-concat
npm install --save-dev gulp-uglify
npm install --save-dev gulp-rename
npm install --save-dev gulp-less
npm install --save-dev gulp-clean-css


// 注册合并压缩js任务
gulp.task('js', gulp.series(() => {
  // 配置任务的操作
  return gulp.src('src/**/*.js')       // 寻找源文件,将目标读取到gulp的内存中
    .pipe(concat('bundle.js'))         // 临时合并文件，指定文件名
    .pipe(uglify())        // 合并后，开始压缩，可以合并，也可以分开，视频老师是分开的(先输出，再压缩)
    .pipe(gulp.dest('./dist/js'))    // 合并完成，输出文件到本地
    // .pipe(uglify())                   // 这里直接压缩，不要文件名
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/js'));

    
    // 这里感觉没必要rename
    // 当然，它这里的目的是为了输出两个文件，一个合并后的文件，可供阅读，一个压缩后的.min 生产文件
    // 如果只需要一个的话，感觉可以省略rename(因为concat附带改名功能) 和 只需一次输出
}));



处理css和less文件的时候有个问题，3.x好像不会给css/less的打包文件新增一层目录
4.x打包后会自动新增一级目录

npm install --save-dev gulp-flatten
var flatten = require('gulp-flatten');

// 注册转换less任务
gulp.task('less', gulp.series(() => {
  // 配置任务的操作
  return gulp.src('src/**/*.less')
    .pipe(flatten())    // 在这里使用，就不会了
    .pipe(less())
    .pipe(gulp.dest('src/css'));
}));

// 注册合并压缩css文件
gulp.task('css', gulp.series(() => {
  // 配置任务的操作
  return gulp.src('src/**/*.css')
    .pipe(flatten())
    .pipe(concat('bundle.min.css'))
    .pipe(css())
    .pipe(gulp.dest('dist/css'));
}));


// ====
这里我我有个问题，这样分开处理css和less，
处理less的时候，不就把转换后的css文件添加到项目中了吗？按理来说是不应该新增文件的
或者可以gulp.src 引用两个不同路径？(less 打包到 dist，再从dist读取，和项目路径中的css合并)



// 3.x 视频中可以在 gulp.task中不写return
// 这样执行default的时候，就会同步执行(写了return 就是异步)
// 4.x好像不行，不写return，只会执行第一个，无法继续执行


// 3.x的异步的时候，可以设置先执行的任务(因为有必须依赖的，所以先执行)
// 注册合并压缩css文件
// 但是 4.x 不行了
gulp.task('css', ['less'], () => {
  // 配置任务的操作
  return gulp.src('src/**/*.css')
    .pipe(flatten())
    .pipe(concat('bundle.min.css'))
    .pipe(css())
    .pipe(gulp.dest('dist/css'));
});


// 问题： 4.x如何异步？

// 注册合并压缩css文件
// 在 gulp.series中传入需要依赖的任务名当作参数
gulp.task('css', gulp.series('less', () => {
  // 配置任务的操作
  return gulp.src('src/**/*.css')
    .pipe(flatten())
    .pipe(concat('bundle.min.css'))
    .pipe(css())
    .pipe(gulp.dest('dist/css'));
}));


// 问题：是否可以在一次任务中同时添加less和css(因为less要输出到本地，不想在项目中新建东西)



// ==== 
打包html
npm install --save-dev gulp-htmlmin

打包html有个需要注意的地方，因为打包后的文件是放在dist目录的，所以在写html前，那些引入的css,js文件一定要规划好
不能让打包后的文件出现问题



// ====

npm install --save-dev gulp-livereload


4.x的watch命令已经变了

gulp.task('watch', gulp.series('default', () => {
  livereload.listen();

  // 这种css，less会无限循环
  // gulp.watch('index.html', gulp.series('minify'));
  // gulp.watch('src/**/*.js', gulp.series('js'));
  // gulp.watch('src/**/*.css', gulp.series('css'));
  // gulp.watch('src/**/*.less', gulp.series('less', 'css'));

  
  gulp.watch('src/**/*.js').on('all',gulp.series('js'))
  gulp.watch('index.html').on('all',gulp.series('minify'))
  gulp.watch('src/**/*.css').on('all',gulp.series('css'))
  gulp.watch('src/**/*.less').on('all',gulp.series('less'))

}))

到目前为止，gulp还是半自动


// ====

npm install --save-dev gulp-connect

使用connect 进行全自动的配置


// 添加全自动任务

gulp.task('server', gulp.series('default', () => {
  // 配置服务器的选项
  connect.server({
    root: 'dist/',
    livereload: true,
    port: 5000
  });
  // 另外需要在任务最下面加上 .pipe(connect.reload())

  gulp.watch('src/**/*.js').on('all', gulp.series('js'));
  gulp.watch('index.html').on('all', gulp.series('minify'));
  gulp.watch('src/**/*.css').on('all', gulp.series('css'));
  gulp.watch('src/**/*.less').on('all', gulp.series('less'));
}))

使用open插件，自动打开浏览器



// 插件工具

npm install --save-dev gulp-load-plugins







// =====================

Webpack


视频地址：
https://www.bilibili.com/video/BV18s411E7nA


视频名称：
尚硅谷Webpack教程(新版webpack已上传，推荐观看)



webpack官方那张图

modules with dependencies
其中箭头的意思是依赖的意思
js依赖css jpg等等
css 依赖 sass jpg 


grunt, gulp叫做 项目构建工具
webpack也是项目构建工具
但是webpack多了一个概念： 模块打包器
在 webpack 里，认为所有的文件都是模块
webpack认为 html不算模块(这也是那张图没有html的原因)




loader：  
  webpack 只能理解 JavaScript 和 JSON 文件
  loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 模块


webpack3以后，内置支持 es6,commonjs,amd

webpack主模块的概念(打包只需要打包主模块)

__dirname 是nodejs 里面global全局对象5个属性的一个
用来表示根目录

// 配置完了webpack.config.js文件后，就可以直接使用webpack命令打包了，而不用写一长串


npm install css-loader style-loader --save-dev    // 针对cssloader
npm install file-loader url-loader --save-dev     // 针对图片loader

这里需要特别标注：webpack3不能安装最新版本的那些loader(2021-4-1)

css-loader  0.28.7
style-loader  0.19.0
file-loader 1.1.5
url-loader  0.6.2


// 虽然入口文件引入了 css文件，但是webpack默认是不支持的
// 所有需要使用loader进行转换

建议loader配置命令看 官网，复制


url-loader  是 file-loader的上层封装
要使用url 必须先安装 file

可以将 小于 配置大小kb的 图片 转换成字符串，打包到文件中
因为一个图片也是一次请求，这样可以少发请求


webpack --display-modules



// css-loader 是用来处理 css类型的文件，如果注释，将无法处理导入的css文件
// style-loader 用来把加载的css文件中的样式 ，处理添加到head标签中
{
  test: /\.css$/i,
  use: [
    "style-loader",
    "css-loader"
  ],
},


// 推荐装个FE助手

// 打包处理图片的时候
由于大于8k的图片，不会转成 base64，会进行压缩重命名的打包
这个时候会出现一点问题：
无法正确的加载图片的路径

因为 html 会在当前默认的文件夹下面找资源
所以2种解决方法：
1. 将 index.html 挪到图片文件的路径下
2. 使用 publicPath: 'js/',  // 手动设置路径
不过视频老师不推荐第二种，因为这会给 index.html 提供资源服务的时候带来强制性
这会影响到 webpack的热加载



// 自动编译打包
webpack-dev-server

npm i webpack-dev-server --save-dev

3.x的webpack 搭配 2.x 的webpack-dev-server
另外还需要安装  webpack-cli , 但是因为cli现在找不到和项目对应的版本，所以webpack跑不起来



// plugin 插件

npm install html-webpack-plugin clean-webpack-plugin --save-dev




// ==============

Webpack5

视频地址：
https://www.bilibili.com/video/BV1e7411j7T5

视频名称：
尚硅谷最新版Webpack5实战教程(从入门到精通)












快速搭建服务器的方法
express
json-server
nodemon
serve