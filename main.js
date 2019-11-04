var assetsMng = new AssetsManager();
        assetsMng.loadImage("player", "Assets/avatar.png");
        assetsMng.loadImage("explosion", "Assets/explosion.png");
        assetsMng.loadImage("chao", "Assets/chao.png");
        assetsMng.loadImage("enemy1", "Assets/ghost1.png");
        assetsMng.loadImage("enemy2", "Assets/ghost2.png");
        assetsMng.loadImage("chao2", "Assets/chao2.png");
        assetsMng.loadImage("tela", "Assets/tela.png");
        assetsMng.loadImage("ob", "Assets/obisidian.png");
        assetsMng.loadImage("vida", "Assets/vida.png");
        assetsMng.loadImage("borda", "Assets/borda.png");
        assetsMng.loadImage("Perdeu", "Assets/perdeu.png");
        assetsMng.loadImage("Play", "Assets/Play.png");
        assetsMng.loadImage("Start", "Assets/Start.png");
        assetsMng.loadImage("coin", "Assets/coin.png");
        assetsMng.loadImage("tut", "Assets/Tutorial.png");
        assetsMng.loadImage("Venceu", "Assets/Venceu.png");
        assetsMng.loadImage("map", "Assets/map.jpg");

        
        //canvas.style.border="black 5px solid";
        
        var estadoAtual;
        var estados = {
            jogar: 1,
            jogando: 2,
            perdeu: 3, 
            start: 4,
            tut: 5,
            ganhou: 6,
        }

        var teclas = {
            esquerda: 0,
            cima: 0,
            direita: 0,
            baixo: 0,
            espaco: 0
        }

        var mapa = new Map({COLUMNS:30, LINES:21, assets: assetsMng, m:
        [
        [2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,3,3,0,0,0,1,0,0,0,0,0,1,0,0,1,1,2],
        [2,0,0,1,1,1,0,0,0,0,0,0,3,3,3,0,1,1,1,0,0,0,0,0,1,0,0,4,1,2],
        [2,0,1,1,0,1,1,1,0,0,0,0,3,3,0,0,1,0,1,1,0,1,0,0,1,0,0,0,0,2],
        [2,0,1,1,0,0,0,1,1,1,0,0,3,3,0,0,0,0,0,1,0,1,1,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,1,0,0,1,1,0,0,0,0,1,2],
        [2,0,1,1,0,0,1,1,0,0,0,3,3,3,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,2],
        [2,0,0,0,0,0,1,0,0,0,3,3,3,3,1,1,0,0,0,0,1,0,0,0,0,1,1,1,1,2],
        [2,0,0,0,0,0,1,0,0,0,3,3,0,0,0,1,0,0,0,0,1,1,4,0,0,1,0,0,0,2],
        [2,0,1,1,0,1,1,4,0,0,3,3,0,0,0,0,0,0,0,0,1,1,1,0,0,1,0,0,0,2],
        [2,0,0,0,0,0,1,1,1,1,3,3,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,2],
        [2,0,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,2],
        [2,0,0,0,0,0,1,1,0,0,3,3,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,1,1,0,0,0,3,3,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,1,2],
        [2,0,0,0,0,0,1,0,0,0,5,5,0,1,1,1,0,0,0,0,0,1,1,1,1,0,0,0,0,2],
        [2,0,1,1,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,2],
        [2,0,1,4,0,0,0,1,1,0,3,3,0,0,0,0,0,1,0,0,0,0,0,0,1,1,0,0,1,2],
        [2,0,0,0,0,0,0,0,0,0,3,3,3,3,0,0,0,0,0,0,1,0,0,0,4,1,0,0,0,2],
        [2,0,1,1,0,0,1,1,0,0,0,0,0,3,0,0,0,1,1,1,1,0,0,1,1,1,0,0,0,2],
        [2,0,0,0,0,1,1,0,0,0,0,1,0,3,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        ]
        });

        var cena1 = new Scene({ ctx: ctx, w: canvas.width, h: canvas.height, assets: assetsMng, map: mapa });

        var pc = new Sprite({ x: 45, y: 250, w: 20, h: 20, assets: assetsMng, scene: cena1, comportar: porTeclasDirecionais(teclas), props: { tipo: "pc" }});
        var npc = new Enemy({ x: 100+300*Math.random(), y:100+300*Math.random(), w: 32, h:32, a: 7, vm: 100, pc: pc, map: mapa, assets: assetsMng, comportar: persegue( pc ), props: { tipo: "npc" }});
        var portal = new Portal ({ assets: assetsMng });
        
        cena1.adicionar(pc);
        cena1.adicionar(npc);
            cena1.adicionar(new Coin({x: 32*14.5, 
                                     y: 32*13.4, assets: assetsMng, scene: cena1, map: mapa }));
            cena1.adicionar(new Coin({x: 32*2.5, 
                                     y: 32*2.6, assets: assetsMng, scene: cena1, map: mapa }));  
            cena1.adicionar(new Coin({x: 32*12.5, 
                                     y: 32*19.5, assets: assetsMng, scene: cena1, map: mapa }));    
            cena1.adicionar(new Coin({x: 32*28.4, 
                                     y: 32*3.6, assets: assetsMng, scene: cena1, map: mapa }));
            cena1.adicionar(new Coin({x: 32*17.5, 
                                     y: 32*1.6, assets: assetsMng, scene: cena1, map: mapa }));
            cena1.adicionar(new Coin({x: 32*23.5, 
                                     y: 32*15.5, assets: assetsMng, scene: cena1, map: mapa }));
            cena1.adicionar(new Coin({x: 32*28.4, 
                                     y: 32*11.6, assets: assetsMng, scene: cena1, map: mapa }));
        cena1.adicionar(portal);
        
        function persegue(alvo){
            return function(){
                this.vx =  40 * Math.sign(alvo.x - this.x-this.w/2);
                this.vy =  40 * Math.sign(alvo.y - this.y-this.h/2);
            }
        }

        function porTeclasDirecionais(teclas) {
            return function () {
                if (teclas.esquerda) { this.vx = -90; }
                if (teclas.direita) { this.vx = +90; }
                if (teclas.esquerda === teclas.direita) { this.vx = 0; }

                if (teclas.cima) { this.vy = -90; }
                if (teclas.baixo) { this.vy = 90; }
                if (teclas.cima === teclas.baixo) { this.vy = 0; }

                if (teclas.espaco && this.cooldown <= 0){
                    //var explosion = new Explosion({x: this.x+3, y:this.y+3});
                    //this.scene.adicionar(explosion);
                    //this.cooldown = 1;
                }
                
            }
        }
        addEventListener("keydown", function (e) {
            switch (e.keyCode) {
                case 32:
                    teclas.espaco = 1;
                    break;
                case 37:
                    teclas.esquerda = 1;
                    break;
                case 38:
                    teclas.cima = 1;
                    break;
                case 39:
                    teclas.direita = 1;
                    break;
                case 40:
                    teclas.baixo = 1;
                    break;
                case 13:
                    if( estadoAtual == estados.tut){
                        estadoAtual = estados.start;
                    }
                    else if( estadoAtual == estados.start){
                        estadoAtual = estados.jogando
                    }  
                    break;
            }
        });
        addEventListener("keyup", function (e) {
            switch (e.keyCode) {
                case 32:
                    teclas.espaco = 0;
                    break;
                case 37:
                    teclas.esquerda = 0;
                    break;
                case 38:
                    teclas.cima = 0;
                    break;
                case 39:
                    teclas.direita = 0;
                    break;
                case 40:
                    teclas.baixo = 0;
                    break;
            }
        });

        addEventListener("mousedown", function (e){
            if( estadoAtual == estados.perdeu){
                npc.x =  100+300*Math.random(); 
                npc.y = 100+300*Math.random();
                pc.x = 45;
                pc.y = 250;
                pc.vidas = 5;
                pc.score = 0;
                cena1.reseta();
                estadoAtual = estados.start;
            } 
            else if( estadoAtual == estados.jogar){
                estadoAtual = estados.tut;
            } 
            else if( estadoAtual == estados.ganhou){
                    npc.x =  100+300*Math.random(); 
                    npc.y = 100+300*Math.random();
                    pc.x = 45;
                    pc.y = 250;
                    pc.vidas = 5;
                    pc.score = 0;
                    portal.x = 2000;
                    cena1.reseta();
                    estadoAtual = estados.jogar;
            }             
        });

        function passo(t) {
            ctx.clearRect(0,0, canvas.width, canvas.height);
                ctx.save();
                pc.movimento = teclas;
                ctx.scale(1.5, 1.5);
                ctx.translate(canvas.width/(2*1.5)-pc.x, (canvas.height/(2*1.5)-pc.y));
                ctx.clearRect(0,0, canvas.width, canvas.height);
                dt = (t - anterior) / 1000;
                
            if(assetsMng.progresso() === 100 && estadoAtual == estados.jogando){
                cena1.passo(dt, ctx);
            }
            if( pc.vidas == 0){                
                estadoAtual = estados.perdeu;
            }
                
                anterior = t;
                //ctx.fillText(1 / dt, 10, 20);
                requestAnimationFrame(passo);
                ctx.restore();
        if(estadoAtual == estados.jogando){
                ctx.fillStyle = "WHITE";
                ctx.font = "35px bold optima";
                ctx.fillText(pc.score, 431, 44);
                ctx.fillStyle = "WHITE";
                ctx.font = "30px bold optima";
                ctx.fillText("SCORE:", 320, 41);
        } 
            
        if ( estadoAtual == estados.jogar){
            ctx.drawImage(assetsMng.img("Play"), 0, 0, 860, 550);
        } 
        if( estadoAtual == estados.perdeu){
            ctx.drawImage(assetsMng.img("Perdeu"), 0, 0, 860, 550);
        }
        if( estadoAtual == estados.start){
            ctx.drawImage(assetsMng.img("Start"), 0, 0, 860, 550);
        }
        if( estadoAtual == estados.tut){
            ctx.drawImage(assetsMng.img("tut"), 0, 0, 860, 550);
        }
        if( pc.score == 7 && estadoAtual == estados.jogando){
            portal.x = 28.6*32; 
        }
        if(pc.colidiuComPortal( portal ) && estadoAtual == estados.jogando){
            estadoAtual = estados.ganhou;
        }   
        if( estadoAtual == estados.ganhou){
            ctx.drawImage(assetsMng.img("Venceu"), 0, 0, 860, 550);
        }
    }
    
        var dt, anterior = 0;
        estadoAtual = estados.jogar;
        requestAnimationFrame(passo);