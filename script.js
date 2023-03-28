const ball = document.getElementById("ball");
const container = document.querySelector(".container");
let moving = false;

function randomPosition() {
    const windowHeight = window.innerHeight - ball.clientHeight;
    const windowWidth = window.innerWidth - ball.clientWidth;

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

ball.addEventListener("mouseover", () => {
    if (!moving) {
        moving = true;
        moveBall();
    }
});

ball.addEventListener("click", () => {
    moving = false;
    ball.getAnimations().forEach((animation) => animation.cancel());
});
