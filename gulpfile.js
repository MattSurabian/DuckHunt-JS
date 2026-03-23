var gulp = require('gulp');
var audiosprite = require('./vendor/audiosprite');
var { globSync } = require('glob');
var { exec } = require('child_process');
var fs = require('fs');

gulp.task('audio', gulp.parallel(function(cb) {
  var files = globSync('./src/assets/sounds/*.mp3');
  var outputPath = './dist/audio';
  var opts = {
    output: outputPath,
    path: './',
    format: 'howler2',
    'export': 'ogg,mp3',
    loop: ['quacking', 'sniff']
  };

  return audiosprite(files, opts, function(err, obj) {
    if (err) {
      console.error(err);
    }

    return fs.writeFile('./dist/audio' + '.json', JSON.stringify(obj, null, 2), cb);
  });
}));

function runCommands(commands, cb) {
  var i = 0;
  function next() {
    if (i >= commands.length) return cb();
    exec(commands[i], function(err, stdout, stderr) {
      if (stdout) process.stdout.write(stdout);
      if (stderr) process.stderr.write(stderr);
      if (err) return cb(err);
      i++;
      next();
    });
  }
  next();
}

gulp.task('images', gulp.parallel(function(cb) {
  runCommands([
    'TexturePacker --version || echo ERROR: TexturePacker not found, install TexturePacker',
    'TexturePacker --disable-rotation --data dist/sprites.json --format json --sheet dist/sprites.png src/assets/images'
  ], cb);
}));

gulp.task('deploy', gulp.parallel(function(cb) {
  runCommands([
    "aws --profile duckhunt s3 sync dist/ s3://duckhuntjs.com --include '*' --acl 'public-read'"
  ], cb);
}));

gulp.task('default', gulp.parallel('images', 'audio'));
