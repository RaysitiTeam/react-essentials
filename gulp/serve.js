'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('../gulp.config')(); // without the ./ it will look for a PACKAGE named,() to run function

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

var proxyMiddleware = require('http-proxy-middleware');


gulp.task('serve', ['watch'], function() {
    browserSync.init({
        server: '.',
        startPath: '.',
    });
});

gulp.task('serve:release', ['watch', 'release'], function() {
    browserSync.init({
        server: '.',
        startPath: '/release/',
    });
});

gulp.task('watch',['injectAll'], function() {
    // gulp.watch([conf.lessFolder], ['inject:styles']); // 2 param arrays - source array and task array
    // gulp.watch([conf.alljs], ['inject:react']); // 2 param arrays - source array and task array    
    gulp.watch(path.join(conf.temp, '*.css'), function(event) {
        browserSync.reload(event.path);
    });
    gulp.watch(path.join('*.html'), function(event) {
        browserSync.reload(event.path);
    });
}); //end:less-watcher
