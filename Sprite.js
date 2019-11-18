function Sprite(params = {}) {
    var exemplo = {
        x: 0,    y: 0,
        vx: 0,  vy: 0,
        ax: 0,  ay: 0,
        w: 35,  h: 35,   
        a: 0,
        va: 0,    vm: 0,
        frame: 0,
        props: {},
        cooldown: 0,
        color: "red",
        imune: 0,
        movimento: null,
        scene: null,
        mapa: null,
        assets: null,
        vidas: 100,
        score: 0,
    }
    Object.assign(this, exemplo, params);
}
Sprite.prototype = new Sprite();
Sprite.prototype.constructor = Sprite;

Sprite.prototype.mover = function (dt) {
    this.frame += 12*dt;
    this.moverOrtogonal(dt);
}

Sprite.prototype.desenhar = function (ctx) {

    ctx.save();
    var F = Math.floor(this.frame);
    ctx.translate(this.x, this.y);
    //ctx.fillStyle = this.color;
    //ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
    
    ctx.drawImage(this.assets.img("tela"), -400, -265, 800, 530);
    for( var i=0; i<this.vidas; i++){
        ctx.drawImage(this.assets.img("vida"), -this.w/2-50+(i*20), -this.h/2+170, 20, 15);
    }
    

    if(this.movimento.direita){
        ctx.drawImage(
            this.assets.img("player"),
            (F%4)*47,
            63,
            47,
            66,
            -this.w / 2,
            -this.h/2,
            this.w,
            this.h
        );
    }
    else if(this.movimento.esquerda){
        ctx.drawImage(
            this.assets.img("player"),
            (F%4)*47,
            129,
            47,
            67,
            -this.w / 2,
            -this.h/2,
            this.w,
            this.h
        );
    }     
    else if(this.movimento.cima){
        ctx.drawImage(
            this.assets.img("player"),
            (F%4)*49,
            197,
            49,
            62,
            -this.w / 2,
            -this.h/2,
            this.w,
            this.h
        );
    }     
    else if(this.movimento.baixo){
        ctx.drawImage(
            this.assets.img("player"),
            (F%4)*50,
            0,
            50,
            59,
            -this.w / 2,
            -this.h/2,
            this.w,
            this.h
        );
    } else {
        ctx.drawImage(
            this.assets.img("player"),
            47,
            0,
            50,
            59,
            -this.w / 2,
            -this.h/2,
            this.w,
            this.h
    )};      
    
    ctx.restore();
};


Sprite.prototype.moverCircular = function (dt) {
    this.a = this.a + this.va * dt;

    this.vx = this.vm * Math.cos(this.a);
    this.vy = this.vm * Math.sin(this.a);

    this.x = this.x + this.vx * dt;
    this.y = this.y + this.vy * dt;

    this.cooldown = this.cooldown - dt;
}

Sprite.prototype.moverOrtogonal = function (dt) {
    //this.a = this.a + this.va*dt;

    this.vx = this.vx + this.ax * dt - this.vx * 0.9 * dt;
    this.vy = this.vy + this.ay * dt /*+ 120 * dt*/;


    this.mc = Math.floor(this.x / this.scene.map.SIZE);
    this.ml = Math.floor(this.y / this.scene.map.SIZE);

    this.aplicaRestricoes(dt);
    this.cooldown = this.cooldown - dt;
}
Sprite.prototype.aplicaRestricoes = function (dt) {

    var dnx, dny;
    var dx, dy;
    dx = this.vx * dt;
    dnx = dx;
    dy = this.vy * dt;
    dny = dy;
    
    if (dx > 0 && this.scene.map.cells[this.mc + 1][this.ml].tipo != 0 && this.scene.map.cells[this.mc + 1][this.ml].tipo != 5) {
        dnx = this.scene.map.SIZE * (this.mc + 1) - (this.x + this.w / 2);
        dx = Math.min(dnx, dx);
    }
    if (dx < 0 && this.scene.map.cells[this.mc - 1][this.ml].tipo != 0 && this.scene.map.cells[this.mc + 1][this.ml].tipo != 5) {
        dnx = this.scene.map.SIZE * (this.mc - 1 + 1) - (this.x - this.w / 2);
        dx = Math.max(dnx, dx);
    }
    if (dy > 0 && this.scene.map.cells[this.mc][this.ml + 1].tipo != 0 && this.scene.map.cells[this.mc + 1][this.ml].tipo != 5) {
        dny = this.scene.map.SIZE * (this.ml + 1) - (this.y + this.h / 2);
        dy = Math.min(dny, dy);
    }
    if (dy < 0 && this.scene.map.cells[this.mc][this.ml - 1].tipo != 0 && this.scene.map.cells[this.mc + 1][this.ml].tipo != 5) {
        dny = this.scene.map.SIZE * (this.ml - 1 + 1) - (this.y - this.h / 2);
        dy = Math.max(dny, dy);
    }

    this.vy = dy / dt;
    this.x = (this.x + dx);
    this.y = (this.y + dy);

    var MAXX = this.scene.map.SIZE * this.scene.map.COLUMNS - this.w / 2;
    var MAXY = this.scene.map.SIZE * this.scene.map.LINES - this.h / 2;

    if (this.x > MAXX) this.x = MAXX;
    if (this.y > MAXY) {
        this.y = MAXY;
        this.vy = 0;
    }
    if (this.x - this.w / 2 < 0) this.x = 0 + this.w / 2;
    if (this.y - this.h / 2 < 0) this.y = 0 + this.h / 2;

}

Sprite.prototype.colidiuCom = function (alvo) {
    if ((alvo.x + alvo.w/2 )  < this.x - this.w / 2) return false;
    if ((alvo.x - alvo.w/2 )  > this.x + this.w / 2) return false;
    if ((alvo.y + alvo.h/2 )  < this.y - this.h / 2) return false;
    if ((alvo.y - alvo.h/2 )  > this.y + this.h / 2) return false;

    return true;
}

Sprite.prototype.colidiuComMoeda = function (alvo) {
    if ((alvo.x + alvo.w/2 ) < this.x - this.w / 2) return false;
    if ((alvo.x - alvo.w/2 ) > this.x + this.w / 2) return false;
    if ((alvo.y + alvo.h/2 ) < this.y - this.h / 2) return false;
    if ((alvo.y - alvo.h/2 ) > this.y + this.h / 2) return false;


    return true;
}

Sprite.prototype.colidiuComPortal = function (alvo) {
    if ((alvo.x )  < this.x - this.w / 2) return false;
    if ((alvo.x )  > this.x + this.w / 2) return false;
    if ((alvo.y )  < this.y - this.h / 2) return false;
    if ((alvo.y )  > this.y + this.h / 2) return false;

    return true;
}