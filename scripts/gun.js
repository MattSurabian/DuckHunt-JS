function Gun(name, clip, spread, reloadTime, game, audio1, audio2){
    this.name = name; // name of this weapon
    this.clip = clip; // how much ammo the weapon receives when reloaded
    this.ammo = 0; // how much ammo the weapon has at any given time
    this.spread = spread; // the diameter of the weapons hit area
    this.reloadTime = reloadTime; // time between shots
    this.game = game; // game DOM object to trigger events on
    this.audio1 = audio1; // the ID of the weapon's HTML5 audio element
    this.audio2 = audio2; // the ID of the weapon's other HTML audio element
    this.lastAudio = null; // convenience variable for concurrent sound play

    this.reload(); // load the gun when created
}

Gun.prototype.shoot = function(){
    if(this.ammo <= 0){
        this.outOfAmmo();
        return;
    }

    this.ammo -= 1;
    this.sound();
    this.game.trigger('gun:fire');
}

Gun.prototype.sound = function(){
    if(this.lastAudio === this.audio1){
        this.audio2.play();
        this.lastAudio = this.audio2;
    }else{
        this.audio1.play();
        this.lastAudio = this.audio1;
    }
}

Gun.prototype.outOfAmmo = function(){
    this.game.trigger('gun:out_of_ammo');
}

Gun.prototype.getAmmo = function(){
    return this.ammo;
}

Gun.prototype.reload = function(){
    this.ammo = this.clip;
    this.game.trigger('gun:reloaded');
}

Gun.prototype.getSpread = function(){
    return this.spread;
}

Gun.prototype.getReloadTime = function(){
    return this.reloadTime;
}