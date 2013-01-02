/************************************************
 DUCK HUNT JS
 by Matthew Surabian - MattSurabian.com
 A first draft...
 **************************************************/

var duckhunt = {
    level:null,
    playfield: $('#game'),
    curWave:0,
    gameTimers: {
        quackID: null,
        sniffID: null
    },
    init: function(){

    },
    loadLevel: function(level){
        duckhunt.level = level;
    }
}