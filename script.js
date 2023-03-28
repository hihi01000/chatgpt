const ball = document.getElementById("ball");
const container = document.querySelector(".container");
let moving = false;

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
                duration: 1000,
                fill: "forwards",
            }
        ).onfinish = moveBall;
    }
}

function stopBall() {
    moving = false;
    ball.getAnimations().forEach((animation) => animation.cancel());
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
