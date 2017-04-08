var gulp = require('gulp');
var args = require('yargs').argv;
var del = require('del');
var $ = require('gulp-load-plugins')({
    lazy: true
});

require('./gulp/inject');
require('./gulp/build');
require('./gulp/serve');

