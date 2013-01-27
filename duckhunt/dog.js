function Dog(id, game){
    this.id = id;
    this.game = game; // game object to trigger events on and append to

    $('<div id="'+this.id+'" class="theDog"></div>').appendTo(this.game);
    this.DOM = $("#"+this.id);

    this.DOM.hide();
}

/**
 * Used at the start of a level
 */
Dog.prototype.intro = function(){
    this.DOM.addClass('searchDog');
    this.DOM.show(); // HA GET IT DOG SHOW!?!
    this.DOM.sprite({fps: 6, no_of_frames: 4});
    this.DOM.animate({
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
    this.DOM.show(); // HA GET IT DOG SHOW!?!
    this.DOM.css("background-position","0px 0px");
    this._upDown();
};

/**
 * Used when ducks are missed
 */
Dog.prototype.laugh = function(){
    this.DOM.stop(true,false);
    this.DOM.show();
    this.DOM.css("background-position","-276px 0px");
    this._upDown();
};

/**
 * Utility method to move dog up and down
 * @private
 */
Dog.prototype._upDown = function(){
    this.DOM.animate({
        bottom: '110'
    },400,function(){
        setTimeout(_.bind(function(){
            this.animate({
                bottom: '-10'
            },500);
        },$(this)),700);
    });
};
