const PIXI = require('pixi.js');

const HUD_TEXT_STYLE = {
  font: '18px Arial',
  align: 'left',
  fill: 'white'
};

const GUTTER_SIZE = 10;

class Hud extends PIXI.Container {
  constructor(opts) {
    super();

    this.gameWidth = opts.gameWidth;
    this.gameHeight = opts.gameHeight;

    this.waveStatus = new PIXI.Text('', HUD_TEXT_STYLE);
    this.waveStatus.position.set(GUTTER_SIZE, this.gameHeight - this.waveStatus.height - GUTTER_SIZE);

    this.score = new PIXI.Text('', HUD_TEXT_STYLE);
    this.score.position.set(this.gameWidth - GUTTER_SIZE, GUTTER_SIZE);

    this.addChild(this.score);
    this.addChild(this.waveStatus);
  }

  setWaveStatus(text) {
    this.waveStatus.text = text;
  }

  clearWaveStatus() {
    this.setWaveStatus('');
  }

  setScore(text) {
    this.score.text = text;
    this.score.position.x = this.gameWidth - this.score.width - GUTTER_SIZE;
  }

  clearScore() {
    this.setScore('');
  }
}

export default Hud;
