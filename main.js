const { app, BrowserWindow, ipcMain, contextBridge } = require("electron");
const path = require("node:path");
const Store = require("electron-store");
const store = new Store();

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 600,
        frame: false,
        resizable: false,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "assets/js/preload.js"),
            devTools: true,
        },
        icon: path.join(__dirname, "assets/images/icon.ico"),
    });
    var alarm = store.get("alarm");
    if (!alarm) {
        store.set("alarm", "1");
        alarm = "1";
    }

    ipcMain.on("close-window", (event) => {
        mainWindow.close();
    });
    ipcMain.on("min-window", (event) => {
        mainWindow.minimize();
    });
    ipcMain.on("music-player", (event) => {
        musicPlayerWindow();
    });
    ipcMain.on("setKey", (event, data) => {
        store.set(data.key, data.value);

        console.log(store.get(data.key));
    });

    mainWindow.loadFile("index.html");
    mainWindow.webContents.on("did-finish-load", () => {
        console.log(alarm);
        mainWindow.webContents.executeJavaScript(
            `document.getElementById('alarm').innerText = '${alarm}';`
        );
    });
};

// app.on("browser-window-created", (e, window) => {
//     window.setMenu(null);
// });

function musicPlayerWindow() {
    musicPlayer = new BrowserWindow({
        width: 400,
        height: 300,
        frame: false,
        resizable: false,
        icon: path.join(__dirname, "assets/images/headphone.png"),
        webPreferences: {
            preload: path.join(__dirname, "assets/js/MP_preload.js"),
            nodeIntegration: true,
            devTools: true,
        },
    });

    musicPlayer.loadFile("music_player.html");

    musicPlayer.on("closed", function () {
        musicPlayer = null;
    });
    ipcMain.on("close-music-window", (event) => {
        musicPlayer.close();
    });
    ipcMain.on("min-music-window", (event) => {
        musicPlayer.minimize();
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
