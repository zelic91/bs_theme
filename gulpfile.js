var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var cleanCSS = require('gulp-clean-css');
var es = require('event-stream');

var config = {
  bootstrapDir: './bower_components/bootstrap-sass',
  sourceDir: './css/**/*',
  publicDir: './public',
  fontDir: './fonts/**/*'
};

gulp.task('css', function() {
  return gulp.src('./css/app.scss')
         .pipe(sass({
           includePaths: [config.bootstrapDir + '/assets/stylesheets']
         }))
         .on('error', gutil.log)
         .pipe(gulp.dest(config.publicDir + '/css'));
});

gulp.task('prod-css', function() {
  return gulp.src('./css/app.scss')
         .pipe(sass({
           includePaths: [config.bootstrapDir + '/assets/stylesheets']
         }))
         .on('error', gutil.log)
         .pipe(cleanCSS({compatibility: 'ie8'}))
         .pipe(gulp.dest(config.publicDir + '/css'))
});

gulp.task('fonts', function() {
  return es.merge(gulp.src(config.bootstrapDir + '/assets/fonts/**/*'), gulp.src(config.fontDir))
         .pipe(gulp.dest(config.publicDir + '/fonts'));
});

gulp.task('watch', function() {
  gulp.watch([config.sourceDir, config.fontDir], ['prod-css', 'fonts']);
});

gulp.task('default', ['css', 'fonts']);
gulp.task('prod', ['prod-css', 'fonts']);
