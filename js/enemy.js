const enemies = [];
let enemySpawnTimer = 0;

function updateEnemies() {
    enemySpawnTimer++;
    if (enemySpawnTimer > 30) {
        enemies.push({
            x: Math.random() * (baseWidth - 30),
            y: -30,
            width: 60,
            height: 60,
            speed: 2 + Math.random() * 2,
            image: enemyImages[Math.floor(Math.random() * enemyImages.length)],
        });
        enemySpawnTimer = 0;
    }

    for (let e of enemies) {
        e.y += e.speed;
    }
}

function resetEnemies() {
    enemies.length = 0;
}
