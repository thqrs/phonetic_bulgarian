const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const mario = {
    x: canvas.width / 2,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    speed: 5,
    jumpStrength: -10,
    velocityY: 0,
    gravity: 0.5,
    jumping: false
};

const platform = {
    x: 0,
    y: canvas.height - 40,
    width: canvas.width,
    height: 40
};

let movingLeft = false;
let movingRight = false;

document.getElementById('left').addEventListener('touchstart', function() {
    movingLeft = true;
});

document.getElementById('left').addEventListener('touchend', function() {
    movingLeft = false;
});

document.getElementById('right').addEventListener('touchstart', function() {
    movingRight = true;
});

document.getElementById('right').addEventListener('touchend', function() {
    movingRight = false;
});

document.getElementById('jump').addEventListener('touchstart', function() {
    if (!mario.jumping) {
        mario.velocityY = mario.jumpStrength;
        mario.jumping = true;
    }
});

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (movingLeft) {
        mario.x -= mario.speed;
    }
    if (movingRight) {
        mario.x += mario.speed;
    }

    mario.velocityY += mario.gravity;
    mario.y += mario.velocityY;

    if (mario.y + mario.height > platform.y) {
        mario.y = platform.y - mario.height;
        mario.jumping = false;
    }

    ctx.fillRect(mario.x, mario.y, mario.width, mario.height);
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);

    requestAnimationFrame(update);
}

update();
