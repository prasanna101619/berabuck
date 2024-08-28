const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const startButton = document.getElementById('start-button');

let isJumping = false;
let score = 0;
let highScore = 0;
let gameSpeed = 20;
let gameLoop;
let isGameRunning = false;
let isDescending = false;

function jump() {
    if (!isJumping && isGameRunning) {
        isJumping = true;
        let jumpHeight = 0;
        const maxJumpHeight = 100;
        const jumpSpeed = 5;

        const jumpInterval = setInterval(() => {
            if (jumpHeight < maxJumpHeight && !isDescending) {
                jumpHeight += jumpSpeed;
                dino.style.bottom = `${jumpHeight}px`;
            } else {
                isDescending = true;
                jumpHeight -= jumpSpeed;
                dino.style.bottom = `${jumpHeight}px`;

                if (jumpHeight <= 0) {
                    clearInterval(jumpInterval);
                    isJumping = false;
                    isDescending = false;
                    dino.style.bottom = '0px';
                }
            }
        }, 20);
    }
}

function moveCactus() {
    let position = 600;
    cactus.style.left = `${position}px`;
    
    return setInterval(() => {
        if (position < -20) {
            position = 600;
            score++;
            scoreDisplay.textContent = score;
            if (score > highScore) {
                highScore = score;
                highScoreDisplay.textContent = `HI ${highScore}`;
            }
            gameSpeed = Math.max(5, 20 - Math.floor(score / 100));
        } else {
            position -= 5;
        }
        cactus.style.left = `${position}px`;

        checkCollision();
    }, gameSpeed);
}

function checkCollision() {
    const dinoRect = dino.getBoundingClientRect();
    const cactusRect = cactus.getBoundingClientRect();

    if (
        dinoRect.right > cactusRect.left &&
        dinoRect.left < cactusRect.right &&
        dinoRect.bottom > cactusRect.top &&
        dinoRect.top < cactusRect.bottom
    ) {
        endGame();
    }
}

function startGame() {
    if (!isGameRunning) {
        isGameRunning = true;
        score = 0;
        scoreDisplay.textContent = '0';
        startButton.style.display = 'none';
        cactus.style.left = '600px';
        gameLoop = moveCactus();
        addEventListeners();
    }
}

function endGame() {
    isGameRunning = false;
    clearInterval(gameLoop);
    alert(`Game Over! Your score: ${score}`);
    startButton.style.display = 'block';
    removeEventListeners();
}

function handleJumpAction(event) {
    if (isGameRunning) {
        jump();
        event.preventDefault(); // Prevent page scrolling or default touch actions
    }
}

function startGame() {
    if (!isGameRunning) {
        isGameRunning = true;
        score = 0;
        scoreDisplay.textContent = '0';
        startButton.style.display = 'none';
        cactus.style.left = '600px';
        gameLoop = moveCactus();
        addEventListeners();
    }
}

function endGame() {
    isGameRunning = false;
    clearInterval(gameLoop);
    alert(`Game Over! Your score: ${score}`);
    startButton.style.display = 'block';
    removeEventListeners();
}

function addEventListeners() {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleJumpAction);
    document.addEventListener('touchstart', handleJumpAction);
}

function removeEventListeners() {
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('mousedown', handleJumpAction);
    document.removeEventListener('touchstart', handleJumpAction);
}

function handleKeyDown(event) {
    if (event.code === 'Space') {
        handleJumpAction(event);
    }
}

startButton.addEventListener('click', startGame);