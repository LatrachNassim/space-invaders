const NB_ALIENS_PER_LINE = 11;
const ALIENS_SPACE_X = 35;
const ALIENS_SPACE_Y = 28;

const aliensMap = [
    40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40,

    20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
    20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,

    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
];



const aliensSprites = {
    '40': [


        { x: 6, y: 3, width: 16, height: 16 },
        { x: 6, y: 25, width: 16, height: 16 }
    ],



    '20': [


        { x: 32, y: 3, width: 22, height: 16 },
        { x: 32, y: 25, width: 22, height: 16 }
    ],



    '10': [

        { x: 60, y: 3, width: 24, height: 16 },
        { x: 60, y: 25, width: 24, height: 16 }
    ],


};
let aliensTimer = 1000; //intervalle de mouvement d'aleins en mille secondes
let lastAlienMovement = 0; // instant 't' du dernier déplacement des aliens
let alienExplosion = []; //tableau qui servira à stocker les sprites d'explosion

function createAliens() {
    const aliens = [];
    for (let i = 0, line = 0; i < aliensMap.length; i++) {
        if (i % NB_ALIENS_PER_LINE === 0) {
            line++;
        }

        let alienWidth = aliensSprites[aliensMap[i]][0].width;
        let alienHeight = aliensSprites[aliensMap[i]][0].height;
        aliens.push({
            x: 12 + i % NB_ALIENS_PER_LINE * ALIENS_SPACE_X + (24 - alienWidth) / 2 | 0,
            y: 100 + line * ALIENS_SPACE_Y,
            width: alienWidth,
            height: alienHeight,
            points: aliensMap[i],
            direction: 1,
            spriteIndex: 1,
        });
    }
    return aliens;

}


function animateAliens() {
    if (Date.now() - lastAlienMovement > aliensTimer) {
        lastAlienMovement = Date.now();

        // Récuperation du x de l'alien le plus à droite( et à gauche)
        let extremeRightAlien = Math.max(...aliens.map(a => a.x)) + ALIENS_SPACE_X;
        let extremeLeftAlien = Math.min(...aliens.map(a => a.x));

        // Parcours du tableau d'aliens pour mise à jour
        for (let i = 0; i < aliens.length; i++) {

            if (extremeRightAlien > canvas.width && aliens[i].direction === 1 ||
                extremeLeftAlien <= 0 && aliens[i].direction === -1) {
                aliens[i].direction *= -1;
                aliens[i].y += 22;
            }
            else {
                aliens[i].x += 12 * aliens[i].direction;

            }
            aliens[i].spriteIndex = (aliens[i].spriteIndex === 0) ? 1 : 0;
            /*if (aliens[i].spriteIndex === 0) {
                aliens[i].spriteIndex = 1;
            } else {
                aliens[i].spriteIndex = 0;
            }*/
        }

    } // Fin du mouvement des aliens
    // Vérification si un aliens ce prend un tir de "player.bullet"
    if (player.bullet !== null) {
        for (let i = 0; i < aliens.length; i++) {
            if (player.bullet.x > aliens[i].x &&
                player.bullet.x <= aliens[i].x + aliens[i].width &&
                player.bullet.y > aliens[i].y &&
                player.bullet.y <= aliens[i].y + aliens[i].height) {
                //Collission
                createExplosion(aliens[i]);
                //augmentation du score du joueur
                player.score += aliens[i].points;
                player.bullet = null;
                //Augmentation de la vtesse générale des aliens
                aliensTimer -= 15;
                if (aliensTimer < 75) {
                    aliensTimer = 75;
                }
                // Suppression de l'alien du tableau
                aliens.splice(i, 1);
                break;


            }
        }
    }
    
    for (let i = 0; i < alienExplosion.length; i++) {
        if (Date.now() - alienExplosion[i].dateCreated > 100) {
            alienExplosion.splice(i, 1);
            i--;
        }
    }
}





function renderAliens() {
    for (let i = 0; i < aliens.length; i++) {

        let points = aliens[i].points;
        let spriteIndex = aliens[i].spriteIndex;
        context.drawImage(
            spritesheet,



            aliensSprites[points][spriteIndex].x,
            aliensSprites[points][spriteIndex].y,
            aliensSprites[points][spriteIndex].width,
            aliensSprites[points][spriteIndex].height,

            aliens[i].x,
            aliens[i].y,
            aliensSprites[points][spriteIndex].width,
            aliensSprites[points][spriteIndex].height
        );
    }



    for (let i = 0; i < alienExplosion.length; i++) {
        context.drawImage(
            spritesheet,
            alienExplosion[i].sprite.x,
            alienExplosion[i].sprite.y,
            alienExplosion[i].sprite.width,
            alienExplosion[i].sprite.height,

            alienExplosion[i].x,
            alienExplosion[i].y,
            alienExplosion[i].sprite.width,
            alienExplosion[i].sprite.height,

        );
    }


}


// fonction qui créée un explosion à partir d'un alien
function createExplosion(alien) {
    alienExplosion.push({
        x: alien.x,
        y: alien.y,
        sprite: {
            x: 88,
            y: 25,
            width: 26,
            height: 16
        },
        dateCreated: Date.now()

    });
}