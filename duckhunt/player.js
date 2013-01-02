function Player(id,name){
    this.id = id;
    this.name = name;
    this.score = 0;
    this.totalKills = 0;
    this.totalMisses = 0;
    this.shotsTaken = 0;
    this.levelStats = [];
}

Player.prototype.getScore = function(){
    return addCommas(this.score.toString());
}

Player.prototype.updateScore = function(delta){
    this.score+=delta;
    $("#scoreboard").html(Player.getScore());
}