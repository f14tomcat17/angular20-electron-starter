import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { join } from 'node:path';
import { readFileSync } from 'node:fs';
import { createSecondaryWindow } from './windows/secondary.window';

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: join(__dirname, 'preload.js')
    }
  });

  if (!app.isPackaged) {
    win.loadURL('http://localhost:4200');
    win.webContents.openDevTools();
  } else {
    win.loadFile(
      join(__dirname, '../browser/index.html')
    );
  }
}

ipcMain.handle('open-file', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile']
  });

  if (result.canceled) return null;

  return readFileSync(result.filePaths[0], 'utf-8');
});

ipcMain.handle('open-window', () => {
  createSecondaryWindow();
});

app.whenReady().then(createWindow);
