const { app, BrowserWindow, globalShortcut } = require("electron");
require('./websocketServer');

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
    webPreferences: {
      webSecurity: false,
      // preload: path.join(__dirname, 'preload.js'),
      // nodeIntegration: true, // Ensure node integration is enabled if needed
      // contextIsolation: false // Ensure context isolation is disabled if needed
    },
  });

  if (mode === "dev") {
    win.loadURL("http://localhost:3000/");
  } else {
    win.loadURL(`file://${__dirname}/index.html`);
    // win.loadURL(
    //   url.format({
    //     pathname: path.join(__dirname, "./index.html"), // 修改这里
    //     protocol: "file:",
    //     slashes: true,
    //   })
    // );
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
