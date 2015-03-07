var gulp        = require('gulp')
  , stylus      = require('gulp-stylus')
  , jeet        = require('jeet')
  , rupture     = require('rupture')
  , browserSync = require('browser-sync')
  , minifyHtml  = require('gulp-minify-html')
  , prefixer    = require('gulp-autoprefixer')
  , uglify      = require('gulp-uglify')
  , concat      = require('gulp-concat')
  ;

gulp.task('stylus', function() {
  gulp.src('src/frontend/content/stylus/style.styl')
  .pipe(stylus({
    use: [jeet(), rupture()],
    compress: true
  }))
  .pipe(prefixer('last 5 version'))
  .pipe(gulp.dest('build/frontend/content/css/'))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('minifyHtml', function(){
  var opts = {
    spare: true,
    quotes: true
  };

  return gulp.src('src/frontend/*.html')
    .pipe(minifyHtml(opts))
    .pipe(gulp.dest('build/frontend'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('images', function(){

  return gulp.src('src/frontend/content/img/**/*')
    .pipe(gulp.dest('build/frontend/content/img/'));

});

// gulp.task('js', function(){

//   gulp.src(['src/frontend/js/vendor/*', 'src/frontend/js/controller/*', '!src/js/vendor/jquery.min.js'])
//     .pipe(concat('main.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('build/frontend/js'))
//     .pipe(browserSync.reload({stream: true}));

//   gulp.src('src/frontend/js/vendor/jquery.min.js')
//     .pipe(gulp.dest('build/frontend/js'));

// });

gulp.task('browserSync', function(){
  browserSync.init(['/build/frontend/content/css/style.css', '/build/frontend/index.html'], {
    server: {
      baseDir: './build/frontend/'
    },
    open: false
  });

  gulp.watch('src/frontend/content/stylus/**/*.styl', ['stylus']);
  gulp.watch('src/frontend/js/**/*.js', ['js']);
  gulp.watch('src/frontend/content/img/**', ['images']);
  gulp.watch('src/frontend/*.html', ['minifyHtml']);
});

// gulp.task('default', ['stylus', 'minifyHtml', 'images', 'browserSync', 'js']);
gulp.task('default', ['stylus', 'minifyHtml', 'images', 'browserSync']);