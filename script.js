const start_button = document.querySelector("#start");
const pause = document.querySelector("#pause");
const theame = document.querySelector("#theame");
const ok = document.querySelector("#ok");
const reset = document.querySelector("#reset");
const clock = document.querySelector(".clock-container");
const hoursAdd = document.querySelector("#HA");
const hoursRemove = document.querySelector("#HR");
const minuteAdd = document.querySelector("#MA");
const minuteRemove = document.querySelector("#MR");
const secondAdd = document.querySelector("#SA");
const secondRemove = document.querySelector("#SR");
const get_var = window.getComputedStyle(document.documentElement);

// * audio
const audio = new Audio("D:\\Ali\\projects\\clock_app\\tick_tock.mp3");
const alarm = new Audio("D:\\Ali\\projects\\clock_app\\alarm.wav");

var paused = false;
var timer = null;

document.addEventListener("DOMContentLoaded", () => {
    hoursAdd.addEventListener("click", () => {
        let _ = parseInt(eval(get_var.getPropertyValue("--timer-hours"))) + 1;
        if (_ != -1 && _ != 100) {
            document.documentElement.style.setProperty(
                "--timer-hours",
                "'" + _ + "'"
            );
        }
    });
    hoursRemove.addEventListener("click", () => {
        let _ = parseInt(eval(get_var.getPropertyValue("--timer-hours"))) - 1;
        if (_ != -1 && _ != 100) {
            document.documentElement.style.setProperty(
                "--timer-hours",
                "'" + _ + "'"
            );
        }
    });
    minuteAdd.addEventListener("click", () => {
        let _ = parseInt(eval(get_var.getPropertyValue("--timer-minutes"))) + 1;
        if (_ != -1 && _ != 60) {
            document.documentElement.style.setProperty(
                "--timer-minutes",
                "'" + _ + "'"
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
        }
    });
    secondAdd.addEventListener("click", () => {
        let _ = parseInt(eval(get_var.getPropertyValue("--timer-seconds"))) + 1;
        if (_ != -1 && _ != 60) {
            document.documentElement.style.setProperty(
                "--timer-seconds",
                "'" + _ + "'"
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
        }
    });
});

const start = function () {
    alarm.pause();
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

    var hours = parseInt(eval(get_var.getPropertyValue("--timer-hours")));
    var minutes = parseInt(eval(get_var.getPropertyValue("--timer-minutes")));
    var seconds = parseInt(eval(get_var.getPropertyValue("--timer-seconds")));
    timer = setInterval(function () {
        if (hours == 0 && minutes == 0 && seconds < 11 && !audio_played) {
            audio_played = true;
            audio.play();
        }
        if (seconds == 0) {
            if (minutes == 0) {
                if (hours == 0) {
                    clearInterval(timer);
                    endOfTimer();
                } else {
                    hours = hours - 1;
                    minutes = 58;
                    seconds = 60;
                }
            } else {
                minutes = minutes - 1;
                seconds = 60;
            }
        }
        if (seconds == 0 && hours == 0 && minutes == 0) {
            clearInterval(timer);
            endOfTimer();
        } else {
            seconds--;
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
    }, 1000);
};

start_button.addEventListener("click", start);
pause.addEventListener("click", () => {
    if (paused) {
        start();
        reset.style.display = "none";
    } else {
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
theame.addEventListener("click", () => {
    if (get_var.getPropertyValue("--main-color") == "black") {
        document.documentElement.style.setProperty('--main-color', 'white');
        document.documentElement.style.setProperty('--m-main-color', 'black');
        theame.innerHTML = "🌙";
    } else {
        document.documentElement.style.setProperty('--main-color', 'black');
        document.documentElement.style.setProperty('--m-main-color', 'white');
        theame.innerHTML = "☀️";
    }
});
