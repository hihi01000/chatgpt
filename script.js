const ball = document.getElementById("ball");
const container = document.querySelector(".container");
const scoreDisplay = document.getElementById("score");
const music = document.getElementById("music"); // 음악 요소를 가져옴
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

ball.addEventListener("click", () => {
    stopBall();
    music.play(); // 공을 클릭할 때 음악 재생
});

ball.addEventListener("touchstart", (e) => {
    e.preventDefault();
    if (!moving) {
        moving = true;
        moveBall();
    } else {
        stopBall();
        music.play(); // 공을 터치할 때 음악 재생
    }
});
