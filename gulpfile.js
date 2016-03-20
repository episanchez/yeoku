var gulp = require('gulp');
var jsdoc = require('gulp-jsdoc3');
var mocha = require('gulp-mocha');
var logger = require('winston');

gulp.task('doc', function (cb) {
    var config = require('./conf.json');
    gulp.src(['README.md','./lib/**/*.js'], {read: false})
        .pipe(jsdoc(config, cb));
});

gulp.task('mocha', () => {
    require('app-module-path').addPath(__dirname + '/lib');
    return gulp.src('test/*.js')
        .pipe(mocha())
        .once('error', (error) => {
            logger.error(error);
            process.exit(1);
        })
        .once('end', () => {
            process.exit();
        });
});
// The default task (called when you run `gulp` from cli)
gulp.task('default', ['doc']);
