// Lista de vídeos locais para fundo
const backgroundVideos = [
    'assets/backgrounds/1.mp4' // Por enquanto só 1.mp4
];

// Lista de músicas para tocar separadamente
const musicTracks = [
    'assets/music/track1.mp3' // Só o primeiro por enquanto
];

let currentMusic = null;

// Preload Sprites
window.playerImage = new Image();
playerImage.src = 'assets/sprites/player.png';

window.bulletImage = new Image();
bulletImage.src = 'assets/sprites/bullet.png';

window.enemyImages = [
    'assets/sprites/enemy1.png',
    'assets/sprites/enemy2.png',
    'assets/sprites/enemy3.png',
].map(src => {
    const img = new Image();
    img.src = src;
    return img;
});

// Sons
window.shotSound = new Audio('assets/sounds/shot.mp3');
shotSound.volume = 0.2;

window.explosionSound = new Audio('assets/sounds/explosion.mp3');
explosionSound.volume = 0.3;

window.gameOverSound = new Audio('assets/sounds/gameover.mp3');
gameOverSound.volume = 0.5;

// Funções para fundo de vídeo
function getRandomVideo() {
    return backgroundVideos[Math.floor(Math.random() * backgroundVideos.length)];
}

function loadLocalBackground(videoPath) {
    const videoElement = document.getElementById('backgroundVideo');
    videoElement.src = videoPath;
    videoElement.load();
    videoElement.play();
}

// Funções para música
function playRandomMusic() {
    if (currentMusic) {
        currentMusic.pause();
    }
    const randomTrack = musicTracks[Math.floor(Math.random() * musicTracks.length)];
    currentMusic = new Audio(randomTrack);
    currentMusic.volume = 0.5;
    currentMusic.play();

    currentMusic.addEventListener('ended', () => {
        playRandomMusic(); // Quando terminar, toca outra
    });
}
