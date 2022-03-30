var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
/* 
// 这是3.9.1版本的命令
// 注册任务
gulp.task('任务名', function () {
  // 配置任务的操作
});

// 注册默认任务
gulp.task('default', []); 

*/

// 这是4.x版本的命令
// 注册任务
// gulp.task('test', gulp.series(function () {
//   // 配置任务的操作
// }));

// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
// var rename = require('gulp-rename');
// var less = require('gulp-less');
// var css = require('gulp-clean-css');
// var flatten = require('gulp-flatten');
// var htmlmin = require('gulp-htmlmin');
// var livereload = require('gulp-livereload');
// var connect = require('gulp-connect');
var open = require('open');

// 注册合并压缩js任务
gulp.task('js', gulp.series(() => {
  // 配置任务的操作
  return gulp.src('src/**/*.js')       // 寻找源文件,将目标读取到gulp的内存中
    .pipe($.concat('bundle.js'))         // 临时合并文件，指定文件名
    // .pipe(uglify())        // 合并后，开始压缩，可以合并，也可以分开，视频老师是分开的(先输出，再压缩)
    .pipe(gulp.dest('./dist/js'))    // 合并完成，输出文件到本地
    // .pipe(uglify())                   // 这里直接压缩，不要文件名
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/js'))
    .pipe($.livereload())
    .pipe($.connect.reload());

  // 这里感觉没必要rename
  // 当然，它这里的目的是为了输出两个文件，一个合并后的文件，可供阅读，一个压缩后的.min 生产文件
  // 如果只需要一个的话，感觉可以省略rename(因为concat附带改名功能) 和 只需一次输出
}));


// 注册转换less任务
gulp.task('less', gulp.series(() => {
  // 配置任务的操作
  return gulp.src('src/**/*.less')
    .pipe($.flatten())
    .pipe($.less())
    .pipe(gulp.dest('src/css'))
    .pipe($.livereload())
    .pipe($.connect.reload());
}));


// 注册合并压缩css文件
gulp.task('css', gulp.series('less', () => {
  // 配置任务的操作
  return gulp.src('src/**/*.css')
    .pipe($.flatten())
    .pipe($.concat('bundle.min.css'))
    .pipe($.cleanCss())
    .pipe(gulp.dest('dist/css'))
    .pipe($.livereload())
    .pipe($.connect.reload());
}));

// 测试一起注册合并压缩css和less文件
// 没成功
gulp.task('cssall', gulp.series(() => {
  // 配置任务的操作
  // return gulp.src('src/**/*.less')
  //   .pipe(flatten())
  //   .pipe(less())
  //   .src('src/**/*.css')
  //   .pipe(concat('bundle.min.css'))
  //   .pipe(gulp.dest('dist/css'));


  // gulp.src('src/**/*.less')
  //   .pipe(flatten())
  //   .pipe(less());

  return gulp.src('src/**/*.css', 'src/**/*.less')
    .pipe($.less())
    .pipe($.flatten())
    .pipe($.concat('bundle.min.css'))
    .pipe(gulp.dest('dist/css'));
}));

gulp.task('minify', gulp.series(() => {
  return gulp.src('index.html')
    .pipe($.htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'))
    .pipe($.livereload())
    .pipe($.connect.reload());
}));



// 注册默认任务
gulp.task('default', gulp.series('css', 'js', 'less', 'minify'));
// gulp.task('default', gulp.series('js', 'cssall'));



// 添加watch任务
gulp.task('watch', gulp.series('default', () => {
  livereload.listen();

  // gulp.watch('index.html', gulp.series('minify'));
  // gulp.watch('src/**/*.js', gulp.series('js'));
  // gulp.watch('src/**/*.css', gulp.series('css'));
  // gulp.watch('src/**/*.less', gulp.series('less', 'css'));


  gulp.watch('src/**/*.js').on('all', gulp.series('js'));
  gulp.watch('index.html').on('all', gulp.series('minify'));
  gulp.watch('src/**/*.css').on('all', gulp.series('css'));
  gulp.watch('src/**/*.less').on('all', gulp.series('less'));

}))


// 添加全自动任务

gulp.task('server', gulp.series('default', () => {
  // 配置服务器的选项
  $.connect.server({
    root: 'dist/',
    livereload: true,
    port: 5000
  });

  // open插件可以自动打开网址  
  // open('http://localhost:5000');

  gulp.watch('src/**/*.js').on('all', gulp.series('js'));
  gulp.watch('index.html').on('all', gulp.series('minify'));
  gulp.watch('src/**/*.css').on('all', gulp.series('css'));
  gulp.watch('src/**/*.less').on('all', gulp.series('less'));
}))