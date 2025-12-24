"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const node_path_1 = require("node:path");
const node_fs_1 = require("node:fs");
const secondary_window_1 = require("./windows/secondary.window");
function createWindow() {
    const win = new electron_1.BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: (0, node_path_1.join)(__dirname, 'preload.js')
        }
    });
    if (!electron_1.app.isPackaged) {
        win.loadURL('http://localhost:4200');
        win.webContents.openDevTools();
    }
    else {
        win.loadFile((0, node_path_1.join)(__dirname, '../browser/index.html'));
    }
}
electron_1.ipcMain.handle('open-file', async () => {
    const result = await electron_1.dialog.showOpenDialog({
        properties: ['openFile']
    });
    if (result.canceled)
        return null;
    return (0, node_fs_1.readFileSync)(result.filePaths[0], 'utf-8');
});
electron_1.ipcMain.handle('open-window', () => {
    (0, secondary_window_1.createSecondaryWindow)();
});
electron_1.app.whenReady().then(createWindow);
