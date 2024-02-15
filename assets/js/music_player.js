let sounds = [
    {
        name: "Inspiring Fresh",
        url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/tKZFcM2lReFtTIntEHkalWqkgiSnilx3jJ299KzK.mp3",
        author: "Becouse Heart",
    },
    {
        name: "Corporation",
        url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/vrSa8rXm0F85n81ZhOtpsrUTeBCHpvmGk7L9ey36.mp3",
        author: "AudioCoffee",
    },
    {
        name: "Ambient Cinematic",
        url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/CCzOH17SYgU3dd4j6zmgUeUORzwY0kAP8FVpHWgV.mp3",
        author: "AudioCoffee Band",
    },
    {
        name: "Pangea's Pulse",
        url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/3AQIEOAsPChyAVU34WHESRWeUaVjtlBEscZFFXdQ.mp3",
        author: "Aldous Ichnite",
    },
    {
        name: "Fidelity Dinosaur",
        url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/LFc8XEvZKOht0BiEscEfXiGwi5thUvJNBZvIKH8i.mp3",
        author: "Aldous Ichnite",
    },
    {
        name: "Starship Anjuna",
        url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/4R1LUONoJevEwm2B2YajqnMM3kwGOdjLk1CYQ0od.mp3",
        author: "Starship Anjuna",
    },
    {
        name: "Where Are You From Remix",
        url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/UFQujVoJfXfZNglg42VXscQboG2MNOlqpJQkUjg9.mp3",
        author: "Justin Tuijl",
    },
    {
        name: "Rise of Reptiles",
        url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/T1CWJ8X4GGyPqHimjLL4CVFc95dVkVOnkAHaqqg3.mp3",
        author: "Aldous Ichnite",
    },
];
let play = document.getElementById("play");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let info = document.getElementById("info");
let title = document.getElementById("title");
let author = document.getElementById("author");
let controlPanel = document.getElementById("control-panel");
let currentMusicNumber = 0;
let currentMusicInfo = sounds[currentMusicNumber];
let currentMusic = new Audio(currentMusicInfo["url"]);

title.innerText = currentMusicInfo['name']
author.innerText = currentMusicInfo['author']
currentMusic.loop = true;

play.addEventListener("click", () => {
    if (controlPanel.classList.contains("active")) {
        currentMusic.pause();
    } else {
        currentMusic.play();
    }
    controlPanel.classList.toggle("active");
    info.classList.toggle("active");
});

prev.addEventListener("click", () => {
    currentMusic.pause();
    controlPanel.classList.remove("active");
    info.classList.remove("active");

    if (currentMusicNumber != 0) {
        currentMusicNumber -= 1;
    } else {
        currentMusicNumber = sounds.length - 1;
    }
    currentMusicInfo = sounds[currentMusicNumber];
    currentMusic = new Audio(currentMusicInfo["url"]);

    title.innerText = currentMusicInfo['name']
    author.innerText = currentMusicInfo['author']
});
next.addEventListener("click", () => {
    currentMusic.pause();
    controlPanel.classList.remove("active");
    info.classList.remove("active");

    if (currentMusicNumber != sounds.length - 1) {
        currentMusicNumber += 1;
    } else {
        currentMusicNumber = 0;
    }
    currentMusicInfo = sounds[currentMusicNumber];
    currentMusic = new Audio(currentMusicInfo["url"]);
    title.innerText = currentMusicInfo['name']
    author.innerText = currentMusicInfo['author']
});

function closeWindow() {
    window.electronBridge.sendToMain("close-music-window");
}
function minWindow() {
    window.electronBridge.sendToMain("min-music-window");
}
