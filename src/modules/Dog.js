const BPromise = require('bluebird');
const TWEEN = require('tween.js');
const Howler = require('howler');
const audioSpriteSheet = require('../../dist/audio.json');
const sound = new Howl(audioSpriteSheet);
const _delay = require('lodash/function/delay');

import Character from './Character';

class Dog extends Character {
  constructor(resourceKey) {
    let states = [
      {
        name: 'double',
        animationSpeed: 0.1
      },
      {
        name: 'single',
        animationSpeed: 0.1
      },
      {
        name: 'find',
        animationSpeed: 0.1
      },
      {
        name: 'jump',
        animationSpeed: 0.1,
        loop: false
      },
      {
        name: 'laugh',
        animationSpeed: 0.1
      },
      {
        name: 'sniff',
        animationSpeed: 0.1
      }
    ];

    super('dog', resourceKey, states);
    this.tweenPromise = null;
  }

  sniffTween() {
    let _this = this;
    return new BPromise(function(resolve, reject) {
      new TWEEN.Tween({
        x: 0,
        y: _this.parent.getHeight() - _this.height
      })
      .to({
          x: _this.parent.getWidth() / 2 - _this.width / 2,
          y: _this.parent.getHeight() - _this.height
        }, 2000)
      .onStart(function() {
          _this.visible = true;
          _this.parent.setChildIndex(_this, _this.parent.children.length - 1);
          _this.setState('sniff');
          sound.play('sniff');
        })
      .onUpdate(function() {
          _this.setPosition(this.x, this.y);
        })
      .onComplete(function() {
          sound.stop('sniff');
          resolve();
        })
      .start();
    });
  }

  jumpTween() {
    let _this = this;
    return new BPromise(function(resolve, reject) {
      new TWEEN.Tween(_this.position)
        .to({y: _this.position.y - _this.height / 1.2}, 5)
        .onStart(_this.setState.bind(_this, 'jump'))
        .onUpdate(function() {
          _this.setPosition(this.x, this.y);
        })
        .onComplete(resolve)
        .start();
    });
  }

  upDownTween() {
    let _this = this;

    let start = {
      x: _this.parent.getWidth() / 2 - _this.width / 2,
      y: _this.parent.getHeight()
    };

    let end = {
      y: _this.parent.getHeight() - 230
    };

    return new TWEEN.Tween(start)
      .to(end, 400)
      .onUpdate(function() {
        _this.setPosition(this.x, this.y);
      })
      .repeat(1)
      .delay(500)
      .yoyo(true);
  }

  retrieveTween() {
    let _this = this;
    return new BPromise(function(resolve, reject) {
      if (_this.toRetrieve <= 0) {
        resolve();
      }
      let state, ducksFetched;

      if (_this.toRetrieve >= 2) {
        state = 'double';
        ducksFetched = 2;
      } else if (_this.toRetrieve == 1) {
        state = 'single';
        ducksFetched = 1;
      } else {
        resolve();
        return;
      }

      _this.setState(state);

      let tween = _this.upDownTween();
      tween.onStart(function() {
        _this.visible = true;
        sound.play('ohYeah');
      });
      tween.onComplete(function() {
        _this.toRetrieve -= ducksFetched;
        resolve();
      });
      tween.start();
    });
  }

  find() {
    sound.play('barkDucks');
    this.setState('find');
  }

  levelIntro() {
    this.toRetrieve = 0;
    this.tweenPromise = this.sniffTween()
      .then(this.find.bind(this))
      .delay(600)
      .then(this.jumpTween.bind(this))
      .delay(300)
      .then(this.hide.bind(this));

    return this.tweenPromise;
  }

  hide() {
    this.visible = false;
    this.parent.setChildIndex(this, 0);
    this.setPosition(this.parent.getWidth() / 2, this.parent.getHeight());
  }

  retrieve() {
    this.toRetrieve++;
    this.tweenPromise = this.tweenPromise.then(this.retrieveTween.bind(this));
  }

  laugh() {
    let _this = this;
    this.tweenPromise = this.tweenPromise.then(new BPromise(function(resolve, reject) {
      let tween = _this.upDownTween();
      tween.onStart(function() {
        _this.toRetrieve = 0;
        _this.setState('laugh');
        sound.play('laugh');
      });
      tween.onComplete(function() {
        resolve();
      });
      tween.start();
    }));
  }

  isActive() {
    return !this.tweenPromise || !this.tweenPromise.isResolved() || this.toRetrieve > 0;
  }
}

export default Dog;
