const { app, BrowserWindow, globalShortcut, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const url = require("url");

function createWindow() {
  const win = new BrowserWindow({
    width: 2340,
    height: 4160,
    resizable: false,
    movable: false,
    fullscreen: true,
    frame: false,
    kiosk: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    },
  });
  // win.loadURL("http://localhost:3000/")
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "./index.html"), // 修改这里
      protocol: "file:",
      slashes: true,
    })
  );
}

app.whenReady().then(() => {
  createWindow();
  app.on("active", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  globalShortcut.register("ESC", function () {
    app.quit();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("read-directory", async (event, directoryPath) => {
  return new Promise((resolve, reject) => {
    const _path = path.join(__dirname, directoryPath);
    fs.readdir(_path, (err, files) => {
      if (err) {
        reject(err);
      } else {
        const _files = files.map((ele) => {
          return path.join(__dirname, `${directoryPath}/${ele}`);
        })
        resolve(_files);
      }
    });
  });
});
