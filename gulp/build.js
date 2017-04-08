'use strict';
var config = require('../gulp.config')(); // without the ./ it will look for a PACKAGE named,() to run function
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var path = require('path');
var args = require('yargs').argv;
var $ = require('gulp-load-plugins')({
    lazy: true
});

gulp.task('inject:styles', ['styles'], function() {
    config.log('Injecting CSS files into html');
    return gulp
        .src(config.htmlFiles)
        .pipe($.inject(gulp.src(config.css))) //this will use gulp-inject and inject files
        .pipe(gulp.dest(config.dest));
}); //end:inject

//Inject All React Source Files
gulp.task('inject:react', ['compile'],function(){
    config.log('Injecting JS Files into HTML');
return gulp
    .src(config.htmlFiles)
    .pipe($.inject(gulp.src('./assets/components/*.js'))) //this will use gulp-inject and inject files
    .pipe(gulp.dest(config.dest));
});//end:inject:react

//Inject Both React and LESS files
gulp.task('injectAll',['inject:styles','inject:react']);