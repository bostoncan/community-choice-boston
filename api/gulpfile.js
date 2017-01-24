'use strict';

const gulp = require('gulp'),
      shell = require('gulp-shell'),
      spawn = require('child_process').spawn,
      del = require('del'),
      zip = require('gulp-zip'),
      mocha = require('gulp-mocha'),
      istanbul = require('gulp-istanbul');

/*
 * Build/archive for deployment to Lambda
 */

gulp.task('archive', ['build'], () => {
    gulp.src(['./src/**/*.js', './src/**/*.json'])
        .pipe(zip('build.zip'))
        .pipe(gulp.dest('./build'));
});

gulp.task('build', ['clean'], shell.task(
    ['npm install'],
    {cwd: './src'}
));

gulp.task('clean', () => {
    del(['./src/node_modules', './build']);
});

/*
 * Unit tests
 */

gulp.task('pre-test', () => {
    gulp.src(['./src/**/*.js', '!./src/node_modules/**/*'])
        .pipe(istanbul({includeUntested: true}))
        .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], () => {
    process.env.NODE_ENV = 'test';
    gulp.src(['./test/*.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports({reporters: ['lcov']}));
});

/*
 * Development server
 */

let node;
gulp.task('run', () => {
    if (node) node.kill();
    node = spawn('node', ['./src/express.js'], {stdio: 'inherit'});
    node.on('close', (code) => {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
});

gulp.task('serve', ['build'], () => {
    gulp.run('run');
    gulp.watch(['./src/**/*.js'], () => gulp.run('run'));
});

