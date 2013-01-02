function Duck(id, style, speed, game){

    this.id = id;
    this.class = style;
    this.speed = 0;
    this.game = game; // game object to trigger events on and append to
    this.DOM = null;

    this.setSpeed(speed);

}

Duck.prototype.die = function(){
    this.game.trigger('duck:died');

    $._spritely.instances[this.id].stop_random=true;
    this.DOM.stop(true,false);
    this.DOM.unbind();
    this.DOM.addClass("deadSpin");

    this.DOM.spStop(true);
    this.DOM.spState(5);

    setTimeout(function(){
        this.DOM.spState(6);
        this.DOM.spStart();
        this.DOM.animate({
            top:'420'
        },800,function(){
            this.DOM.destroy();
            this.DOM.attr("class","deadDuck");
        });
    },500);
}

Duck.prototype.hatch = function(){
    this.DOM = $('<div id="'+this.id+'" class="duck '+this.class+'"></div>').appendTo(this.game);
    this.DOM.bind('mousedown',function(){
        this.die();
    })
}

Duck.prototype.fly = function(){
    this.DOM.sprite({fps: 6, no_of_frames: 3,start_at_frame: 1});
    this.DOM.spRandom({
        top: 400,
        left: 700,
        right: 0,
        bottom: 0,
        speed: theGame.duckSpeed,
        pause: 0
    });
}

Duck.prototype.escape = function(){

}

Duck.prototype.setSpeed = function(duckSpeed){
    switch(duckSpeed){
        case 0:
            this.speed = 3000;
            break;
        case 1:
            this.speed = 2800;
            break;
        case 2:
            this.speed = 2500;
            break;
        case 3:
            this.speed = 2000;
            break;
        case 4:
            this.speed = 1800;
            break;
        case 5:
            this.speed = 1500;
            break;
        case 6:
            this.speed = 1300;
            break;
        case 7:
            this.speed = 1200;
            break;
        case 8:
            this.speed = 800;
            break;
        case 9:
            this.speed = 600;
            break;
        case 10:
            this.speed = 500;
            break;
    }
}