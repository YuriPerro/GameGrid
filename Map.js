function Map(modelo) {
    exemplo = {
        cells: [],
        LINES: 32,
        COLUMNS: 32,
        SIZE: 32,
        assets: null,
        moeda: null,
        K: 1,
    }
    Object.assign(this, exemplo, modelo);
    this.criaFase();
}

Map.prototype.criaFase = function(){ 
    this.cells.length = 0;

    for (var c = 0; c < this.COLUMNS; c++) {
        this.cells[c] = [];
        for (var l = 0; l < this.LINES; l++) {
            exemplo.cells[c][l] = { tipo: 0 };
        }
    }
    if (this.m[this.K]) {
        for (var c = 0; c < this.COLUMNS; c++) {
            for (var l = 0; l < this.LINES; l++) {
                this.cells[c][l] = { tipo: this.m[this.K][l][c] };
                }
            }
        }
}

Map.prototype.setFase = function(L){
    this.K = L;
    this.criaFase();
}

Map.prototype.desenhar = function (ctx) {

    for (var c = 0; c < this.COLUMNS; c++) {
        for (var l = 0; l < this.LINES; l++) {
            
            if( this.K == 0){
            ctx.drawImage(
                this.assets.img("chao"),
                160, // Corte na vertical
                32, //Corte na horizontal
                32,
                32,
                c*this.SIZE,
                l*this.SIZE,
                32,
                32,
            )};
            if( this.K == 1){
                ctx.drawImage(
                    this.assets.img("map"),
                    301, // Corte na vertical
                    76, //Corte na horizontal
                    72,
                    72,
                    c*this.SIZE,
                    l*this.SIZE,
                    32,
                    32,
                )};
            if(this.cells[c][l].tipo == 1 && K == 0){
                ctx.drawImage(
                    this.assets.img("ob"),
                    0, // Corte na vertical
                    0, //Corte na horizontal
                    32,
                    32,
                    c*this.SIZE,
                    l*this.SIZE,
                    32,
                    32,
                );
            } 
            if(this.cells[c][l].tipo == 1 && K == 1){
                ctx.drawImage(
                    this.assets.img("ob"),
                    0, // Corte na vertical
                    0, //Corte na horizontal
                    32,
                    32,
                    c*this.SIZE,
                    l*this.SIZE,
                    32,
                    32,
                );
            } 
            if(this.cells[c][l].tipo == 2){
                ctx.drawImage(
                    this.assets.img("map"),
                    0, // Corte na vertical
                    527, //Corte na horizontal
                    75,
                    75,
                    c*this.SIZE,
                    l*this.SIZE,
                    32,
                    32,
                );
            }
            if(this.cells[c][l].tipo == 3){
                ctx.drawImage(
                    this.assets.img("chao2"),
                    297, // Corte na vertical
                    231, //Corte na horizontal
                    32,
                    32,
                    c*this.SIZE,
                    l*this.SIZE,
                    32,
                    32,
                );
            }
            if(this.cells[c][l].tipo == 4){
                ctx.drawImage(
                    this.assets.img("chao"),
                    128, // Corte na vertical
                    32, //Corte na horizontal
                    32,
                    32,
                    c*this.SIZE,
                    l*this.SIZE,
                    32,
                    32,
                );
            }
            if(this.cells[c][l].tipo == 5){
                ctx.drawImage(
                    this.assets.img("chao2"),
                    329, // Corte na vertical
                    33, //Corte na horizontal
                    32,
                    32,
                    c*this.SIZE,
                    l*this.SIZE,
                    32,
                    32,
                );
            }
            if(this.cells[c][l].tipo == 6){
                ctx.drawImage(
                    this.assets.img("map"),
                    0, // Corte na vertical
                    303, //Corte na horizontal
                    75,
                    75,
                    c*this.SIZE,
                    l*this.SIZE,
                    32,
                    32,
                );
            }
            
        }
    }
     
}