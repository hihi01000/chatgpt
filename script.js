const ball = document.getElementById("ball");
let bouncing = false;

function randomPosition() {
    const windowHeight = window.innerHeight - ball.clientHeight;
    const windowWidth = window.innerWidth - ball.clientWidth;

    const randomY = Math.floor(Math.random() * windowHeight);
    const randomX = Math.floor(Math.random() * windowWidth);

    ball.style.top = `${randomY}px`;
    ball.style.left = `${randomX}px`;
}

function bounce() {
    if (bouncing) {
        randomPosition();
        setTimeout(bounce, 500);
    }
}

ball.addEventListener("mouseover", () => {
    if (!bouncing) {
        bouncing = true;
        bounce();
    }
});

ball.addEventListener("click", () => {
    bouncing = false;
});