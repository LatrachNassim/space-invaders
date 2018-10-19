const canvas = document.getElementById('invaders');
const context = canvas.getContext('2d');

canvas.width = 480;
canvas.height = 540;


let timer;
let player;
let aliens;
const sounds = {
    invader1: document.getElementById('invader1'),
    invader2: document.getElementById('invader2'),
    invader3: document.getElementById('invader3'),
    invader4: document.getElementById('invader4'),
    invader_killed: document.getElementById('invader_killed'),
    shoot: document.getElementById('shoot'),
    player_death: document.getElementById('player_death')
};
const MODE_PLAYING = 1;
const MODE_GAME_OVER = 2;
const MODE_PLAYER_DEAD = 3;
let game_mode = MODE_PLAYING;





// chargement de l'image du sprite avant de démarrer le jeu
const spritesheet = new Image();
spritesheet.src = 'img/spritesheet.png'
spritesheet.onload = function () { // fonction exécuteée lorsque le navigateur a fini de charger de PNG
    player = createPlayer();
    aliens = createAliens();

    //Demarrage de la boucle continue
    gameloop();
};

function update() {
    switch (game_mode) {
        case MODE_PLAYING:

            animatePlayer(); //Fonction qui gère l'animation du joueur
            animateAliens(); //Fonction qui gère l'animation des aliens
            break;
    }


}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    switch (game_mode) {
        case MODE_PLAYING:
        case MODE_PLAYER_DEAD:
            renderPlayer(); //dessin du joueur
            renderAliens();//dessin des aliens
            break;
        case MODE_GAME_OVER:
            renderGameOver();
            break;
        
    }
    renderUI();//Dessin des les elements de l'interface
}

// Fonction gérant la boucle de jeu
function gameloop() {
    update();
    render();

    timer = window.requestAnimationFrame(gameloop);
}

let go_color = 0;
let go_size = 0;
function renderGameOver() {

    go_color += 30;
    go_size = 24 - (timer % 4);

    context.textAlign = 'center';
    context.fillStyle = 'hsl(' + go_color + ',100%, 50%)';
    context.font = 'normal ' + go_size + 'px "Press Start 2P", cursive';
    context.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);

    context.fillStyle = '#fff';
    context.font = 'normal 16px "Press Start 2P", cursive';
    context.fillText('Press F5', canvas.width / 2, canvas.height / 2 + 30);
}
