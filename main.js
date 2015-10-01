import Game from './src/modules/Game';

document.addEventListener('DOMContentLoaded', function() {

  // create the root of the scene graph
  let game = new Game({
    spritesheet: 'sprites.json'
  }).load();

}, false);
