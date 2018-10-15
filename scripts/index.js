const canvas = document.getElementById('invaders');
const context = canvas.getContext('2d');

canvas.width = 480;
canvas.height = 540;


let timer;
let player;

// chargement de l'image du sprite avant de démarrer le jeu
const spritesheet = new Image();
spritesheet.src = '../img/spritesheet.png'
spritesheet.onload = function(){ // fonction exécuteée lorsque le navigateur a fini de charger de PNG
player = createPlayer();

//Demarrage de la boucle continue
gameloop();
};

function update() {
    animatePlayer(); //Fonction qui gère l'animation du joueur
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    renderPlayer(); //dessin du joueur

}

// Fonction gérant la boucle de jeu
function gameloop() {
    update();
    render();
    
    timer = window.requestAnimationFrame(gameloop);
}