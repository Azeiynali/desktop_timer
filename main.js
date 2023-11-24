const { app, BrowserWindow, ipcMain, contextBridge } = require("electron");
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
    var alarm = store.get("alarm");
    if (!alarm) {
        store.set("alarm", "1");
        alarm = "1";
    }

    ipcMain.on("close-window", (event) => {
        mainWindow.close();
    });
    ipcMain.on("setKey", (event, data) => {
        store.set(data.key, data.value);

        console.log(store.get(data.key));
    });

    mainWindow.loadFile("index.html");
    mainWindow.webContents.on("did-finish-load", () => {
        mainWindow.webContents.executeJavaScript(
            `document.getElementById('alarm').innerText = '${alarm}';`
        );
    });
};

app.on("browser-window-created", (e, window) => {
    window.setMenu(null);
});

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
