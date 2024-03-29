const start_button = document.querySelector("#start");
const pause = document.querySelector("#pause");
const theme = document.querySelector("#theme");
const ok = document.querySelector("#ok");
const settings_button = document.querySelector("#settings");
const gray = document.querySelector(".gray");
const settings_box = document.querySelector("#settingsBox");
const reset = document.querySelector("#reset");
const clock = document.querySelector(".clock-container");
const hoursAdd = document.querySelector("#HA");
const hoursRemove = document.querySelector("#HR");
const minuteAdd = document.querySelector("#MA");
const minuteRemove = document.querySelector("#MR");
const secondAdd = document.querySelector("#SA");
const secondRemove = document.querySelector("#SR");
const get_var = window.getComputedStyle(document.documentElement);
const music_player_btn = document.querySelector('.music_player')

// * audio
const audio = new Audio("./assets/sounds/tick_tack.mp3");
var alarm = "";

alarm.loop = true;
audio.loop = true;

var paused = false;
var this_alarm = "";
var timer = null;

function closeWindow() {
    window.electronBridge.sendToMain("close-window");
}
function minWindow() {
    window.electronBridge.sendToMain("min-window");
}
function setAlarm(value) {
    window.electronBridge.sendToMain("setKey", { key: "alarm", value: value });
}
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        let alarm_num = document.querySelector("#alarm").innerHTML;
        if (alarm_num) {
            alarm = new Audio("./assets/sounds/alarm_" + alarm_num + ".mp3");
        } else {
            alarm = new Audio("./assets/sounds/alarm_1.mp3");
        }
        el = document.querySelector('div[data-alarm="' + alarm_num + '"]');
        el.classList.add("selected");
    }, 1000);
    music_player_btn.addEventListener('click', () => {
        window.electronBridge.sendToMain("music-player");
    })
    document.querySelectorAll(".alarm_change").forEach(function (element) {
        element.addEventListener("click", (ev) => {
            if (this_alarm != "") {
                this_alarm.pause();
            }
            if (alarm != "") {
                alarm.pause();
            }
            if (
                element.querySelector("img").getAttribute("data-state") == null
            ) {
                element
                    .querySelector("img")
                    .setAttribute("data-state", "pause");
            }
            if (
                element.querySelector("img").getAttribute("data-state") ==
                "pause"
            ) {
                document
                    .querySelector(".selected")
                    .classList.remove("selected");
                element.classList.add("selected");
                alarm_number = element.getAttribute("data-alarm");
                setAlarm(alarm_number);
                alarm = new Audio("./assets/sounds/alarm_" + alarm_number + ".mp3");
                document
                    .querySelectorAll(".alarm_change")
                    .forEach(function (element_2) {
                        element_2.innerHTML = "<img src='./assets/images/play.svg' />";
                    });
                alarm.pause();
                ok.style.display = "none";
                this_alarm = new Audio("./assets/sounds/alarm_" + alarm_number + ".mp3");
                this_alarm.loop = true;
                element.innerHTML = "<img src='./assets/images/pause.svg' />";
                this_alarm.play();
                element.querySelector("img").setAttribute("data-state", "play");
            } else {
                element
                    .querySelector("img")
                    .setAttribute("data-state", "pause");
                element.querySelector("img").src = "./assets/images/play.svg";
                this_alarm.pause();
            }
        });
    });
    document.addEventListener("click", (event) => {
        if (
            !event.target.closest("#settings") &&
            !event.target.closest("#settingsBox") &&
            !event.target.getAttribute("data-state")
        ) {
            settings_box.style.bottom = "";
            gray.style.display = "none";
        }
    });
    settings_button.addEventListener("click", () => {
        settings_box.style.bottom = "20px";
        gray.style.display = "inline-block";
    });
    hoursAdd.addEventListener("click", () => {
        let _ = parseInt(eval(get_var.getPropertyValue("--timer-hours"))) + 1;
        if (_ != -1 && _ != 100) {
            document.documentElement.style.setProperty(
                "--timer-hours",
                "'" + _ + "'"
            );
        } else if (_ == 100) {
            document.documentElement.style.setProperty("--timer-hours", "'0'");
        }
    });
    hoursRemove.addEventListener("click", () => {
        let _ = parseInt(eval(get_var.getPropertyValue("--timer-hours"))) - 1;
        if (_ != -1 && _ != 100) {
            document.documentElement.style.setProperty(
                "--timer-hours",
                "'" + _ + "'"
            );
        } else if (_ == -1) {
            document.documentElement.style.setProperty("--timer-hours", "'99'");
        }
    });
    minuteAdd.addEventListener("click", () => {
        let _ = parseInt(eval(get_var.getPropertyValue("--timer-minutes"))) + 1;
        if (_ != -1 && _ != 60) {
            document.documentElement.style.setProperty(
                "--timer-minutes",
                "'" + _ + "'"
            );
        } else if (_ == 60) {
            document.documentElement.style.setProperty(
                "--timer-minutes",
                "'0'"
            );
        }
    });
    minuteRemove.addEventListener("click", () => {
        let _ = parseInt(eval(get_var.getPropertyValue("--timer-minutes"))) - 1;
        if (_ != -1 && _ != 60) {
            document.documentElement.style.setProperty(
                "--timer-minutes",
                "'" + _ + "'"
            );
        } else if (_ == -1) {
            document.documentElement.style.setProperty(
                "--timer-minutes",
                "'59'"
            );
        }
    });
    secondAdd.addEventListener("click", () => {
        let _ = parseInt(eval(get_var.getPropertyValue("--timer-seconds"))) + 1;
        if (_ != -1 && _ != 60) {
            document.documentElement.style.setProperty(
                "--timer-seconds",
                "'" + _ + "'"
            );
        } else if (_ == 60) {
            document.documentElement.style.setProperty(
                "--timer-seconds",
                "'0'"
            );
        }
    });
    secondRemove.addEventListener("click", () => {
        let _ = parseInt(eval(get_var.getPropertyValue("--timer-seconds"))) - 1;
        if (_ != -1 && _ != 60) {
            document.documentElement.style.setProperty(
                "--timer-seconds",
                "'" + _ + "'"
            );
        } else if (_ == -1) {
            document.documentElement.style.setProperty(
                "--timer-seconds",
                "'59'"
            );
        }
    });
});

