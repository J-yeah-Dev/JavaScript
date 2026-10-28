
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");
        const scoreDisplay = document.getElementById("score");
        const highScoreDisplay = document.getElementById("highScore");
        const startMessage = document.getElementById("startMessage");
        const popup = document.getElementById("popup");
        const finalScoreText = document.getElementById("finalScoreText");
        const retryBtn = document.getElementById("retryBtn");

        const gridSize = 20;
        const tileCount = canvas.width / gridSize;

        let snake = [
            { x: 10, y: 10 }, // head
            { x: 9, y: 10 },  // body segment 1
            { x: 8, y: 10 }   // body segment 2
        ];
        let food = { x: 5, y: 5 };
        let dx = 0;
        let dy = 0;
        let score = 0;
        let highScore = Number(localStorage.getItem("snakeHighScore")) || 0;
        if (highScoreDisplay) highScoreDisplay.textContent = highScore;
        let gameInterval;
        let gameStarted = false;

        function resetGame() {
            snake = [
                { x: 10, y: 10 },
                { x: 9, y: 10 },
                { x: 8, y: 10 }
            ];
            food = { x: 5, y: 5 };
            dx = 0;
            dy = 0;
            score = 0;
            gameStarted = false;
            scoreDisplay.textContent = score;
            if (startMessage) startMessage.style.display = "block";
            if (popup) popup.style.display = "none";
            spawnFood();
        }

        function endGame() {
            clearInterval(gameInterval);

            let isNewRecord = false;
            if (score > highScore) {
                highScore = score;
                localStorage.setItem("snakeHighScore", highScore);
                if (highScoreDisplay) highScoreDisplay.textContent = highScore;
                isNewRecord = true;
            }

            if (finalScoreText) {
                if (isNewRecord) {
                    finalScoreText.innerHTML = `🏆 <strong>New High Score!</strong><br>Game Over! Final Score: ${score}`;
                } else {
                    finalScoreText.textContent = `Game Over! Final Score: ${score}`;
                }
            }

            if (popup) popup.style.display = "flex";
        }

        // Main game loop running 10 times a second
        function startGame() {
            if (gameStarted) return;
            gameStarted = true;
            if (startMessage) startMessage.style.display = "none";
            clearInterval(gameInterval);
            gameInterval = setInterval(update, 100);
        }

        function update() {
            // 1. Move the snake head
            const head = { x: snake[0].x + dx, y: snake[0].y + dy };

            // 2. Check for wall collisions or eating itself
            if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
                endGame();
                return;
            }

            // Put the new head at the front of the snake
            snake.unshift(head);

            // 3. Check if snake ate the food
            if (head.x === food.x && head.y === food.y) {
                score++;
                scoreDisplay.textContent = score;
                spawnFood();
            } else {
                // Remove the tail if it didn't eat food (keeps the same size)
                snake.pop();
            }

            // 4. Draw everything
            clearCanvas();
            drawFood();
            drawSnake();
        }

        function clearCanvas() {
            ctx.fillStyle = "#111";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        function drawSnake() {
            ctx.fillStyle = "#2ecc71"; // Snake color: Green
            snake.forEach(segment => {
                ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
            });
        }

        function drawFood() {
            ctx.fillStyle = "#e74c3c"; // Food color: Red
            ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
        }

        function spawnFood() {
            food.x = Math.floor(Math.random() * tileCount);
            food.y = Math.floor(Math.random() * tileCount);
            
            // Make sure food doesn't spawn on top of the snake
            if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
                spawnFood();
            }
        }

        // Listen for keyboard input
        window.addEventListener("keydown", e => {
            if (startMessage) startMessage.style.display = "none";

            if (!gameStarted) {
                switch (e.key) {
                    case "ArrowUp": case "w": case "W":
                        dx = 0; dy = -1; break;
                    case "ArrowDown": case "s": case "S":
                        dx = 0; dy = 1; break;
                    case "ArrowLeft": case "a": case "A":
                        dx = 1; dy =0; break;
                    case "ArrowRight": case "d": case "D":
                        dx = 1; dy = 0; break;
                }
                startGame();
                return;
            }

            switch (e.key) {
                case "ArrowUp": case "w": case "W":
                    if (dy === 0) { dx = 0; dy = -1; } break;
                case "ArrowDown": case "s": case "S":
                    if (dy === 0) { dx = 0; dy = 1; } break;
                case "ArrowLeft": case "a": case "A":
                    if (dx === 0) { dx = -1; dy = 0; } break;
                case "ArrowRight": case "d": case "D":
                    if (dx === 0) { dx = 1; dy = 0; } break;
            }
        });

        if (retryBtn) {
            retryBtn.addEventListener("click", () => {
                resetGame();
                clearCanvas();
                drawFood();
                drawSnake();
            });
        }

        // Initialize game state and wait for first key press
        spawnFood();
        clearCanvas();
        drawFood();
        drawSnake();