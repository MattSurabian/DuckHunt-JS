import Game from './src/modules/Game';

document.addEventListener('DOMContentLoaded', function() {

  // create the root of the scene graph
  let game = new Game({
    gameWidth: 800,
    gameHeight: 600,
    spritesheet: 'sprites.json'
  }).load();

}, false);
