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

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gravity
    mario.velocityY += mario.gravity;
    mario.y += mario.velocityY;

    // Platform collision
    if (mario.y + mario.height > platform.y) {
        mario.y = platform.y - mario.height;
        mario.jumping = false;
    }

    ctx.fillRect(mario.x, mario.y, mario.width, mario.height);
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);

    requestAnimationFrame(update);
}

document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
        case 37: // left arrow
            mario.x -= mario.speed;
            break;
        case 39: // right arrow
            mario.x += mario.speed;
            break;
        case 32: // spacebar
            if (!mario.jumping) {
                mario.velocityY = mario.jumpStrength;
                mario.jumping = true;
            }
            break;
    }
});

update();
