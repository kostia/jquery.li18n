var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('build', function() {
  return gulp.src(['jquery.li18n.js'])
    .pipe(uglify())
    .pipe(concat('jquery.li18n.min.js'))
    .pipe(gulp.dest('.'));
});
