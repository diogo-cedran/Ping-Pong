const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddleWidth = 10, paddleHeight = 80;
let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = leftPaddleY;
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 5, ballSpeedY = 3;
let rightPaddleSpeed = 0;
let playerScore = 0, aiScore = 0;

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    rightPaddleY += rightPaddleSpeed;

    if (leftPaddleY + paddleHeight / 2 < ballY) leftPaddleY += 4;
    if (leftPaddleY + paddleHeight / 2 > ballY) leftPaddleY -= 4;

    if (ballY <= 0 || ballY >= canvas.height) ballSpeedY *= -1;

    if (ballX <= 20 && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) ballSpeedX *= -1;
    if (ballX >= canvas.width - 20 && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) ballSpeedX *= -1;

    if (ballX < 0) {
        aiScore++;
        updateScore();
        resetBall();
    }
    if (ballX > canvas.width) {
        playerScore++;
        updateScore();
        resetBall();
    }
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX *= -1;
}

function updateScore() {
    document.getElementById("playerScore").textContent = playerScore;
    document.getElementById("aiScore").textContent = aiScore;
}

function draw() {
    drawRect(0, 0, canvas.width, canvas.height, "black");
    drawRect(5, leftPaddleY, paddleWidth, paddleHeight, "white");
    drawRect(canvas.width - 15, rightPaddleY, paddleWidth, paddleHeight, "white");
    drawCircle(ballX, ballY, 8, "white");
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") rightPaddleSpeed = -5;
    if (event.key === "ArrowDown") rightPaddleSpeed = 5;
});

window.addEventListener("keyup", () => {
    rightPaddleSpeed = 0;
});

gameLoop();
