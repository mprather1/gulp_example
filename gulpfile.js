var gulp = require('gulp');
 gutil = require("gulp-util")
 jshint = require('gulp-jshint');
 sass = require('gulp-sass');
 sourcemaps = require("gulp-sourcemaps");
 concat = require("gulp-concat")
 source = require("vinyl-source-stream");
 browserify = require("browserify");
 
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
     .pipe(concat('temp.js'))
     .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
   .pipe(sourcemaps.write())
   .pipe(gulp.dest('public/assets/bin/'));
 });
 
 gulp.task('brwsrfy', function(){
  browserify('./public/assets/bin/temp.js')
    .bundle()
    .on('error', function(e){
      gutil.log(e)
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./public/assets/javascript'))
});
 
 gulp.task('watch', function(){
  gulp.watch('source/javascript/**/*.js', ['jshint', 'build-js']);
  gulp.watch('source/scss/**/*.scss', ['build-css']);
  gulp.watch('public/assets/bin/temp.js', ['brwsrfy'])
 });