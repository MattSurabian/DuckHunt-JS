const TWEEN = require('tween.js');
const Howler = require('howler');
const audioSpriteSheet = require('../../dist/audio.json');
const sound = new Howl(audioSpriteSheet);
const _random = require('lodash/number/random');
const _extend = require('lodash/object/assign');
const Utils = require('../libs/utils');

import Character from './Character';

class Duck extends Character {
  constructor(color, resourceKey) {
    let states = [
      {
        name: 'left',
        animationSpeed: 0.1

      },
      {
        name: 'right',
        animationSpeed: 0.18

      },
      {
        name: 'top-left',
        animationSpeed: 0.18

      },
      {
        name: 'top-right',
        animationSpeed: 0.18

      },
      {
        name: 'dead',
        animationSpeed: 0.18

      },
      {
        name: 'shot',
        animationSpeed: 0.18

      }
    ];

    let resourceId = 'duck/' + color;
    super(resourceId, resourceKey, states);
    this.alive = true;
  }

  fly(opts) {
    let _this = this;

    let options = _extend({
      minX: 0,
      maxX: this.parent.getWidth() - this.width,
      minY: 0,
      maxY: this.parent.getHeight() - this.height,
      minDistance: 300,
      speed: this.flightSpeed
    }, opts);

    this.setFlightSpeed(options.speed);

    let distance, destination;
    do {
      destination = {
        x: _random(options.minX, options.maxX),
        y: _random(options.minY, options.maxY)
      };
      distance = Utils.pointDistance(this.getCenterPoint(), destination);
    } while (distance < options.minDistance);


    let direction = Utils.directionOfTravel(this.getCenterPoint(), destination);

    // we don't have bottom-X animations
    this.setState(direction.replace('bottom', 'top'));
    this.tween = new TWEEN.Tween(this.position)
      .to(destination, this.flightSpeed + _random(0, 300))
      .onUpdate(function() {
        _this.setPosition(parseInt(this.x), parseInt(this.y));
      })
      .onComplete(function() {
        if (_this.alive) {
          _this.fly(options);
        }
      })
      .start();
  }

  flyAway() {
    let _this = this;
    this.tween.stop();
    let destination = {
      x: this.parent.getWidth() / 2 + this.width / 2,
      y: -500
    };

    let direction = Utils.directionOfTravel(this.getCenterPoint(), destination);

    // we don't have bottom-X animations
    this.setState(direction.replace('bottom', 'top'));
    this.tween = new TWEEN.Tween(this.position)
      .to(destination, 800)
      .onUpdate(function() {
        _this.setPosition(parseInt(this.x), parseInt(this.y));
      })
    .start();
  }

  shot() {
    if (!this.alive) {
      return;
    }
    this.alive = false;
    this.tween.stop();
    this.setState('shot');
    sound.play('quak');

    let _this = this;
    this.tween = new TWEEN.Tween({y: this.position.y })
      .to({y: this.parent.getHeight() }, 600)
      .delay(450)
      .onStart(this.setState.bind(this, 'dead'))
      .onUpdate(function() {
        _this.setPosition(_this.position.x, this.y);
      })
      .onComplete(function() {
        sound.play('thud');
        _this.visible = false;
      })
      .start();

    return this.tween;
  }

  getCenterPoint() {
    let point = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2
    };

    return point;
  }

  setFlightSpeed(speed) {
    switch (speed) {
      case 0:
        this.flightSpeed = 3000;
        break;
      case 1:
        this.flightSpeed = 2800;
        break;
      case 2:
        this.flightSpeed = 2500;
        break;
      case 3:
        this.flightSpeed = 2000;
        break;
      case 4:
        this.flightSpeed = 1800;
        break;
      case 5:
        this.flightSpeed = 1500;
        break;
      case 6:
        this.flightSpeed = 1300;
        break;
      case 7:
        this.flightSpeed = 1200;
        break;
      case 8:
        this.flightSpeed = 800;
        break;
      case 9:
        this.flightSpeed = 600;
        break;
      case 10:
        this.flightSpeed = 500;
        break;
    }
  }
}

export default Duck;
