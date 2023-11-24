const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const Store = require("electron-store");
const store = new Store();

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 600,
        frame: false,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            devTools: true,
        },
        icon: path.join(__dirname, "icon.ico"),
    });
    ipcMain.on("close-window", (event, arg) => {
        mainWindow.close();
    });

    mainWindow.loadFile("index.html");
};

// app.on("browser-window-created", (e, window) => {
//     window.setMenu(null);
// });

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
