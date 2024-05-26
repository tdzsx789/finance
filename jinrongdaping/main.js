const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("path");

require('./websocketServer');
// const isDev = require("electron-is-dev");
// console.log('isDev', isDev)
const mode = process.argv[2];

function createWindow() {
  const win = new BrowserWindow({
    width: 7360,
    height: 7070,
    resizable: false,
    movable: false,
    // fullscreen: true,
    // frame: false,
    // kiosk: true,
  });

  if (mode === "dev") {
    win.loadURL("http://localhost:3000/");
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, "./index.html"), // 修改这里
        protocol: "file:",
        slashes: true,
      })
    );
  }
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
