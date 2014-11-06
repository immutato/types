/*
 * immutato
 * https://github.com/parroit/immutato
 *
 * Copyright (c) 2014 Andrea Parodi
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp');
var loadPlugins = require('gulp-load-plugins');
var $ = loadPlugins({
    lazy: true
});

gulp.task('test', function () {
  return gulp.src('./test/*.js')
    .pipe($.mocha({grep:'@perf', invert: true}));
});

gulp.task('perf', function () {
  return gulp.src('./test/*.js')
    .pipe($.mocha({grep: '@perf'}));
});

gulp.task('only', function () {
  return gulp.src('./test/*.js')
    .pipe($.mocha({grep: '@only'}));
});

gulp.task('watch', function () {
  gulp.watch(['./lib/**/*.js', './test/**/*.js'], ['test']);
});

gulp.task('default', ['test', 'watch']);


gulp.task('test-phantom',function () {
    return gulp.src(['./dist/test.html'])
        .pipe($.mochaPhantomjs());
});


gulp.task('build', function() {
    
    return gulp.src('./lib/immutato.js')
        .pipe($.pureCjs({
            exports: 'immutato',
            output: 'immutato.js'
        }).on('error',console.log.bind(console)))
        
        .pipe(gulp.dest('dist'));
});


gulp.task('deploy', function() {
    
    return gulp.src('./lib/immutato.js')
        .pipe($.pureCjs({
            exports: 'immutato',
            output: 'immutato.min.js'
        }).on('error',console.log.bind(console)))
        .pipe($.streamify($.uglify()))
        .pipe(gulp.dest('dist'));
});




gulp.task('build-test', function() {
    
    return gulp.src('./test/all_test.js')
        .pipe($.pureCjs({
            output: 'immutato-test.js'
        }))
       // .pipe($.streamify($.uglify()))
        .pipe(gulp.dest('dist'));
});