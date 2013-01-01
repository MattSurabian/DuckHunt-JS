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

});