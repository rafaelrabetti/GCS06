var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create(),
    del = require('del'),
    gulpcssnano = require('gulp-cssnano'),
    gulpuseref = require('gulp-useref'),
    runsequence = require('run-sequence'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify-css');

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  });
});

gulp.task('watch', ['browserSync', 'views', 'sass'], function () {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', ['views']);
  gulp.watch('app/scss/**/*.scss', browserSync.reload);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('sass', function () {
  return gulp.src("app/scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('views', function(){
  return gulp.src('app/*.html')
    .pipe(gulp.dest('dist/'));
});

gulp.task('useref', function () {
  return gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', concat('main.min.js')))
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', minify()))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy', function () {
  gulp.src('app/fonts')
  .pipe(gulp.dest('dist/fonts'));
  gulp.src('app/images')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('clean', function () {
  return gulp.src(['dist/css', 'dist/js', 'dist/images', 'dist/fonts',], { read: false })
    .pipe(clean());
});

gulp.task('build', function(){
  runsequence('clean',['copy','sass','useref']);
});

gulp.task('default', function (callback) {
  runsequence(['sass', 'browserSync', 'watch']);
});