module.exports = function (grunt) {

  // 1. 初始化配置grunt任务
  grunt.initConfig({
    // concat: 任务吗
    concat: {
      // options 选项
      options: {
        // separator 分隔符,合并文件使用的连接符
        separator: ';',
      },
      dist: {
        src: ['src/js/*.js'],
        dest: 'dist/build.js',
      },
    },
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      my_target: {
        files: {
          'dist/build.min.js': ['dist/build.js']
        }
      }
    },
    jshint: {
      // 这个是2017年的配置
      // options: {
      //   jshintrc: '.jshintrc' // 指定配置文件
      // },
      // build: ['Gruntfile.js', 'src/**/*.js']

      // all 是目前 2021-3-31的最新配置
      all: ['Gruntfile.js', 'src/**/*.js']
    },
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/css/output.css': ['src/**/*.css']
        }
      }
    },
    watch: {
      scripts: {
        // 源文件
        files: ['**/*.js', '**/*.css'],
        // 当监视的源文件发生变化时,会自动执行这些命令
        tasks: ['jshint', 'concat', 'uglify', 'cssmin'],
        options: {
          // spawn 英文有 大量生产的意思
          // 在这里表示变量更新(哪种类型的文件修改了,就调用对应文件的执行命令)
          // 比如只修改了某个css文件，就调用cssmin命令，其它的不执行
          // true 表示全量更新(只要修改了监听的文件，所有命令全部执行一遍)
          spawn: false,
        },
      },
    },
  });

  // 2. grunt任务执行的时候去加载对应的任务插件
  // 多个任务时,不能使用数组,需要多个 loadNpmTasks
  // grunt.loadNpmTasks(['grunt-contrib-concat', 'grunt-contrib-uglify']);
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // 3. 注册grunt的默认任务 grunt任务是同步的
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin']);
  grunt.registerTask('mywatch', ['default', 'watch']);

};