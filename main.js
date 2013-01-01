$(function() {

    $(document).on("click",'.mute',function(){
        $(".sounds").each(function(index,audio){
             audio.volume=0;
        })

        $('.mute').addClass('unmute').removeClass('mute').html('unmute');
    });

    $(document).on('click','.unmute',function(){
        $(".sounds").each(function(index,audio){
            audio.volume=1;
        })

        $('.unmute').addClass('mute').removeClass('unmute').html('mute');
    });

    $(document).on('click','.tryAgain',function(){
       tryAgain();
    });

    $(document).on('click','.doit',function(){
        makeLevel();
    });

    $(document).ready(function(){
        //mute the sounds for debuging
        $('.mute').trigger('click');
        theGame.loadLevel(levelArray[theGame.currentLevel][0],levelArray[theGame.currentLevel][1],levelArray[theGame.currentLevel][2],levelArray[theGame.currentLevel][3],levelArray[theGame.currentLevel][4],levelArray[theGame.currentLevel][5]);
    });
});

