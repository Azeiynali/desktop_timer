document.addEventListener("DOMContentLoaded", () => {
    const clock = document.querySelector(".clock-container");
    const pause = document.querySelector("#pause");
    const reset = document.querySelector("#reset");
    const ok = document.querySelector("#ok");

    clock.style.transform = "scale(.8)";
    reset.style.display = "none";
    pause.style.display = "none";
    ok.style.display = "none";
    
    document.documentElement.style.setProperty("--timer-hours", "'" + 0 + "'");
    document.documentElement.style.setProperty(
        "--timer-minutes",
        "'" + 0 + "'"
    );
    document.documentElement.style.setProperty(
        "--timer-seconds",
        "'" + 0 + "'"
    );
});
