/* 
  gulp是基于任务来实现自动化
  对于gulp来说,每件事情都是一个任务
*/
const { src, dest, task, series, watch, parallel } = require('gulp')
const uglify = require('gulp-uglify-es').default
const rename = require('gulp-rename')
const less = require('gulp-less')
const minifycss = require('gulp-minify-css')
const imgmin = require('gulp-imagemin')
const cache = require('gulp-cache')
const minifyHtml = require('gulp-minify-html')
const extender = require('gulp-html-extend')
const del = require('del')
const connect = require('gulp-connect')

// 用来定义gulp任务
// 参数1：任务名字
// 参数2： 函数

// 简单拷贝, 处理 lib文件夹， lib文件不需要做任何的处理，只需要拷贝到dist目录
// 任务需要加一个return， 表示任务完成
task('lib', function () {
  // 读取文件
  // src() 读取文件
  // pipe() 管道
  // dest() 放到哪儿
  return (
    src('./src/lib/**/*.*')
      .pipe(dest('./dist/lib'))
      // 让服务器重新加载
      .pipe(connect.reload())
  )
})

// 处理js
task('js', function () {
  return (
    src('./src/js/*.js')
      .pipe(dest('./dist/js'))
      // 对js代码进行丑化
      .pipe(uglify())
      .pipe(
        rename({
          // prefix: 'aa-',
          suffix: '.min'
        })
      )
      .pipe(dest('./dist/js'))
      .pipe(connect.reload())
  )
})

// 处理less
task('less', function () {
  return (
    src('./src/less/*.less')
      .pipe(less())
      .pipe(dest('./dist/css'))
      // 压缩css
      .pipe(minifycss())
      .pipe(
        rename({
          suffix: '.min'
        })
      )
      .pipe(dest('./dist/css'))
      .pipe(connect.reload())
  )
})

// 处理图片
task('img', function () {
  return (
    src('./src/img/*.*')
      // 对压缩过的图片进行缓存
      .pipe(cache(imgmin()))
      .pipe(dest('./dist/img'))
      .pipe(connect.reload())
  )
})

// 处理html
task('html', function () {
  return src('./src/*.html')
    .pipe(extender())
    .pipe(minifyHtml())
    .pipe(dest('./dist'))
    .pipe(connect.reload())
})

// 清除dist
task('clean', function () {
  return del('./dist')
})

// 实现一个，修改代码，会自动执行任务
// 监听的任务，，，，，，做一件事件，当我们修改了对应的文件，需要执行对应的任务
// gulp.watch() 监视文件
task('watch', function () {
  // 参数1：监视的文件
  // 参数2： 对应的任务, 多个任务
  watch('./src/**/*.html', series('html'))
  watch('./src/less/*.less', series('less'))
  watch('./src/js/*.js', series('js'))
  watch('./src/lib/**/*.*', series('lib'))
  watch('./src/img/*.*', series('img'))
})

// 定义任务，自动刷新， 当文件发生变化的时候
// 自动启动一个服务器
task('connect', function () {
  return connect.server({
    // 服务器的根目录
    root: './dist',
    livereload: true,
    port: 9999
  })
})

// series可以组合多个任务
task(
  'default',
  series(
    'clean',
    'html',
    'less',
    'js',
    'img',
    'lib',
    // 可以并行执行任务，会多个任务组合更大的任务
    parallel('watch', 'connect')
  )
)
