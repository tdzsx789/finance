const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  readDirectory: (directoryPath) => ipcRenderer.invoke('read-directory', directoryPath),
});