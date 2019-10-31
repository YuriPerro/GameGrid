function Coin(params = {}) {
    var exemplo = {
        x: 150,    y: 150,
        vx: 0,  vy: 0,
        ax: 0,  ay: 0,
        w: 25,  h: 32,   
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
Coin.prototype = new Coin();
Coin.prototype.constructor = Coin;

Coin.prototype.mover = function(dt){
    this.frame += 12*dt;
    //this.aplicaRestricoes(dt);

    this.checaColisao();
}

Coin.prototype.desenhar = function (ctx) {

    ctx.save();
    var F = Math.floor(this.frame);

        //ctx.fillStyle = this.color;
        //ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.drawImage(
            this.scene.assets.img("coin"),
            (F%9)*109,
            0,
            109,
            130,
            this.x,
            this.y,
            this.w,
            this.h 
        );
    ctx.restore();
};

Coin.prototype.checaColisao = function(alvo){
    
}



