var gulp = require('gulp');
  gutil = require("gulp-util")
  jshint = require('gulp-jshint');
  sass = require('gulp-sass');
  sourcemaps = require("gulp-sourcemaps");
  concat = require("gulp-concat")
  
  gulp.task('default', ['watch']);
  
  gulp.task('jshint', function(){
   return gulp.src('source/javascript/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
  });
  
  gulp.task('build-css', function(){
   return gulp.src('source/scss/**/*.scss')
    .pipe(sourcemaps.init())
      .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets/stylesheets'));
  });
  
  gulp.task('build-js', function(){
   return gulp.src('source/javascript/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(concat('bundle.js'))
      .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets/javascript'));
  });
  
  gulp.task('watch', function(){
   gulp.watch('source/javascript/**/*.js', ['jshint', 'build-js']);
   gulp.watch('source/scss/**/*.scss', ['build-css']);
  });