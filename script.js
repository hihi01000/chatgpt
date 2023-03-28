const title = document.getElementById("title");
const image = document.getElementById("image");
title.addEventListener("mouseover", () => {
    title.style.fontSize = "3rem";
});

title.addEventListener("mouseout", () => {
    title.style.fontSize = "2rem";
});
image.addEventListener("mouseover", () => {
    image.style.transform = "scale(1.5)";
});

image.addEventListener("mouseout", () => {
    image.style.transform = "scale(1)";
});