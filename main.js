const { app, BrowserWindow } = require("electron");
const path = require("node:path");

// SQLite database
const sqlite3 = require("sqlite3").verbose();
const dbPath = path.join(__dirname, "base");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        return console.error("Could not open database", err.message);
    }
});

db.serialize(() => {
    db.each(
        `CREATE TABLE IF NOT EXISTS security (id INTEGER PRIMARY KEY, username TEXT, password TEXT, isLogin INTEGER)`
    );
});

let isLogin = false;

db.serialize(() => {
    db.each(`SELECT * FROM security`, (err, row) => {
        if (err) {
            console.error(err.message);
        }
        if (!row) {
            db.serialize(() => {
                db.run(`INSERT INTO security VALUES("", "", 0)`, (err) => {
                    if (err) {
                        console.error(err.message);
                    } else {
                        isLogin = false;
                    }
                });
            });
        } else {
            isLogin = true;
        }
    });
});

// app

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            devTools: true
        },
        // frame: false,
        icon: path.join(__dirname, "assets", "icon.ico"),
    });
    if (isLogin) {
        mainWindow.loadFile("index.html");
    } else {
        mainWindow.loadFile("login.html");
    }
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
