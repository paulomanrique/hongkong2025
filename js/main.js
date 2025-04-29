window.onload = function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const splashScreen = document.getElementById('splashScreen');
    const playAgainButton = document.getElementById('playAgainButton');

    window.canvas = canvas;
    window.ctx = ctx;

    function resizeCanvas() {
        const aspectRatio = 4 / 3;
        const windowRatio = window.innerWidth / window.innerHeight;

        if (windowRatio > aspectRatio) {
            canvas.height = window.innerHeight;
            canvas.width = window.innerHeight * aspectRatio;
        } else {
            canvas.width = window.innerWidth;
            canvas.height = window.innerWidth / aspectRatio;
        }

        canvas.style.position = 'fixed';
        canvas.style.top = '50%';
        canvas.style.left = '50%';
        canvas.style.transform = 'translate(-50%, -50%)';
    }

    function setupTouchMove() {
        const canvas = document.getElementById('gameCanvas');

        canvas.addEventListener('touchstart', handleTouchMove);
        canvas.addEventListener('touchmove', handleTouchMove);
    }

    function handleTouchMove(event) {
        event.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const touch = event.touches[0];
        const touchX = (touch.clientX - rect.left) * (baseWidth / canvas.clientWidth);
        const touchY = (touch.clientY - rect.top) * (baseHeight / canvas.clientHeight);

        player.x = touchX - player.width / 2;
        player.y = touchY - player.height / 2;

        player.x = Math.max(0, Math.min(baseWidth - player.width, player.x));
        player.y = Math.max(0, Math.min(baseHeight - player.height, player.y));
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    setupTouchMove();

    splashScreen.addEventListener('click', () => {
        splashScreen.style.display = 'none';
        loadLocalBackground(getRandomVideo());
        playRandomMusic();
        startGame();
    });

    playAgainButton.addEventListener('click', () => {
        playAgainButton.style.display = 'none';
        loadLocalBackground(getRandomVideo());
        resetPlayer();
        resetEnemies();
        killCount = 0;
        gameOver = false;
        gameLoop();
    });

    function startGame() {
        resetPlayer();
        resetEnemies();
        killCount = 0;
        gameOver = false;
        gameLoop();
    }

    function gameLoop() {
        updateGame();
        drawGame();
        if (!gameOver) {
            requestAnimationFrame(gameLoop);
        }
    }

    window.startGame = startGame;
};
