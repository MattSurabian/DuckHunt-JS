const PIXI = require('pixi.js');

const HUD_TEXT_STYLE = {
  font: '18px Arial',
  align: 'left',
  fill: 'white'
};

const GAME_STATUS_TEXT = {
  font: '40px Arial',
  align: 'left',
  fill: 'white'
};

const GUTTER_SIZE = 10;

class Hud extends PIXI.Container {
  constructor() {
    super();

    this.waveStatus = this.addChild(new PIXI.Text('', HUD_TEXT_STYLE));
    this.gameStatus = this.addChild(new PIXI.Text('', GAME_STATUS_TEXT));
    this.score = this.addChild(new PIXI.Text('', HUD_TEXT_STYLE));
  }

  setGameStatus(text) {
    this.gameStatus.text = text;
    this.gameStatus.position.set(this.parent.getWidth() / 2 - this.gameStatus.width / 2, this.parent.getHeight() / 2 - this.gameStatus.height);
  }

  clearGameStatus() {
    this.setGameStatus('');
  }

  setWaveStatus(text) {
    this.waveStatus.text = text;
    this.waveStatus.position.set(GUTTER_SIZE, this.parent.getHeight() * 0.95 - GUTTER_SIZE);
  }

  clearWaveStatus() {
    this.setWaveStatus('');
  }

  setScore(text) {
    this.score.text = text;
    this.score.position.set(this.parent.getWidth() - this.score.width - GUTTER_SIZE, GUTTER_SIZE);
  }

  clearScore() {
    this.setScore('');
  }
}

export default Hud;
