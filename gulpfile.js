'use strict';

const gulp = require('gulp');
const Server = require('karma').Server;
const $ = require('gulp-load-plugins')();

gulp.task('lint', () =>
  gulp.src(['**/*.js', '!node_modules/**'])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError())
);

gulp.task('test', (done) => {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('scripts', () =>
  gulp.src([
    'js/*.js'
  ])
    .pipe($.babel())
    .pipe($.concat('main.min.js'))
    .pipe($.uglify({ preserveComments: 'some' }))
    .pipe(gulp.dest('dist'))
);

gulp.task('default', ['lint', 'test', 'scripts']);
