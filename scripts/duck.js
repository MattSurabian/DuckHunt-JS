function Duck(id, style, speed){

    this.id = id;
    this.class = style;
    this.speed = 0;

    this.setSpeed(speed);

}

Duck.prototype.die = function(){

}

Duck.prototype.hatch = function(){

}

Duck.prototype.fly = function(){

}

Duck.prototype.escape = function(){

}

Duck.prototype.setSpeed = function(duckSpeed){
    switch(duckSpeed){
        case 0:
            this.speed = 1200;
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