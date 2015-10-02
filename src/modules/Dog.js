import 'gsap/src/uncompressed/TweenMax.js';
import _delay from 'lodash/function/delay';
import _noop from 'lodash/utility/noop';
import _extend from 'lodash/object/assign';
import Howler from 'howler';
import audioSpriteSheet from '../../dist/audio.json';
import Character from './Character';

const sound = new Howl(audioSpriteSheet);

class Dog extends Character {
  /**
   * Dog Constructor
   * @param options
   * @param {String} options.spritesheet The object property to ask PIXI's resource loader for
   * @param {PIXI.Point} options.downPoint The point where the dog should sit at during active play
   * @param {PIXI.Point} options.upPoint The point the dog should rise to when retrieving ducks
   */
  constructor(options) {
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
    super('dog', options.spritesheet, states);
    this.toRetrieve = 0;
    this.anchor.set(0.5, 0);
    this.options = options;
  }

  /**
   * sniff
   * @param opts
   * @param {PIXI.Point} [opts.startPoint=this.position] Point the dog should start sniffing from
   * @param {PIXI.Point} [opts.endPoint=this.position] Point the dog should sniff to
   * @param {Function} [opts.onStart=_noop] Function to call at the start of the dog sniffing
   * @param {Function} [opts.onComplete=_noop] Function to call once the dog has finished sniffing
   * @returns {Dog}
   */
  sniff(opts) {
    let _this = this;
    let options = _extend({
      startPoint: this.position,
      endPoint: this.position,
      onStart: _noop,
      onComplete: _noop
    }, opts);

    this.sit({
      point: options.startPoint,
      pre: function() {
        _this.visible = false;
      }
    });

    this.timeline.to(_this.position, 2, {
      x: options.endPoint.x,
      y: options.endPoint.y,
      ease: 'Linear.easeNone',
      onStart: function() {
        _this.visible = true;
        _this.parent.setChildIndex(_this, _this.parent.children.length - 1);
        _this.state = 'sniff';
        sound.play('sniff');
        options.onStart();
      },
      onComplete: function() {
        sound.stop('sniff');
        options.onComplete();
      }
    });

    return this;
  }

  /**
   * upDownTween
   * @param opts
   * @param {PIXI.Point} [opts.startPoint] Lowest point the dog should go to, and where the animation starts
   * @param {PIXI.Point} [opts.endPoint] Highest point the dog should go to
   * @param {Function} [opts.onStart] Function to call at the start of the up/down animation
   * @param {Function} [opts.onComplete] Function to call once the dog has completed an up/down cycle
   * return {Dog}
   */
  upDownTween(opts) {
    let _this = this;
    let options = _extend({
      startPoint: this.options.downPoint || this.position,
      endPoint: this.options.upPoint || this.position,
      onStart: _noop,
      onComplete: _noop
    }, opts);

    this.sit({
      point: options.startPoint
    });

   this.timeline.add(TweenMax.to(_this.position, 0.4, {
      y: options.endPoint.y,
      yoyo: true,
      repeat: 1,
      repeatDelay: 0.5,
      ease: 'Linear.easeNone',
      onStart: function() {
        _this.visible = true;
        options.onStart.call(this);
      },
      onComplete: options.onComplete
    }));
    return this;
  }

  /**
   * find
   * @param opts
   * @param {Function} [opts.onStart] Function called at the start of the animation
   * @param {Function} [opts.onComplete] Function called when the animation has completed
   * @returns {Dog}
   */
  find(opts) {
    let _this = this;
    let options = _extend({
      onStart: _noop,
      onComplete: _noop
    }, opts);

    this.timeline.add(function() {
      sound.play('barkDucks');
      _this.state = 'find';
      options.onStart();
    });

    this.timeline.to(_this.position, 0.2, {
      y: '-=100',
      ease: 'Strong.easeOut',
      delay: 0.6,
      onStart: function() {
        _this.state = 'jump';
      },
      onComplete: function() {
        _this.visible = false;
        options.onComplete();
      }
    });

    return this;
  }

  /**
   * sit
   * @param opts
   * @param {PIXI.Point} [opts.point] Point the dog will go to without animation
   * @param {Function} [opts.onStart] Function called before moving the dog
   * @param {Function} [opts.onComplete] Function called after the dog has moved
   * @returns {Dog}
   */
  sit(opts) {
    let _this = this;
    let options = _extend({
      point: this.position,
      onStart: _noop,
      onComplete: _noop
    }, opts);

    this.timeline.add(function() {
      options.onStart();
      _this.position.set(options.point.x, options.point.y);
      options.onComplete();
    });
    return this;
  }

  /**
   * retrieve
   * @retuns {Dog}
   */
  retrieve() {
    let _this = this;
    this.toRetrieve++;

    this.upDownTween({
      onStart: function() {
        if (_this.state === 'laugh') {
          this.kill();
        }
        else if (_this.toRetrieve >= 2) {
          _this.state = 'double';
          _this.toRetrieve-=2;
        } else if (_this.toRetrieve === 1) {
          _this.state = 'single';
          _this.toRetrieve-=1;
        } else {
          this.kill();
        }
      }
    });
    return this;
  }

  /**
   * laugh
   * @returns {Dog}
   */
  laugh() {
    let _this = this;
    this.upDownTween({
      state: 'laugh',
      onStart: function() {
        _this.state = 'laugh';
        sound.play('laugh');
      }
    });

    return this;
  }

  /**
   * isActive
   * @returns {boolean}
   */
  isActive() {
    return super.isActive() && this.toRetrieve > 0;
  }
}

export default Dog;
