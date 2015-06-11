var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');

// Command line option:
//  --fatal=[warning|error|off]
var fatalLevel = require('yargs').argv.fatal;

var ERROR_LEVELS = ['error', 'warning'];

function isFatal(level) {
  return ERROR_LEVELS.indexOf(level) <= ERROR_LEVELS.indexOf(fatalLevel || 'error');
}

// Handle an error based on its severity level.
// Log all levels, and exit the process for fatal levels.
function handleError(level, error) {
  gutil.log(gutil.colors.red(error.message));
  if (isFatal(level)) {
    process.exit(1);
  }
}

gulp.task('duckhunt', function() {
  return gulp.src([
    'duckhunt/dog.js',
    'duckhunt/duck.js',
    'duckhunt/gun.js',
    'duckhunt/player.js',
    'duckhunt/overlay.js',
    'duckhunt/weapons.js',
    'duckhunt/levels.js',
    'duckhunt/duckhunt.js'
  ]).pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'))
    .on('error', handleError.bind(this, 'error'))
    .pipe(concat('duckhunt.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/'))
    .pipe(livereload());
});

gulp.task('libs', function() {
  return gulp.src([
    'lib/jquery.js',
    'lib/underscore.js',
    'lib/jquery.spritely.js',
    'lib/jquery.color.js',
    'lib/fastclick.js'
  ]).pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/'))
    .pipe(livereload());
});

gulp.task('dev', function() {
  // no fatal errors during active development by default
  // this prevents this task from exiting unexpectedly
  fatalLevel = fatalLevel || 'off';

  livereload.listen();
  gulp.watch('duckhunt/*.js', ['duckhunt']);
  gulp.watch('lib/*.js', ['libs']);

});

gulp.task('default', ['libs', 'duckhunt']);