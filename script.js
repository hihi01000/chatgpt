const ball = document.getElementById("ball");
const container = document.querySelector(".container");
const scoreDisplay = document.getElementById("score");
let moving = false;
let score = 0;

function randomPosition() {
    const windowHeight = window.innerHeight - ball.clientHeight * 2;
    const windowWidth = window.innerWidth - ball.clientWidth * 2;

    const randomY = Math.floor(Math.random() * windowHeight);
    const randomX = Math.floor(Math.random() * windowWidth);

    return { x: randomX, y: randomY };
}

function moveBall() {
    if (moving) {
        const newPosition = randomPosition();
        ball.animate(
            [
                { transform: "rotate(0deg)" },
                { transform: "rotate(360deg)" },
            ],
            {
                duration: 1000,
                iterations: Infinity,
            }
        );

        ball.animate(
            [
                {
                    top: ball.offsetTop + "px",
                    left: ball.offsetLeft + "px",
                },
                {
                    top: newPosition.y + "px",
                    left: newPosition.x + "px",
                },
            ],
            {
                duration: 500, // 움직이는 속도를 2배 높임
                fill: "forwards",
            }
        ).onfinish = moveBall;
    }
}

function stopBall() {
    moving = false;
    ball.getAnimations().forEach((animation) => animation.cancel());
    updateScore();
}

function updateScore() {
    score++;
    scoreDisplay.textContent = score;
}

ball.addEventListener("mouseover", () => {
    if (!moving) {
        moving = true;
        moveBall();
    }
});

ball.addEventListener("click", stopBall); // 마우스 클릭 이벤트 처리

ball.addEventListener("touchstart", (e) => { // 터치 이벤트 처리
    e.preventDefault(); // 기본 터치 동작을 방지
    if (!moving) {
        moving = true;
        moveBall();
    } else {
        stopBall();
    }
});
