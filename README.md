# DUCK HUNT JS v3.0

[Play the game](http://mattsurabian.com/duckhunt)

This is an implementation of DuckHunt in Javascript and HTML5. It uses the PixiJS rendering engine, TweenJS, Howler, and Bluebird Promises.

## Rendering
This game supports WebGL and Canvas rendering via the PixiJS rendering engine.

## Audio
This game will attempt to use the WebAudioAPI and fallback to HTML5 Audio if necessary. Audio is loaded and controlled via HowlerJS.

## Tweening
The animations in this game are a combination of PixiJS MovieClips built from sprite images and tweens. Since PixiJS doesn't provide a tweening API, TweenJS was used. Because TweenJS isn't great at chaining complex animations, multi-stage tweens are often wrapped with Bluebird Promises.

## Game Logic
The flow of this game is managed using Javascript. The main chunks of business logic are implemented as ES6 classes which are transpiled to ES5 using Babel.

## Working With This Repo

1. Clone the repo into a directory of your choice
1. `cd` into that directory and run `npm install`
1. Use the `gulp dev` task during active development. This task automatically builds all necessary JS files and triggers the [livereload browser extension](http://livereload.com/extensions/) to reload the page when changes are detected in the `src` directory.
1. If you want to manually cut a build of the JS, the default gulp task will run jshint, ensure code style compliance via JSCS, transpile to ES5 and browserify everything into a single `duckhunt.js` file. The default task also constructs new image and audio sprites and their respecitve manifests.

## Bugs
Please report bugs as [issues](https://github.com/MattSurabian/DuckHunt-JS/issues).

## Contributing
Pull requests are welcome! Please ensure `jscs` and `jshint` compliance and include any built files.