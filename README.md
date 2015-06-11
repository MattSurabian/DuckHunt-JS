# DUCK HUNT JS v2.0

[Play the game](http://mattsurabian.com/duckhunt)

This is an implementation of DuckHunt in javascript using HTML5 audio.

All of the game logic is in the duckhunt directory. This project uses [gulp](http://gulpjs.com/) to build two concatenated js files;
one representing all of our game logic the other representing necessary javascript library dependencies.

This refactor of the game relies on custom events to control game flow which has cut down a bit on the "animation callback hell"
faced in version 1.

## Working With This Repo

1. Clone the repo into a directory of your choice
1. `cd` into that directory and run `npm install`
1. Use the `gulp dev` task during active development. This task automatically builds all necessary JS files and triggers the [livereload browser extension](http://livereload.com/extensions/) to do its thing and reload the page when changes are detected in the `lib` and `duckhunt` directories.
1. If you want to manually cut a build of the JS the default gulp task will lint, concatenate, and minify the project's javascript files it into the build directory.
