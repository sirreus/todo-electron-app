"use strict";
exports.__esModule = true;
var isDev = require("electron-is-dev");
var path = require("path");
var electron_1 = require("electron"); // eslint-disable-line import/no-extraneous-dependencies
function createWindow() {
    var mainWindow = new electron_1.BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadURL(isDev ? "http://localhost:3000" : "file://" + path.join(__dirname, "../build/index.html"));
    mainWindow.on("closed", function () { return (mainWindow = null); });
    // Open the DevTools.
    //   mainWindow.webContents.openDevTools();
}
electron_1.app.on("ready", function () {
    createWindow();
    electron_1.app.on("activate", function checkWindows() {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.allowRendererProcessReuse = true;
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
