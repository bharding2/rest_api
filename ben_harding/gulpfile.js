const gulp = require('gulp');
const webpack = require('webpack-stream');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
// const exec = require('child_process').exec;
const angularProtractor = require('gulp-angular-protractor');

process.env.BUILD_PORT = 5025;
const buildServer = require(__dirname + '/build_server');

var apiFiles = ['./*.js', './lib/*.js', './models/*.js', './routes/*.js'];
var specFiles = ['./test/**/*spec.js'];
var testFiles = ['./test/**/*test.js'];
var appFiles = ['./app/**/*.js'];

gulp.task('webpack:dev', ['html:dev', 'css:dev'], () => {
  return gulp.src('app/js/entry.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./build'))
    .on('end', () => {
      buildServer.close(() => {
        console.log('build server close');
      });
    });
});

gulp.task('html:dev', () => {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('./build'));
});

gulp.task('css:dev', () => {
  return gulp.src('app/**/*.css')
    .pipe(gulp.dest('./build'));
});

gulp.task('test:mocha', () => {
  return gulp.src('./test/**/*test.js')
    .pipe(mocha());
});

gulp.task('test:protractor', ['build:dev'], () => {
  return gulp.src(['./test/integration/*spec.js'])
    .pipe(angularProtractor({
      'configFile': './test/integration/config.js',
      'debug': true,
      'autoStartStopServer': true
    }));
});

gulp.task('lint:api', () => {
  return gulp.src(apiFiles)
    .pipe(eslint('./.eslintrc.json'))
    .pipe(eslint.format());
});

gulp.task('lint:test', () => {
  return gulp.src(testFiles)
    .pipe(eslint('./.eslintrc.json'))
    .pipe(eslint.format());
});

gulp.task('lint:app', () => {
  return gulp.src(appFiles)
    .pipe(eslint('./app/.eslintrc.json'))
    .pipe(eslint.format());
});

gulp.task('lint:spec', () => {
  return gulp.src(specFiles)
  .pipe(eslint('./test/integration/.eslintrc.json'))
  .pipe(eslint.format());
});

gulp.task('build:dev', ['webpack:dev']);
gulp.task('test', ['test:mocha', 'test:protractor']);
gulp.task('lint', ['lint:api', 'lint:test', 'lint:app', 'lint:spec']);

gulp.task('default', ['lint', 'test']);
