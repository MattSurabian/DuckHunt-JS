var gulp = require('gulp');
var audiosprite = require('./vendor/audiosprite');
var glob = require('glob');
var fs = require('fs');
var { spawn } = require('child_process');

gulp.task('audio', function(cb) {
  var files = glob.sync('./src/assets/sounds/*.mp3');
  var outputPath = './dist/audio';
  var opts = {
    output: outputPath,
    path: './',
    format: 'howler2',
    'export': 'ogg,mp3',
    loop: ['quacking', 'sniff']
  };

  audiosprite(files, opts, function(err, obj) {
    if (err) {
      return cb(err);
    }

    fs.writeFile('./dist/audio' + '.json', JSON.stringify(obj, null, 2), cb);
  });
});

gulp.task('images', function(done) {
  function run(cmd, args, cb) {
    var proc = spawn(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    var stderr = '';
    proc.stderr.on('data', function(data) { stderr += data; });
    proc.on('close', function(code) {
      cb(code ? new Error(cmd + ' exited with code ' + code + (stderr ? ': ' + stderr.trim() : '')) : null);
    });
  }

  run('TexturePacker', ['--version'], function(versionErr) {
    if (versionErr) {
      console.error('ERROR: TexturePacker not found or not licensed, install TexturePacker');
      return done(versionErr);
    }
    run('TexturePacker', ['--disable-rotation', '--data', 'dist/sprites.json', '--format', 'json', '--sheet', 'dist/sprites.png', 'src/assets/images'], function(err) {
      done(err);
    });
  });
});

gulp.task('deploy', function(done) {
  var proc = spawn('aws', ['--profile', 'duckhunt', 's3', 'sync', 'dist/', 's3://duckhuntjs.com', '--include', '*', '--acl', 'public-read'], { stdio: 'inherit' });
  proc.on('close', function(code) {
    done(code ? new Error('deploy failed with code ' + code) : null);
  });
});

gulp.task('default', gulp.parallel('images', 'audio'));
