function Scene(params) {
    var exemplo ={
        sprites: [],
        sprites2: [],
        toRemove: [],
        ctx: null,
        w: 850,
        h: 550,
        assets: null,
        map: null
    }
    Object.assign(this, exemplo, params);
}

Scene.prototype = new Scene();
Scene.prototype.constructor = Scene;

Scene.prototype.adicionar = function(sprite){
    this.sprites.push(sprite);
    this.sprites2.push(sprite);
    sprite.scene = this;
};

Scene.prototype.desenhar = function(ctx){
    //ctx = canvas;
    for(var i = 1; i<this.sprites.length; i++){
        this.sprites[i].desenhar(ctx);
    }
    ctx.drawImage(this.assets.img("tela"), this.sprites[0].x-400, this.sprites[0].y-240, 800, 530);
    ctx.drawImage(this.assets.img("tela"), this.sprites[0].x-400, this.sprites[0].y-240, 800, 530);
    this.sprites[0].desenhar(ctx);
    
    for( var i=0; i<this.sprites[0].vidas; i++){
        ctx.drawImage(this.assets.img("vida"), (this.sprites[0].x - 70 )  + (i*20), ( this.sprites[0].y + 160), 20, 15);
    }
};

Scene.prototype.mover = function(dt){
    for(var i = 0; i<this.sprites.length; i++){
        this.sprites[i].mover(dt);
    }  
};

Scene.prototype.comportar = function(){
    for(var i = 0; i<this.sprites.length; i++){
        if(this.sprites[i].comportar){
            this.sprites[i].comportar();
        }
    } 
    this.checaColisao(); 
};

Scene.prototype.reseta = function(){
    for(var i = 0; i < this.sprites2.length; i++){
        this.sprites[i] = this.sprites2[i];
    }
}

Scene.prototype.limpar = function(){
    this.ctx.clearRect(0,0, this.w, this.h);
}

Scene.prototype.checaColisao = function(){
    for(var i = 0; i < this.sprites.length; i++){
        if(this.sprites[i].morto){
            this.toRemove.push(this.sprites[i]);
        }
    if( this.sprites[0].colidiuCom(this.sprites[1]) && this.sprites[0].cooldown <= 0) {
            this.sprites[0].vidas = this.sprites[0].vidas - 1;
            this.assets.inicia("hit", false);
            this.sprites[0].cooldown = 1;
        }
    }
    for( var i=2; i<this.sprites.length; i++){
        if( this.sprites[0].colidiuComMoeda(this.sprites[i]) ){
            this.sprites[0].score = this.sprites[0].score + 1;  
            this.sprites[0].cooldown = 1;
            this.assets.inicia("coin", false);
            this.toRemove.push(this.sprites[i]);
        }
    }
};

Scene.prototype.removeSprites = function () {
    for (var i = 0; i < this.toRemove.length; i++) {
        var idx = this.sprites.indexOf(this.toRemove[i]);
        if(idx >= 0){
            this.sprites.splice(idx, 1);
        }
    }
    this.toRemove = [];
};

Scene.prototype.desenharMapa = function (ctx) {
    this.map.desenhar(this.ctx);
}

Scene.prototype.passo = function(dt, ctx){
    this.limpar();
    this.desenharMapa(ctx);
    this.comportar();
    this.mover(dt);
    this.desenhar(ctx);
    //this.checaColisao();
    this.removeSprites();
}