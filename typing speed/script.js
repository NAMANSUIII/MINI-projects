const text = document.getElementById("text").textContent;
const input = document.getElementById("input");
const time = document.getElementById("time");
const wpm = document.getElementById("wpm");
const restart = document.getElementById("restart");

let timer = 30;
let interval;
let started = false;

input.addEventListener("input", () => {
    if (!started) {
        started = true;
        interval = setInterval(countDown, 1000);
    }

    let words = input.value.trim().split(/\s+/).filter(word => word !== "");
    let minutes = (30 - timer) / 60;

    if (minutes > 0) {
        wpm.textContent = Math.round(words.length / minutes);
    }

    if (input.value.trim() === text.trim()) {
        clearInterval(interval);
        input.disabled = true;
        alert("Congratulations! You completed the sentence.");
    }
});

function countDown() {
    timer--;
    time.textContent = timer;

    if (timer === 0) {
        clearInterval(interval);
        input.disabled = true;
        alert("Time's Up!");
    }
}

restart.addEventListener("click", () => {
    clearInterval(interval);
    timer = 30;
    started = false;
    time.textContent = timer;
    wpm.textContent = 0;
    input.value = "";
    input.disabled = false;
});