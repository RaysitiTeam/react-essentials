/*Configuration file for gulpfile.js*/
/*
* Called by: gulpfile.js
*/

var $ = require('gulp-load-plugins')({
    lazy: true
});
var del = require('del');


module.exports = function () {
    var client = './src/';
    var clientApp = client + 'app/';
    var temp = './.tmp/';
    var lessFolder = './less/';
    var releaseFolder = 'release';
    var dest = './';
    // Reusable functions
    // Reusable Functions
    //log function
    function log(msg) {
        if (typeof (msg) === 'object') {
            // To hide jshint we can use the comment feature below and comment the work code.
            /*jshint -W117*/
            for (var item in msg) {
                if (msg.hasOwnProperty(item)) {
                    $.util.log($.util.colors.blue(msg[item]));
                }
            } //end:foreach
        } else {
            $.util.log($.util.colors.blue(msg));
        }
    } //end:log
    
    //clean function
    function clean(path) {
        log('Cleaning: ' + $.util.colors.blue(path));
        del(path);
    } //end:clean
    
    //errorLogger function
    function errorLogger(error) {
        log('***Start of Error***');
        log(error);
        log('***End of Error***');
        this.emit('end'); // This will end the pipe and give some info
    } //end:errorLogger
    //end:Reusable functions
    
    
    var config = {
        //Associating functions with properties
        log:log,
        clean:clean,
        errorLogger:errorLogger,
        //All the JS that is used for validation -gulp.vet
        src: client,
        clientApp: clientApp,
        fontsFolder: client + 'assets/fonts',
        imagesFolder: client + 'assets/images',
        temp: temp,
        dest:dest,
        main: '',
        release: releaseFolder,
        jsonFolder: client + 'app/data',
        // Inject the Custom CSS dynamically path
        css: [
        temp + 'main.css',
        temp + '**/*.css'
        ],
        less: [        
        lessFolder + 'main.less',        
        lessFolder + 'pages/index.less',
        ],
        alljs: [
            clientApp+'main.js',
            clientApp+'**/*.js'
        ],
        htmlFiles: '*.html',
        js: clientApp + 'main.js',               
        client: client,
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            // ignorePath:'../..'
        }      
    }; //end:config object
    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    }; //end:getWiredepDefaultOptions
    return config;
}; //end:module.exports
