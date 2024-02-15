const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronBridge", {
    sendToMain: (channel, data) => {
        ipcRenderer.send(channel, data);
    },
});