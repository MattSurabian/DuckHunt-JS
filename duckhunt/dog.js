function Dog(id, game){
    this.id = id;
    this.game = game; // game object to trigger events on and append to
    this.dog = $(id);
}
// todo: Use deferred objects or when then statements to control animations with basic movement functions instead of callback settimeout hell

/**
 * Used at the start of a level
 */
Dog.prototype.intro = function(){

};

/**
 * Used when duck is shot and the dog retrieves
 */
Dog.prototype.fetch = function(){
    this.dog.css("background-position","0px 0px");
};

/**
 * Used when ducks are missed
 */
Dog.prototype.dogLaugh = function(){
    this.dog.stop(true,false);
    this.dog.css("background-position","-276px 0px");
};

Dog.prototype._dogGoUp = function(){
    this.dog.animate({
        bottom: '110'
    },400);
};

Dog.prototype._dogGoDown = function(){
    this.dog.animate({
        bottom: '-10'
    },500);
};

Dog.prototype._search = function(){
    this.dog.css("bottom","4px");
    this.dog.css("left","-400px");
    this.dog.css("background-image","url(images/dogSniffJump.png)");
    this.dog.css("background-position","0px 0px");
    this.dog.show(); // HA GET IT DOG SHOW!?!
    this.dog.sprite({fps: 6, no_of_frames: 4});
    this.dog.animate({
        left: '240'
    },5000,'linear');
};

Dog.prototype._stay = function(){
    this.dog.destroy();
    this.dog.css("background-position","-632px 0px");
};

Dog.prototype._jump = function(){
    this.dog.css("background-image","url(images/jumpDog.png)");
    this.dog.css("bottom","75px");
    this.dog.css("background-position","0px 0px");
    this.dog.sprite({fps: 50, no_of_frames: 2,play_frames: 2});
    this.dog.fadeOut();
    this.dog.spStop();
    this.dog.destroy();
};