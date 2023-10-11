// preload.js

// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

document.addEventListener("DOMContentLoaded", () => {
    const changeTheame = function () {
        if (document.body.getAttribute("class") === "dark") {
            document.body.setAttribute("class", "light");
        } else {
            document.body.setAttribute("class", "dark");
        }
    };

    document.querySelector("#chnage_theame").addEventListener("click", () => {
        changeTheame();
    });

    document.querySelector("#if").innerText = "Runned";
});
