function Portal(params = {}) {
    var exemplo = {
        x: 150,    y: 150,
        w: 25,  h: 32,   
        assets: null,
    }
    Object.assign(this, exemplo, params);
}
Portal.prototype = new Portal();
Portal.prototype.constructor = Portal;

Portal.prototype.mover = function(dt){
    this.frame += 12*dt;

    this.checaColisao();
}

Portal.prototype.desenhar = function (ctx) {

    ctx.save();
        //ctx.fillStyle = this.color;
        //ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.drawImage(
            this.assets.img("chao"),
            64, // Corte na vertical
            96, //Corte na horizontal
            32,
            32,
            16*32,
            19*32,
            32,
            32,
        );
    ctx.restore();
};

Portal.prototype.checaColisao = function(alvo){
    
}



