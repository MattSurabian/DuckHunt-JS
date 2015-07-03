const PIXI = require('pixi.js');

const _find = require('lodash/collection/find');
const _result = require('lodash/object/result');

class Character extends PIXI.extras.MovieClip {

  constructor(assetKey, resourceKey, states) {
    let gameTextures = PIXI.loader.resources[resourceKey].textures;
    for (let textureKey in gameTextures) {
      if (!gameTextures.hasOwnProperty(textureKey) || textureKey.indexOf(assetKey) === -1) {
        continue;
      }

      let parts = textureKey.split('/');
      parts.length -= 1; //truncate to remove media file

      let state = parts.join('/').replace(assetKey + '/', '');

      // Only add textures if the state is supported by the class
      let stateObj = _find(states, {name: state});
      if (!stateObj) {
        continue;
      }

      if (stateObj.hasOwnProperty('textures')) {
        stateObj.textures.push(gameTextures[textureKey]);
      } else {
        Object.defineProperty(stateObj, 'textures', {
          value: [gameTextures[textureKey]],
          writable: true,
          enumerable: true,
          configurable: true
        });
      }
    }

    // Give the MovieClip a default state
    super(states[0].textures);
    this.states = states;
    this.animationSpeed = this.states[0].animationSpeed;
    return this;
  }

  setState(state) {
    let stateObj = _find(this.states, {name: state});
    if (!stateObj) {
      return;
    }
    this._textures = stateObj.textures;
    this.animationSpeed = stateObj.animationSpeed;
    this.loop = stateObj.hasOwnProperty('loop') ? stateObj.loop : true;
    this.play();
  }

  setPosition(x, y) {
    this.position.set(x, y);
  }

}

export default Character;
