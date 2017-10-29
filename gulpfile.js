var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');

var config = {
  bootstrapDir: './bower_components/bootstrap-sass',
  sourceDir: './css/**/*',
  publicDir: './public'
};

gulp.task('css', function() {
  return gulp.src('./css/app.scss')
         .pipe(sass({
           includePaths: [config.bootstrapDir + '/assets/stylesheets']
         }))
         .pipe(gulp.dest(config.publicDir + '/css'));
});

gulp.task('prod-css', function() {
  return gulp.src('./css/app.scss')
         .pipe(sass({
           includePaths: [config.bootstrapDir + '/assets/stylesheets']
         }))
         .pipe(cleanCSS({compatibility: 'ie8'}))
         .pipe(gulp.dest(config.publicDir + '/css'));
});

gulp.task('fonts', function() {
  return gulp.src(config.bootstrapDir + '/assets/fonts/**/*')
         .pipe(gulp.dest(config.publicDir + '/fonts'));
});

gulp.task('watch', function() {
  gulp.watch(config.sourceDir, ['prod-css']);
});

gulp.task('default', ['css', 'fonts']);
gulp.task('prod', ['prod-css', 'fonts']);
