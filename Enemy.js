function Enemy(params = {}) {
    var exemplo = {
        x: 0,    y: 0,
        vx: 0,  vy: 0,
        ax: 0,  ay: 0,
        w: 100,  h: 100,   
        a: 0,
        va: 0,    vm: 0,
        frame: 0,
        props: {},
        cooldown: 0,
        color: "red",
        pc: null,
        movimento: null,
        scene: null,
        mapa: null,
        assets: null,
    }
    Object.assign(this, exemplo, params);
}
Enemy.prototype = new Enemy();
Enemy.prototype.constructor = Enemy;

Enemy.prototype.mover = function(dt){
    this.x = this.x + this.vx * dt;
    this.y = this.y + this.vy * dt;

    this.vx = this.vm * Math.cos(this.a);
    this.vy = this.vm * Math.sin(this.a);

    //this.aplicaRestricoes(dt);

}

Enemy.prototype.desenhar = function (ctx) {

    ctx.save();
    var F = Math.floor(this.frame);

        //ctx.fillStyle = this.color;
        //ctx.fillRect(this.x, this.y, this.w, this.h);
       
    if(this.pc.x < this.x){
        ctx.drawImage(
            this.assets.img("enemy2"),
            this.x,
            this.y,
            35,
            32
        );
    }
    else if(this.pc.x >= this.x + this.w ){
        ctx.drawImage(
            this.assets.img("enemy1"),
            this.x,
            this.y,
            35,
            32
        );
    }
    ctx.restore();
};



