const isDev = require("electron-is-dev");

import * as path from "path";

import { app, BrowserWindow } from "electron"; // eslint-disable-line import/no-extraneous-dependencies

function createWindow(): void {
  let mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(
    isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));

  // Open the DevTools.
  //   mainWindow.webContents.openDevTools();
}

app.on("ready", () => {
  createWindow();

  app.on("activate", function checkWindows() {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.allowRendererProcessReuse = true;

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
