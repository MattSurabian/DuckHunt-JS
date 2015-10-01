const PIXI = require('pixi.js');
const BPromise = require('bluebird');
const Howler = require('howler');
const audioSpriteSheet = require('../../dist/audio.json');
const sound = new Howl(audioSpriteSheet);
Howler.Howler.mute();
const Utils = require('../libs/utils');
const TWEEN = require('tween.js');

import Duck from './Duck';
import Dog from './Dog';

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 600;

class Stage extends PIXI.Container {

  constructor(opts) {
    super();
    this.spritesheet = opts.sprites;
    this.interactive = true;
    this.ducks = [];
    this.dog = new Dog(this.spritesheet);
    this.dog.visible = false;

    this._setStage();
    this.scaleToWindow();
  }

  scaleToWindow() {
    this.scale.set(window.innerWidth / DEFAULT_WIDTH, window.innerHeight / DEFAULT_HEIGHT);
  }

  _setStage() {
    let background = new PIXI.extras.MovieClip([PIXI.loader.resources[this.spritesheet].textures['scene/back/0.png']]);
    background.position.set(0, 0);

    let tree = new PIXI.extras.MovieClip([PIXI.loader.resources[this.spritesheet].textures['scene/tree/0.png']]);
    tree.position.set(100, 237);

    this.addChild(tree);
    this.addChild(background);
    this.addChild(this.dog);
    return this;
  }

  preLevelAnimation() {
    this.ducks = [];
    return this.dog.levelIntro();
  }

  addDucks(numDucks, speed) {
    for (let i = 0; i < numDucks; i++) {
      let duckColor = i % 2 === 0 ? 'red' : 'black';
      let newDuck = new Duck(duckColor, this.spritesheet); // Al was here.
      newDuck.setPosition(this.getWidth() / 2, this.getHeight());

      this.ducks.push(newDuck);
      newDuck.play();
      this.addChildAt(newDuck, 0);
      newDuck.fly({
        speed: speed
      });
    }
  }

  shotsFired(clickPoint) {
    sound.play('gunSound');
    clickPoint.x /= this.scale.x;
    clickPoint.y /= this.scale.y;
    let killed = 0;
    for (let i = 0; i < this.ducks.length; i++) {
      let duck = this.ducks[i];
      if (duck.alive && Utils.pointDistance(duck.getCenterPoint(), clickPoint) < 60) {
        killed++;
        duck.shot();
        this.dog.retrieve();
      }
    }
    return killed;
  }

  getWidth() {
    return DEFAULT_WIDTH;
  }

  getHeight() {
    return DEFAULT_HEIGHT;
  }

  flyAway() {
    this.dog.laugh();
    while (this.ducks.length > 0) {
      let duck = this.ducks.pop();
      if (duck.alive) {
        duck.flyAway();
      }
    }
  }

  cleanUpDucks() {
    let childCount = this.children.length;
    for (let i = 0; i < childCount; i++) {
      let child = this.children[i];
      if (child instanceof Duck) {
        this.removeChild(child);
      }
    }
  }

  ducksAlive() {
    for (let i = 0; i < this.ducks.length; i++) {
      if (this.ducks[i].alive) {
        return true;
      }
    }
    return false;
  }

  isActive() {
    return this.dog.isActive() || TWEEN.getAll().length > 0;
  }

  victoryScreen() {
    sound.play('champ');
  }

  loserScreen() {
    sound.play('loserSound');
  }
}

export default Stage;
