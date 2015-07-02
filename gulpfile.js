var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var source = require('vinyl-source-stream');
var livereload = require('gulp-livereload');
var audiosprite = require('audiosprite');
var glob = require('glob');
var shell = require('gulp-shell');
var fs = require('fs');

gulp.task('modules', function() {
  browserify({
    entries: './duckhunt.js',
    debug: true
  }).transform(babelify)
    .bundle()
    .pipe(source('duckhunt.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(livereload());
});

gulp.task('jshint', function() {
  return gulp.src([
    '_modules/**',
    'duckhunt.js'
  ]).pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'))
});

gulp.task('jscs', function() {
  return gulp.src([
    '_modules/*.js',
    'duckhunt.js'
  ]).pipe(jscs())
});


gulp.task('dev', function() {
  livereload.listen();
  gulp.watch(['_modules/*.js', 'duckhunt.js'], ['jshint', 'jscs', 'modules']);
  gulp.watch(['_assets/images/**/*.png'], ['images']);
  gulp.watch(['_assets/sounds/**/*.mp3'], ['audio']);

});

gulp.task('audio', function() {
  var files = glob.sync('./_assets/sounds/*.mp3');
  var outputPath = './dist/audio';
  var opts = {
    output: outputPath,
    'export': 'ogg,mp3',
    loop: ['quacking', 'sniff']
  };

  return audiosprite(files, opts, function(err, obj) {
    if (err) {
      console.error(err);
    }

    return fs.writeFile('./dist/audio' + '.json', JSON.stringify(obj, null, 2));
  });
});

gulp.task('images', function(){
  // There is a texturepacker template for spritesmith but it doesn't work
  // well with complex directory structures, so instead we use the shell
  // checking TexturePacker --version first ensures it bails if TexturePacker
  // isn't installed
  return gulp.src('', {read:false})
  .pipe(shell([
    'TexturePacker --version || echo ERROR: TexturePacker not found, install TexturePacker',
    'TexturePacker --disable-rotation --data dist/sprites.json --format json --sheet dist/sprites.png _assets/images'
  ]))
  .pipe(livereload());
});