var assetsMng = new AssetsManager();
        assetsMng.loadImage("player", "Assets/img/avatar.png");
        assetsMng.loadImage("player2", "Assets/img/avatar4.png");

        assetsMng.loadImage("explosion", "Assets/img/explosion.png");
        assetsMng.loadImage("chao", "Assets/img/chao.png");
        assetsMng.loadImage("enemy1", "Assets/img/ghost1.png");
        assetsMng.loadImage("enemy2", "Assets/img/ghost2.png");
        assetsMng.loadImage("chao2", "Assets/img/chao2.png");
        assetsMng.loadImage("tela", "Assets/img/tela.png");
        assetsMng.loadImage("ob", "Assets/img/obisidian.png");
        assetsMng.loadImage("vida", "Assets/img/vida.png");
        assetsMng.loadImage("borda", "Assets/img/borda.png");
        assetsMng.loadImage("Perdeu", "Assets/img/perdeu.png");
        assetsMng.loadImage("Play", "Assets/img/Play.png");
        assetsMng.loadImage("Start", "Assets/img/Start.png");
        assetsMng.loadImage("coin", "Assets/img/coin.png");
        assetsMng.loadImage("coin2", "Assets/img/coin2.png");
        assetsMng.loadImage("tut", "Assets/img/Tutorial.png");
        assetsMng.loadImage("Venceu", "Assets/img/Venceu.png");
        assetsMng.loadImage("map", "Assets/img/map.jpg");
        assetsMng.loadImage("fantasma1", "Assets/img/fantasma.png");
        assetsMng.loadImage("exit", "Assets/img/exit.png");
        assetsMng.loadImage("shield", "Assets/img/shield.png");
        assetsMng.loadImage("fase2", "Assets/img/fase2.png");


        assetsMng.loadAudio("BG", "Assets/Sounds/BG.mp3");
        assetsMng.loadAudio("coin", "Assets/Sounds/coin.mp3");
        assetsMng.loadAudio("hit", "Assets/Sounds/Hit.mp3");
        assetsMng.loadAudio("venceu", "Assets/Sounds/Venceu1.mp3");
        assetsMng.loadAudio("click", "Assets/Sounds/click.mp3");

        //canvas.style.border="black 5px solid";
        
        var estadoAtual;
        var estados = {
            jogar: 1,
            jogando: 2,
            perdeu: 3, 
            start: 4,
            tut: 5,
            ganhou: 6,
            nextFase: 7,
        }
        var fase = 0;
        var teclas = {
            esquerda: 0,
            cima: 0,
            direita: 0,
            baixo: 0,
            espaco: 0
        }

        var mapa = new Map({COLUMNS:30, LINES:21, assets: assetsMng, m:
        [
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
        [2,0,1,1,0,0,1,1,0,0,0,0,0,3,0,0,0,0,1,1,1,0,0,1,1,1,0,0,0,2],
        [2,0,0,0,0,1,1,0,0,0,0,1,0,3,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,2],
        [2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
            ],
        
            [
            [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
            [2,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,0,1,2],
            [2,0,0,1,1,1,1,1,0,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,0,0,0,1,2],
            [2,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,2],
            [2,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,6,6,6],
            [2,1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,1,1,1,0,1,1,1,1,1,1,6,6,6,6],
            [2,1,1,0,0,0,0,1,1,1,1,1,0,1,1,0,1,1,1,0,0,1,6,6,6,6,6,6,6,6],
            [2,1,1,0,0,1,1,1,1,0,0,0,0,1,1,0,1,1,1,1,1,1,6,6,6,6,6,1,1,2],
            [2,1,1,0,1,1,1,1,1,0,1,1,0,0,1,0,1,6,6,6,6,6,6,6,6,1,1,1,1,2],
            [2,1,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,6,6,6,6,6,6,1,1,1,1,1,1,2],
            [2,0,0,0,1,1,1,1,1,0,0,0,1,0,0,0,1,1,6,1,1,1,1,1,1,1,1,1,1,2],
            [2,0,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,5,5,5,0,0,0,1,1,0,0,0,1,2],
            [2,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,6,1,1,0,0,1,1,0,1,1,1,2],
            [2,0,1,1,1,1,0,1,1,1,6,6,6,6,6,6,6,6,6,1,1,0,0,0,0,0,1,1,1,2],
            [2,0,1,1,1,1,0,1,1,1,6,6,6,6,6,6,6,6,6,1,1,1,0,0,1,1,1,1,1,2],
            [2,0,1,0,0,0,0,1,1,1,6,6,1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,1,2],
            [2,0,1,0,1,0,1,1,6,6,6,6,1,1,1,1,1,0,0,0,0,0,1,1,1,0,0,0,1,2],
            [2,0,1,0,1,0,1,6,6,6,6,6,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,1,1,2],
            [2,0,1,0,1,0,1,6,1,1,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,2],
            [2,0,0,0,0,0,1,6,1,1,0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,0,1,2],
            [2,2,2,2,2,2,2,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
            ]

        ]
        });

        var cena1 = new Scene({ ctx: ctx, w: canvas.width, h: canvas.height, assets: assetsMng, map: mapa });

        var pc = new Sprite({ x: 48, y: 624, w: 25, h: 25, assets: assetsMng, scene: cena1, comportar: porTeclasDirecionais(teclas), props: { tipo: "pc" }});
        var npc = new Enemy({ x: 100+300*Math.random(), y:100+300*Math.random(), w: 40, h:40, a: 7, vm: 100, pc: pc, map: mapa, assets: assetsMng, comportar: persegue( pc ), props: { tipo: "npc" }});
        var portal = new Portal ({ assets: assetsMng });
        
        cena1.adicionar(pc);
        cena1.adicionar(npc);

        function insereCoin2(){
            cena1.adicionar(new Coin({x: 32*14.5, 
                                     y: 32*13.4, assets: assetsMng, scene: cena1, mapa: mapa }));
            cena1.adicionar(new Coin({x: 32*2.5, 
                                     y: 32*2.6, assets: assetsMng, scene: cena1, mapa: mapa }));  
            cena1.adicionar(new Coin({x: 32*12.5, 
                                     y: 32*19.5, assets: assetsMng, scene: cena1, mapa: mapa }));    
            cena1.adicionar(new Coin({x: 32*28.4, 
                                     y: 32*3.6, assets: assetsMng, scene: cena1, mapa: mapa }));
            cena1.adicionar(new Coin({x: 32*17.5, 
                                     y: 32*1.6, assets: assetsMng, scene: cena1, mapa: mapa }));
            cena1.adicionar(new Coin({x: 32*23.5, 
                                     y: 32*15.5, assets: assetsMng, scene: cena1, mapa: mapa }));
            cena1.adicionar(new Coin({x: 32*28.4, 
                                     y: 32*11.6, assets: assetsMng, scene: cena1, mapa: mapa }));
        }
        
        function insereCoin(){
            console.log("INSERIU !!!!!!!!!!!!!!!!");
            cena1.adicionar(new Coin({x: 32*9.5, 
                                     y: 32*10.5, assets: assetsMng, scene: cena1, mapa: mapa }));
            cena1.adicionar(new Coin({x: 32*4.5, 
                                     y: 32*7.4, assets: assetsMng, scene: cena1, mapa: mapa }));  
            cena1.adicionar(new Coin({x: 32*5.5, 
                                     y: 32*19.5, assets: assetsMng, scene: cena1, mapa: mapa }));    
            cena1.adicionar(new Coin({x: 32*27.5, 
                                     y: 32*1.6, assets: assetsMng, scene: cena1, mapa: mapa }));
            cena1.adicionar(new Coin({x: 32*18.5, 
                                     y: 32*11.5, assets: assetsMng, scene: cena1, mapa: mapa }));
            cena1.adicionar(new Coin({x: 32*10.5, 
                                     y: 32*19.5, assets: assetsMng, scene: cena1, mapa: mapa }));
            cena1.adicionar(new Coin({x: 32*27.5, 
                                     y: 32*11.5, assets: assetsMng, scene: cena1, mapa: mapa }));
        }
        cena1.adicionar(portal);
        
        function persegue(alvo){
            return function(){
                this.vx =  40 * Math.sign(alvo.x - this.x-this.w/2);
                this.vy =  40 * Math.sign(alvo.y - this.y-this.h/2);
            }
        }

        function porTeclasDirecionais(teclas) {
            return function () {
                if (teclas.esquerda) { this.vx = - 100; }
                if (teclas.direita) { this.vx =  100; }
                if (teclas.esquerda === teclas.direita) { this.vx = 0; }

                if (teclas.cima) { this.vy = -100; }
                if (teclas.baixo) { this.vy = 100; }
                if (teclas.cima === teclas.baixo) { this.vy = 0; }
            }
        }

        addEventListener("keydown", function (e) {
            switch (e.keyCode) {
                case 32:
                    teclas.espaco = 1;
                    
                    break;
                case 37:
                    if(pc.escolher > 200)
                        pc.escolher -= 100;
                    
                    teclas.esquerda = 1;
                    break;
                case 38:
                    teclas.cima = 1;
                    break;
                case 39:
                    if(pc.escolher < 600)
                    pc.escolher += 100;

                    teclas.direita = 1;
                    break;
                case 40:
                    teclas.baixo = 1;
                    break;
                case 13:
                    if( estadoAtual == estados.tut){
                        assetsMng.inicia("click", false);
                        estadoAtual = estados.start;
                    }
                    else if( estadoAtual == estados.start){
                        assetsMng.inicia("click", false);
                        pc.setPersonagem();
                        if( this.fase == 0){
                            this.insereCoin2();
                        }
                        estadoAtual = estados.jogando
                    }
                    else if( estadoAtual == estados.nextFase){
                        assetsMng.para("BG");
                        mapa.setFase(fase += 1);
                        assetsMng.inicia("click", false);
                        npc.x =  100+300*Math.random(); 
                        npc.y = 100+300*Math.random();
                        pc.x = 48;
                        pc.y = 48;
                        pc.vidas = 5;
                        pc.score = 0;
                        portal.x = 2000;
                        this.insereCoin();
                        estadoAtual = estados.jogando;
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
                assetsMng.inicia("click", false);
                assetsMng.para("venceu");
                npc.x =  100+300*Math.random(); 
                npc.y = 100+300*Math.random();
                pc.x = 48;
                pc.y = 624;
                pc.vidas = 5;
                pc.score = 0;
                cena1.reseta();
                estadoAtual = estados.start;
            } 
            else if( estadoAtual == estados.jogar){
                assetsMng.inicia("click", false);
                estadoAtual = estados.tut;
            }
            else if( estadoAtual == estados.ganhou){
                assetsMng.inicia("click", false);
                assetsMng.para("venceu");
                npc.x =  100+300*Math.random(); 
                npc.y = 100+300*Math.random();
                pc.x = 48;
                pc.y = 624;
                pc.vidas = 5;
                pc.score = 0;
                this.fase = 0;
                mapa.setFase(fase);
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
                
                anterior = t;
                //ctx.fillText(1 / dt, 10, 20);
                requestAnimationFrame(passo);
                ctx.restore();

        if( estadoAtual == estados.jogando ){
                //assetsMng.inicia("BG", true);
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
            assetsMng.para("BG");
            ctx.drawImage(assetsMng.img("Perdeu"), 0, 0, 860, 550);
        }
        if( estadoAtual == estados.start){
                ctx.drawImage(assetsMng.img("Start"), 0, 0, 860, 550);
                ctx.fillStyle = "red";
                ctx.strokeStyle = "white";
                ctx.strokeRect(pc.escolher, 315, 80, 90);
        }
        if( estadoAtual == estados.tut){
            ctx.drawImage(assetsMng.img("tut"), 0, 0, 860, 550);
        }
        if( pc.score == 7 && estadoAtual == estados.jogando ){
            if(mapa.K == 0)
                portal.x = 18.5*32;
            else{
                portal.y = 32*19.5;
                portal.x = 32*27.5; 
            }
        }
        if(pc.colidiuComPortal( portal ) && estadoAtual == estados.jogando){
            if( mapa.K == 0){
                estadoAtual = estados.nextFase;
            }
            else
            estadoAtual = estados.ganhou;
        }   
        if( estadoAtual == estados.nextFase){
                mapa.setFase(1);
                assetsMng.para("BG");
                ctx.drawImage(assetsMng.img("fase2"), 0, 0, 860, 550);
                //assetsMng.inicia("venceu", false);
        }
        if( estadoAtual == estados.ganhou){
            assetsMng.para("BG");
            ctx.drawImage(assetsMng.img("Venceu"), 0, 0, 860, 550);
            assetsMng.inicia("venceu", false);
        }
    }
    
        var dt, anterior = 0;
        estadoAtual = estados.jogar;
        requestAnimationFrame(passo);
