const PIXI = require('pixi.js');
const TWEEN = require('tween.js');
const _noop = require('lodash/utility/noop');
const levels = require('../data/levels.json');

const DEFAULT_BACKGROUND_COLOR = 0x64b0ff;

import Stage from './Stage';
import Duck from './Duck';
import Dog from './Dog';
import Hud from './Hud';

const STATUS_TEXT_STYLE = {
  font: '40px Arial',
  align: 'left',
  fill: 'white'
};

const SUCCESS_RATIO = 0.6;

class Game {
  constructor(opts) {
    this.spritesheet = opts.spritesheet;
    this.loader = PIXI.loader;
    this.renderer =  PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
      backgroundColor: DEFAULT_BACKGROUND_COLOR
    });
    this.levelIndex = 0;

    this.waveEnding = false;
    this.waveOver = false;
    this.levels = levels.normal;
    this.score = 0;
    return this;
  }

  load() {
    this.loader
      .add(this.spritesheet)
      .load(this.onLoad.bind(this));
  }

  onLoad() {
    document.body.appendChild(this.renderer.view);

    this.stage = new Stage({
      sprites: this.spritesheet
    });

    this.hud = new Hud();

    this.stage.addChild(this.hud);
    this.scaleToWindow();

    //bind events
    window.addEventListener('resize', this.scaleToWindow.bind(this));

    this.startLevel();
    this.animate();
  }

  scaleToWindow() {
    this.renderer.resize(window.innerWidth, window.innerHeight);
    this.stage.scaleToWindow();
  }

  startLevel() {
    let _this = this;

    this.level = this.levels[this.levelIndex];
    this.ducksShotThisLevel = 0;

    this.hud.setGameStatus(this.level.title);
    this.wave = 0;

    this.stage.preLevelAnimation().then(function() {
      _this.hud.clearGameStatus();
      _this.stage.mousedown = _this.stage.touchstart = _this.handleClick.bind(_this);
      _this.startWave();
    });
  }

  startWave() {
    this.wave++;
    this.hud.setWaveStatus('Wave ' + this.wave + ' of ' + this.level.waves);
    this.waveStartTime = Date.now();
    this.shotsFired = 0;
    this.waveEnding = false;
    this.waveOver = false;
    this.stage.addDucks(this.level.ducks, this.level.speed);
  }

  endWave() {
    this.stage.cleanUpDucks();
    this.goToNextWave();
  }

  goToNextWave() {
    this.resetBackgroundColor();
    if (this.level.waves === this.wave) {
      this.endLevel();
    } else {
      this.startWave();
    }
  }

  isWaveTimeUp() {
    return this.waveElapsedTime() >= this.level.time;
  }

  shouldWaveEnd() {
    return (this.isWaveTimeUp() || this.outOfAmmo() || !this.stage.ducksAlive()) && !this.waveEnding;
  }

  endLevel() {
    this.hud.clearWaveStatus('');
    this.stage.mousedown = this.stage.touchstart = _noop;
    this.goToNextLevel();
  }

  goToNextLevel() {
    this.levelIndex++;
    if (!this.levelWon()) {
      this.loss();
    } else if (this.levelIndex < this.levels.length) {
      this.startLevel();
    } else {
      this.win();
    }
  }

  levelWon() {
    return this.ducksShotThisLevel > SUCCESS_RATIO * this.level.ducks * this.level.waves;
  }

  win() {
    this.hud.clearWaveStatus();
    this.hud.setGameStatus('You Win!');
    this.stage.victoryScreen();
  }

  loss() {
    this.hud.clearWaveStatus();
    this.hud.setGameStatus('You Lose!');
    this.stage.loserScreen();
  }

  handleClick(event) {
    if (!this.outOfAmmo()) {
      this.shotsFired++;
      this.updateScore(this.stage.shotsFired({
        x: event.data.global.x,
        y: event.data.global.y
      }));
    }
  }

  outOfAmmo() {
    return this.shotsFired >= this.level.bullets;
  }

  waveElapsedTime() {
    return (Date.now() - this.waveStartTime) / 1000;
  }

  resetBackgroundColor() {
    this.renderer.backgroundColor = DEFAULT_BACKGROUND_COLOR; // light blue
  }

  updateScore(ducksShot) {
    this.ducksShotThisLevel += ducksShot;
    this.score += ducksShot * this.level.pointsPerDuck;
    this.hud.setScore(this.score);
  }

  animate(time) {
    // render the stage container
    this.renderer.render(this.stage);
    TWEEN.update(time);


    if (!this.stage.isActive() && !this.waveOver) {
      this.waveOver = true;
      this.endWave();
    } else if (this.shouldWaveEnd()) {
      this.waveEnding = true;
      if (this.stage.ducksAlive()) {
        this.stage.flyAway();
        this.renderer.backgroundColor = 0xfbb4d4;
      }
    }

    requestAnimationFrame(this.animate.bind(this));

  }
}

export default Game;
