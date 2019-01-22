var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var browserify  = require('browserify');
var reload       = browserSync.reload;
var sass         = require('gulp-sass');
var size         = require('gulp-size'); //shows the size of the entire project or files
var autoprefixer = require('gulp-autoprefixer');
var imagemin     = require('gulp-imagemin');
var pngquant     = require('imagemin-pngquant');
var pug          = require('gulp-pug');
var base64       = require('gulp-base64');
var concat       = require('gulp-concat');
var argv         = require('yargs').argv;
var uglify       = require('gulp-uglify');
var sourcemaps   = require('gulp-sourcemaps');

//gulp stuff (no watch breaking on errors)
var plumber      = require('gulp-plumber');

gulp.task('browser-sync', function() {
  browserSync({
    open: !!argv.open,
    notify: !!argv.notify,
    server: {
      baseDir: "./build"
    }
  });
});
//vendor
gulp.task('vendor', function() {
  gulp.src([
    'bower_components/fancybox/dist/jquery.fancybox.min.css',
    'bower_components/wow/css/libs/animate.css',
    ])
    .pipe(plumber())
    .pipe(gulp.dest('./vendor/css'))
    .pipe(gulp.dest('./build/vendor/css'));
});

gulp.task('vendor', function() {
  gulp.src([
    'bower_components/wow/dist/wow.min.js',
    'bower_components/fancybox/dist/jquery.fancybox.js'])
    .pipe(plumber())
    .pipe(concat('vendor.js'))
    .pipe(size())
    .pipe(gulp.dest('./vendor/js'))
    .pipe(gulp.dest('./build/vendor/js'));
});

// css
gulp.task('css', function() {
  gulp.src([
    'src/css/main.scss'
    ])
    .pipe(sourcemaps.init())
    .pipe(plumber())
    //.pipe(sass({outputStyle: ''})
    .pipe(sass({outputStyle: 'expanded'})
      .on('>>> SASS COMPILING ERROR: ', sass.logError))
    .pipe(base64({
      //baseDir: 'public',
      //extensions: ['svg', 'png', 'svg', /\.jpg#datauri$/i],
      //exclude:    [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
      //maxImageSize: 8*1024, // bytes
      //debug: true
    }))
    .pipe(autoprefixer({
      browsers: ['> 0%'],
      cascade: false
    }))
    .pipe(size())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('build/css'));
});

// js
gulp.task('main_js', function() {
  gulp.src([
    'bower_components/jQuery/dist/jquery.min.js',
    'bower_components/webfontloader/webfontloader.js',
    'bower_components/paroller/dist/jquery.paroller.js',
    'src/js/main.js'])
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(size())
    .pipe(gulp.dest('build/js'));
});

// pug
gulp.task('pug', function(){
  gulp.src(['src/templates/**.pug'])
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('build/'));
});

// images
gulp.task('compress_img', function() {
  gulp.src('src/img/**')
    .pipe(imagemin({
        progressive: true,
        optimizationLevel: 1,
        svgoPlugins: [
          {removeViewBox: false},
          {removeDoctype: true},
          {removeComments: true},
          {cleanupNumericValues:
            {floatPrecision: 2}
          },
          {convertColors: {
              names2hex: false,
              rgb2hex: false
            }
          }],
        use: [pngquant()]
      }
    ))
    .pipe(gulp.dest('build/img'))
});

gulp.task('dev:watch', function () {
  gulp.watch('src/templates/**', ['pug']),
  gulp.watch('src/css/**', ['css']),
  gulp.watch('src/js/main.js', ['main_js']),
  gulp.watch('src/img/**',['compress_img']);
});

gulp.task('serve', ['css', 'main_js', 'compress_img', 'pug', 'browser-sync'], function () {
  gulp.watch('src/templates/**', ['pug']),
  gulp.watch('src/css/**', ['css']),
  gulp.watch('src/js/main.js', ['main_js']),
  gulp.watch('src/img/**',['compress_img']);
});

gulp.task('compile', ['vendor', 'css', 'main_js', 'compress_img', 'pug']);

