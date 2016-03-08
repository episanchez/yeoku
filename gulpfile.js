var gulp = require('gulp');
var jsdoc = require('gulp-jsdoc3');
 
gulp.task('doc', function (cb) {
    var config = require('./conf.json');
    gulp.src(['README.md', './lib/**/*.js'], {read: false})
        .pipe(jsdoc(config, cb));
});