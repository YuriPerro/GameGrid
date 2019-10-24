function Map(modelo) {
    exemplo = {
        cells: [],
        LINES: 32,
        COLUMNS: 32,
        SIZE: 32,
        assets: null
    }
    Object.assign(this, exemplo, modelo);

    for (var c = 0; c < this.COLUMNS; c++) {
        this.cells[c] = [];
        for (var l = 0; l < this.LINES; l++) {
            exemplo.cells[c][l] = { tipo: 0 };
        }
    }
    if (modelo.m) {
        for (var c = 0; c < this.COLUMNS; c++) {
            for (var l = 0; l < this.LINES; l++) {
                this.cells[c][l] = { tipo: modelo.m[l][c] };
            }
        }
    }
}

Map.prototype.desenhar = function (ctx) {
    for (var c = 0; c < this.COLUMNS; c++) {
        for (var l = 0; l < this.LINES; l++) {
            
            ctx.drawImage(
                this.assets.img("chao"),
                32, // Corte na vertical
                96, //Corte na horizontal
                32,
                32,
                c*this.SIZE,
                l*this.SIZE,
                32,
                32,
            );
            if(this.cells[c][l].tipo == 1){
                ctx.drawImage(
                    this.assets.img("chao"),
                    128, // Corte na vertical
                    64, //Corte na horizontal
                    32,
                    32,
                    c*this.SIZE,
                    l*this.SIZE,
                    32,
                    32,
                );
            } 

        }
    }
}