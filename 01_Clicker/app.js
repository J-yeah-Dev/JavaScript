let score = 0;
let timeLeft = 30;
let gameInterval;


const target = document.getElementById('target');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const popup = document.getElementById('popup');
const finalScoreText = document.getElementById('finalScoreText');
const retryBtn = document.getElementById('retryBtn');
const highScoreDisplay = document.getElementById('highScore'); // New element tracker

// Load the high score from localStorage when the game starts
// If no high score exists yet, default it to 0
let highScore = localStorage.getItem('clickerHighScore') ? parseInt(localStorage.getItem('clickerHighScore')) : 0;
highScoreDisplay.textContent = highScore;

// Click listener for the ball target
target.addEventListener('click', () => {
    if (timeLeft > 0) {
        score++;
        scoreDisplay.textContent = score;
        
        moveTarget();
    }
});

// Resets game variables and starts a fresh countdown timer loop
function initGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    
    // Hide the overlay popup screen and show the target ball again
    popup.style.display = 'none';
    target.style.display = 'block';
    
    moveTarget();
    startTimer();
}

function startTimer() {
    // Make sure to clear any lingering loop schedules before starting a new one
    clearInterval(gameInterval);
    
    gameInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            endGame();
        }
    }, 1000);
}

function moveTarget() {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 200) + 100;
    target.style.position = 'absolute';
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
}



function endGame() {
    target.style.display = 'none'; // Clear the target area
    
    // Check if the current score is higher than the saved high score
    let isNewRecord = false;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('clickerHighScore', highScore); // Save it permanently
        highScoreDisplay.textContent = highScore; // Update the UI element
        isNewRecord = true;
    }

    // Custom text inside the modal popup based on performance
    if (isNewRecord) {
        finalScoreText.innerHTML = `🏆 <strong>New High Score!</strong><br>You clicked the circle ${score} times!`;
    } else {
        finalScoreText.textContent = `You clicked the circle ${score} times.`;
    }
    
    popup.style.display = 'flex'; // Uses CSS Flexbox to perfectly center our overlay layout box
}

// Wait for the user to explicitly hit Retry rather than self-restarting
retryBtn.addEventListener('click', initGame);

// Kickstart the game when the script engine loads for the very first time
initGame();
