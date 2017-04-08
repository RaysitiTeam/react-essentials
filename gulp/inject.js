'use strict';
var config = require('../gulp.config')(); // without the ./ it will look for a PACKAGE named,() to run function
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var browserify = require('browserify');
var vsource = require("vinyl-source-stream");
var babel = require('babelify');
var browserSync  = require('browser-sync');
var concat       = require('gulp-concat');
var path = require('path');
var args = require('yargs').argv;
var del = require('del');
var $ = require('gulp-load-plugins')({
    lazy: true
});

gulp.task('vet', function() {
    /*jshint*/
    config.log('Analyzing source with JSHint and JSCS');
    return gulp
        .src(config.js)
        .pipe($.if(args.verbose, $.print())) // using gulp-print to show the list of files that were touched.
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe($.jshint.reporter('fail')); // Fail the CI build, if the jshint fails.
}); //end:vet

//Clean the main File
gulp.task('clean-styles', function() {
    var files = config.temp + '**/*.css';
    // del(files);
    config.clean(files);
}); //end:clean-styles


//Injecting Bower dependencies
gulp.task('wiredep', function() {
    var options = config.getWiredepDefaultOptions(); //TODO: configure getWiredepDefaultOptions
    var wiredep = require('wiredep').stream; // that is going to get the stream
    return gulp
        .src(config.htmlFiles)
        .pipe(wiredep(options)) // this will look into bower.json        
        .pipe(gulp.dest(config.dest));
}); //end:wiredep

//styles - to compile and autoprefix the LESS files
gulp.task('styles', ['clean-styles', 'wiredep'], function() {
    config.log('Compiling LESS to CSS');
    return gulp
        .src(config.less) // TODO: add the property to gulp.config.js
        .pipe($.less())
        .on('error', config.errorLogger) //On error - defer to errorLogger function
        .pipe($.autoprefixer({
            browsers: ['last 2 version', '>5%']
        })) // autoprefixer - browsers in the market
        // .pipe($.plumber()) // This is another type of error handling
        .pipe(gulp.dest(config.temp)); //TODO :add the property to gulp.config.js
}); //end:styles



gulp.task('less-watcher', function() {
    gulp.watch([config.less], ['styles']); // 2 param arrays - source array and task array
}); //end:less-watcher


// Lint JS/JSX files
gulp.task('eslint', function() {
    config.log('Validating React Source files');
    return gulp.src(config.js)
        .pipe($.eslint({
            baseConfig: {
                "parserOptions": {
                "ecmaFeatures": {
                    "jsx": true,
                    "modules": true
                    }
                }
            }
        }))
        .pipe($.eslint.format())
        .pipe($.eslint.failAfterError());
});//end:eslint


// [path.join(config.imagesFolder, '/*'), path.join(config.imagesFolder, '/**/*')]
// Babel Transpiler
gulp.task('compile',['eslint'],function(){
    config.log('Compiling React to JS');
  browserify({ debug: true })
    .transform(babel, {presets:["es2015", "react", "stage-0"]})
    .require(config.js, { entry: true })
    .bundle()
    .pipe(vsource('app.min.js'))
    .pipe(gulp.dest('./assets/components'));
});//end:compile

