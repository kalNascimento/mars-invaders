const tittle = document.getElementById('tittle');
const menu = document.getElementById('menu');
const start = document.getElementById('start');
const hpPoints = document.getElementById('hp');
const keyA = document.getElementById('a');
const keyD = document.getElementById('d');
const keySpace = document.getElementById('space');
const board = document.getElementById('board');
const naveRender = document.getElementById('naveRender'); //adicionar animação de morte
const main = document.body;

let enterCount = false;

let nave = {
    id: document.getElementById("nave"),
    top: document.getElementById("nave").offsetTop,
    left: document.getElementById("nave").offsetLeft,
    hp: 3,
    shoot: {
        id: document.getElementById("shoot"),
        top: document.getElementById("nave").offsetTop,
        left: (document.getElementById("nave").offsetLeft + 27),
        ball: false
    }
}

renderingAlien();
board.style.display = 'none';

main.addEventListener('keypress', (event) => {
    const key = event.key;

    if(key){
        MoveNave(key.toLowerCase());
    }

    if(key == 'Enter' && !enterCount){
        enterCount = true;
        startGame();
    }

    if(enterCount && key == " ") {
        AlienShoot(0, 15, 40);
        AlienShoot(0, 15, 60);
    }
    
    setTimeout(() => {
        keySpace.setAttribute("src", "./assets/img/key_space.svg");
    }, 200)
    
});

// Function
function startGame(){
    tittle.style.display = 'none'
    nave.id.style.opacity = '1';
    hpPoints.innerHTML = "HP: " + nave.hp;
    board.style.display = 'flex';
    setTimeout(() => {
        board.style.opacity = '0.5'
    }, 5000)

    for(let i = 1; i <= 16; i++){
        let show  = document.getElementById(`alien${i}`)
        show.style.display = 'block';
    }
}

function sleep(ms) {
    return new Promise(
    resolve => setTimeout(resolve, ms)
    );
    
}

function shootingAction(){ 
    nave.shoot.id.style.display = 'block';
    nave.shoot.id.style.top = `${nave.shoot.top -= 20}px`;
    nave.shoot.ball = true;
}

async function shootingNave() {
    if(nave.shoot.ball == false){
        nave.shoot.id.style.left = `${nave.shoot.left = (nave.left + 27)}px`;
        while(nave.shoot.top >= 0){
            shootingAction();
            explode();
            await sleep(50);
        }
        if(nave.shoot.top <= 0){
            nave.shoot.id.style.display = `none`
            nave.shoot.top = 650;
            nave.shoot.ball = false;
        }
    }
}

function MoveNave(keyPress) {
    if (keyPress == "a" || keyPress == 37) {
        nave.id.style.left = `${nave.left -= 10}px`;
        keyA.setAttribute("src", "./assets/img/key_a_hover.svg");
    } else {
        keyA.setAttribute("src", "./assets/img/key_a.svg");
    }

    if (keyPress == "d" || keyPress == 39) {
        nave.id.style.left = `${nave.left += 10}px`;
        keyD.setAttribute("src", "./assets/img/key_d_hover.svg");
    } else {
        keyD.setAttribute("src", "./assets/img/key_d.svg");
    }

    if(keyPress == ' ' && enterCount){
        shootingNave();
        keySpace.setAttribute("src", "./assets/img/key_space_hover.svg");
    }
}


function DeathNave(alien) {
    if(alien.offsetLeft >= nave.left && alien.offsetLeft <= (nave.left + 60)){
        if(alien.offsetTop >= (nave.top - 10) && alien.offsetTop >= (nave.top + 10)){
            alien.style.display = 'none';
            alien.style.top = '78px'
            nave.hp--;
            hpPoints.innerHTML = "HP: " + nave.hp;
        }
    }
}


function renderingAlien() {
    
    let top = 60;
    let count = 0;
    for(let i = 1; i <= 16; i++){
        count++;
        let left = (48 + (8 * 4)) - (count * 8);

        let renderAlien = `<div class='flex-center'>
                        <img src="./assets/img/alien_shoot.png" id="alien${i}shoot" class="alienshoot">
                        
                        <div id="alien${i}" style="left: ${left}vw; top: ${top}px;"class="alien">
                        <img src="./assets/img/nave_01.png" class="nave-alien">
                        </div>
                    </div>`

        document.write(renderAlien)
        let alien = document.getElementById(`alien${i}shoot`)
        alien.style.left = `${left+2.3}vw`;
        alien.style.top = `${top+8}px`;

        if(i == 8){
            top = 160;
            count = 0;
        }
    }
}

async function AlienShoot(min, max, time) {
    let count = 0;
    while(nave.hp >= 0){
        let random = Math.floor(Math.random() * (max - min) + min);
        while (random < min || random == 0) {
            random = Math.floor(Math.random() * (max - min) + min);
            count++;
            if (count >= 5) {
                break;
            }
        }

        let alien = document.getElementById(`alien${random}shoot`)
        let alien2 = document.getElementById(`alien${random}`)

        while (alien == null || random == 0){
            random = Math.floor(Math.random() * (max - min) + min);
            alien = document.getElementById(`alien${random}shoot`)
            alien2 = document.getElementById(`alien${random}`)
            console.log(random)
            count++;
            if (count >= 10) {
                setTimeout(() => {
                    location = "./youWins.html";
                }, 2000);
                nave.hp = 1;
                break;
            }
        }
        
        while (alien.offsetTop <= 700 && alien2.style.display == 'block'){
            alien.style.display = 'block';
            alien.style.top = `${alien.offsetTop += 20}px`;
            count = 0;
            console.log(nave.hp)
            DeathNave(alien);
            await sleep(time);
        }
        if(alien.offsetTop >= 0){
            alien.style.display = `none`
            alien.style.top = '78px'
        }
        if(nave.hp <= 0 && count < 10){
            nave.id.innerHTML = "";
            setTimeout(() => {
                location = "./youDie.html";
            }, 2000);
        }
    }
}
// TODO: melhor o codigo para a destruição da nave

function explode() {
    for(let i = 1; i <= 16; i++){
        let alien = document.getElementById(`alien${i}`);
        if(nave.shoot.left >= (alien.offsetLeft - 5) && nave.shoot.left <= (alien.offsetLeft + 65)){
            DeathAlien(alien);
        }
    }
}

function DeathAlien(alien){
    if(alien.offsetTop > 60){  
        if(nave.shoot.top > 104 && nave.shoot.top <= 200){
            alien.style.display = 'none';
            nave.shoot.top = -1;
        }
    }else {
        if(nave.shoot.top > 40 && nave.shoot.top <= 104){
            console.log('error')
            alien.style.display = 'none';
            nave.shoot.top = -1;
        }
    }
}