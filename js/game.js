window.baseWidth = 800;
window.baseHeight = 600;
let gameOver = false;
let killCount = 0;
const keys = {};

window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

function updateGame() {
    updatePlayer(keys);
    updateEnemies();
    checkCollisions();
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.scale(canvas.width / baseWidth, canvas.height / baseHeight);

    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);

    for (let b of player.bullets) {
        ctx.drawImage(bulletImage, b.x, b.y, b.width, b.height);
    }

    for (let e of enemies) {
        ctx.drawImage(e.image, e.x, e.y, e.width, e.height);
    }

    ctx.fillStyle = 'white';
    ctx.font = '20px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`Kills: ${killCount}`, 10, 30);

    if (gameOver) {
        ctx.fillStyle = 'white';
        ctx.font = '48px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', baseWidth / 2, baseHeight / 2);

        ctx.font = '24px monospace';
        ctx.fillText(`Kills: ${killCount}`, baseWidth / 2, baseHeight / 2 + 40);

        document.getElementById('playAgainButton').style.display = 'block';
    }

    ctx.restore();
}

function checkCollisions() {
    for (let e of enemies) {
        if (e.x < player.x + player.width &&
            e.x + e.width > player.x &&
            e.y < player.y + player.height &&
            e.y + e.height > player.y) {
            
            gameOver = true;

            const backgroundVideo = document.getElementById('backgroundVideo');
            if (backgroundVideo) {
                backgroundVideo.volume = 0; // Mutar o fundo imediato
            }

            if (gameOverSound) {
                gameOverSound.currentTime = 0;
                gameOverSound.play();
            }

            setTimeout(() => {
                if (backgroundVideo) {
                    backgroundVideo.pause(); // Pausa o vídeo depois de 1 segundo
                }
            }, 1000);
        }

        for (let b of player.bullets) {
            if (b.x < e.x + e.width &&
                b.x + b.width > e.x &&
                b.y < e.y + e.height &&
                b.y + b.height > e.y) {
                e.dead = true;
                b.dead = true;
                killCount++;
                if (explosionSound) {
                    explosionSound.currentTime = 0;
                    explosionSound.play();
                }
            }
        }
    }

    enemies.splice(0, enemies.length, ...enemies.filter(e => !e.dead && e.y < baseHeight + 50));
    player.bullets = player.bullets.filter(b => !b.dead);
}
