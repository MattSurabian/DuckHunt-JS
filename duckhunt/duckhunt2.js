/************************************************
 DUCK HUNT JS
 by Matthew Surabian - MattSurabian.com
 A first draft...
 **************************************************/

var duckhunt = {
    level:null,
    playfield: '#game', // jquery selector, will change to jquery object on init
    curWave:0,
    duckMax: 0,
    waveEnding: false,
    liveDucks: [], // array of duck objects
    player: new Player('1', 'Player 1'),
    gameTimers: {
        quackID: null,
        sniffID: null
    },
    init: function(){
        var _this = this;
        this.playfield = $(this.playfield);

        this.player.setWeapon(new Gun(weapons.rifle,_this.playfield));

        this.playfield.on('wave:time_up',function(e,wave){_this.endWave(wave)})
        this.playfield.on('wave:end',function(e,wave){_this.endWave(wave)})

        this.playfield.on('duck:died',function(e,duck){_this.killDuck(duck)})
        this.playfield.on('click',function(){_this.fireGun()})

        this.playfield.on('gun:out_of_ammo',function(){_this.outOfAmmo();});
        this.playfield.on('gun:fire',function(){_this.flashScreen();});


    },
    loadLevel: function(level){
        duckhunt.level = level;
    },
    doWave: function(){
        var _this = this;
        clearInterval(this.gameTimers.quackID);

        this.curWave++;
        if(this.curWave > this.level.waves){
            this.nextLevel();
            return;
        }

        this.player.getWeapon().setAmmo(this.level.bullets);
        this.releaseDucks();

        var _curWave = this.curWave;
        setTimeout(function(){_this.playfield.trigger('wave:time_up',_curWave)},(this.level.time*1000));
    },
    endWave: function(wave){
        if(this.curWave == wave && !this.waveEnding){
            var _this = this;
            this.waveEnding = true;
            this.flyAway();
            setTimeout(function(){_this.waveEnding = false;},5000);
        }
    },
    nextLevel : function(){

    },
    releaseDucks : function(){
        var _this = this;

        for(var i=_this.duckMax;i<_this.level.ducks;i++){
            duckClass = (i%2 == 0) ? 'duckA' : 'duckB';
            _this.liveDucks.push(new Duck(_this.duckMax.toString(),duckClass,_this.level.speed,_this.playfield).fly());
            _this.duckMax++;
        }
    },
    killDuck: function(deadDuck){
        this.liveDucks = _(this.liveDucks).reject(function(duck){
            return duck.id === deadDuck.id;
        });
    },
    fireGun : function(){
        this.player.getWeapon().shoot();
    },
    outOfAmmo: function(){
        var _curWave = this.curWave;
        $(".duck").off('click');
        $("#gameField").off('click');
        this.playfield.trigger('wave:end',_curWave);
    },
    flyAway: function(){
        this.liveDucks.map(function(duck){
            duck.escape();
        })
    },
    flashScreen : function(){
        var _this = this;
        var flashTime = 90;
        $(".theFlash").css("display","block");
        setTimeout(function(){
            $('.theFlash').css("display","none");
        },flashTime);
    }
}