window.player = {
    x: 400 - 16,
    y: 500,
    width: 32,
    height: 32,
    speed: 10,
    bullets: [],
};

function updatePlayer(keys) {
    if (keys['ArrowLeft'] || keys['a']) player.x -= player.speed;
    if (keys['ArrowRight'] || keys['d']) player.x += player.speed;
    if (keys['ArrowUp'] || keys['w']) player.y -= player.speed;
    if (keys['ArrowDown'] || keys['s']) player.y += player.speed;

    player.x = Math.max(0, Math.min(window.baseWidth - player.width, player.x));
    player.y = Math.max(0, Math.min(window.baseHeight - player.height, player.y));

    if (player.bullets.length === 0 || Date.now() - player.bullets[player.bullets.length - 1].timestamp > 200) {
        player.bullets.push({
            x: player.x + player.width / 2 - 2,
            y: player.y,
            width: 4,
            height: 10,
            speed: 12,
            timestamp: Date.now(),
        });
        if (shotSound) {
            shotSound.currentTime = 0;
            shotSound.play();
        }
    }

    for (let b of player.bullets) {
        b.y -= b.speed;
    }

    player.bullets = player.bullets.filter(b => b.y > -10);
}

function resetPlayer() {
    player.x = 400 - 16;
    player.y = 500;
    player.bullets = [];
}

window.updatePlayer = updatePlayer;
window.resetPlayer = resetPlayer;
