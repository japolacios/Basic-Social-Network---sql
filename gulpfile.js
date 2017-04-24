'use strict'
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');
gulp.task('default', ['sass:watch']);
gulp.task('sass', function () {
    return gulp.src('./public/static/sass/main.scss').pipe(sass().on('error', sass.logError)).pipe(autoprefixer()).pipe(cleanCSS()).pipe(gulp.dest('./public/static/css/'));
});
gulp.task('sass:watch', function () {
    gulp.watch('./public/static/sass/*.scss', ['sass']);
});