const start = function () {
    if (alarm) {
        alarm.pause();
    }
    paused = false;
    let audio_played = false;
    pause.style.display = "inline-block";
    start_button.style.display = "none";
    ok.style.display = "none";
    hoursAdd.style.display = "none";
    hoursRemove.style.display = "none";
    minuteAdd.style.display = "none";
    minuteRemove.style.display = "none";
    secondAdd.style.display = "none";
    secondRemove.style.display = "none";
    clock.style.transform = "";

    let targetTime = new Date();
    targetTime.setHours(
        targetTime.getHours() +
            parseInt(eval(get_var.getPropertyValue("--timer-hours")))
    );
    targetTime.setMinutes(
        targetTime.getMinutes() +
            parseInt(eval(get_var.getPropertyValue("--timer-minutes")))
    );
    targetTime.setSeconds(
        targetTime.getSeconds() +
            parseInt(eval(get_var.getPropertyValue("--timer-seconds"))) +
            1
    );

    timer = setInterval(() => {
        const now = new Date();
        const timeRemaining = Math.max(targetTime - now, 0);

        const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
        const minutes = Math.floor(
            (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        if (!hours && !minutes && seconds <= 10) {
            audio.play();
        }

        document.documentElement.style.setProperty(
            "--timer-hours",
            "'" + hours + "'"
        );
        document.documentElement.style.setProperty(
            "--timer-minutes",
            "'" + minutes + "'"
        );
        document.documentElement.style.setProperty(
            "--timer-seconds",
            "'" + seconds + "'"
        );

        if (!hours && !minutes && !seconds) {
            clearInterval(timer);
            endOfTimer();
        }
    }, 1000);
};

start_button.addEventListener("click", start);
pause.addEventListener("click", () => {
    if (paused) {
        seconds =
            parseInt(eval(get_var.getPropertyValue("--timer-seconds"))) + 1;
        start();
        reset.style.display = "none";
    } else {
        audio_played = false;
        audio.pause();
        clearInterval(timer);
        paused = true;
        reset.style.display = "inline-block";
    }
});

var endOfTimer = function (x = false) {
    audio.pause();
    if (!x) {
        alarm.play();
        ok.style.display = "inline-block";
    }
    document.documentElement.style.setProperty("--timer-hours", "'" + 0 + "'");
    document.documentElement.style.setProperty(
        "--timer-minutes",
        "'" + 0 + "'"
    );
    document.documentElement.style.setProperty(
        "--timer-seconds",
        "'" + 0 + "'"
    );

    paused = false;
    pause.style.display = "none";
    start_button.style.display = "inline-block";
    hoursAdd.style.display = "inline-block";
    hoursRemove.style.display = "inline-block";
    minuteAdd.style.display = "inline-block";
    minuteRemove.style.display = "inline-block";
    secondAdd.style.display = "inline-block";
    secondRemove.style.display = "inline-block";
    clock.style.transform = "scale(.8)";

    reset.style.display = "none";
    pause.style.display = "none";
    start_button.style.display = "inline-block";
};
reset.addEventListener("click", () => {
    endOfTimer(true);
});
ok.addEventListener("click", () => {
    alarm.pause();
    ok.style.display = "none";
});
theme.addEventListener("click", () => {
    if (get_var.getPropertyValue("--main-color") == "black") {
        document.documentElement.style.setProperty("--main-color", "white");
        document.documentElement.style.setProperty("--m-main-color", "black");
        theme.innerHTML = "🌙";
    } else {
        document.documentElement.style.setProperty("--main-color", "black");
        document.documentElement.style.setProperty("--m-main-color", "white");
        theme.innerHTML = "☀️";
    }
});
