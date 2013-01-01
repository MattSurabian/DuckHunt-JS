function player(id,name){
    this.id = id;
    this.name = name;
    this.score = 0;
    this.totalKills = 0;
    this.totalMisses = 0;
    this.shotsTaken = 0;
    this.levelStats = [];
}

player.prototype.getScore = function(){
    return addCommas(this.score.toString());
}