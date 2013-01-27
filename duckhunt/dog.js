function Dog(id, game){
    this.id = id;
    this.game = game; // game object to trigger events on and append to
    this.dog = $(id);

    this.dog.hide();
}

/**
 * Used at the start of a level
 */
Dog.prototype.intro = function(){
    this.dog.addClass('searchDog');
    this.dog.show(); // HA GET IT DOG SHOW!?!
    this.dog.sprite({fps: 6, no_of_frames: 4});
    this.dog.animate({
        left: '240'
    },5000,'linear',function(){
        $(this).destroy();
        $(this).css("background-position","-632px 0px");
        setTimeout(_.bind(function(){
            this.css({
                'background-image': 'url(images/jumpDog.png)',
                'bottom': '75px',
                'background-position': '0 0'
            });
            this.sprite({fps: 50, no_of_frames: 2,play_frames: 2});
            this.fadeOut().promise().then(
                _.bind(function(){
                    // reset css modifications so animation can be easily rerun
                    this.attr('style','');
                    this.removeClass('searchDog');
                },this));
            this.spStop();
            this.destroy();
        },$(this)),500);
    });
};

/**
 * Used when duck is shot and the dog retrieves
 */
Dog.prototype.fetch = function(){
    this.dog.show(); // HA GET IT DOG SHOW!?!
    this.dog.css("background-position","0px 0px");
    this._upDown();
};

/**
 * Used when ducks are missed
 */
Dog.prototype.laugh = function(){
    this.dog.stop(true,false);
    this.dog.show();
    this.dog.css("background-position","-276px 0px");
    this._upDown();
};

Dog.prototype._upDown = function(){
    return this.dog.animate({
        bottom: '110'
    },400,function(){
        setTimeout(_.bind(function(){
            this.animate({
                bottom: '-10'
            },500);
        },$(this)),700);
    });
};
