var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');

gulp.task('default', function() {
    gulp.start('watch');
});

gulp.task('watch', function() {
    gulp.watch('./static/sass/*.scss', ['sass']);

    livereload.listen();
    gulp.watch(['./static/**/*.*', './template/*.*']).on('change', livereload.changed);
});


gulp.task('sass', function() {
    gulp.src('./static/sass/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./static/css'));
});
