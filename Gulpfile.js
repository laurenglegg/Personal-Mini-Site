'use strict';

const gulp = require('gulp');
const watch = require('gulp-watch');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const notify = require('gulp-notify');
const less = require('gulp-less');
const prefix = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

const paths = {
    less_root: __dirname + '/assets/less',
    less_entry: __dirname + '/assets/less/style.less',
    less_dest: __dirname + '/dist/css',
    js_root: __dirname + '/assets/js',
    js_entry: __dirname + '/assets/js/**/*.js',
    js_dest: __dirname + '/dist/js'
};

gulp.task('build:less', () => {
    return gulp.src(paths.less_entry)
    .pipe(plumber({errorHandler: notify.onError("Could not be built: <%= error.message %>")}))
    .pipe(less({
        paths: [paths.less_root]
    }))
    .pipe(prefix('last 3 versions', '> 1%', 'ie 8', 'ie 7'), { cascade: true })
    .pipe(gulp.dest(paths.less_dest));
});

gulp.task('watch:less', () => {
    gulp.watch(paths.less_root + '/**/*.less', ['build:less']);
});

gulp.task('build:js', () => {
  return gulp.src(paths.js_entry)
  .pipe(concat('script.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest(paths.js_dest));
});

gulp.task('watch', () => {
  gulp.watch(paths.less_root + '/**/*.less', ['build:less']);
//   gulp.watch(paths.js_root + '/**/*.js', ['build:js']);
//   gulp.watch(paths.js_common_root + '/**/*.js', ['build:js']);
});