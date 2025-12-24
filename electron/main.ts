import { app, ipcMain, dialog, BrowserWindow } from 'electron';
import { readFileSync } from 'node:fs';
import { createMainWindow } from './windows/main.window';
import { registerDeepLinks, createTray, registerOpenWindowHandler } from './features';

// Improve Windows integration: ensure a stable AppUserModelID
if (process.platform === 'win32') {
  try {
    app.setAppUserModelId('com.example.angular-electron');
  } catch {}
}

ipcMain.handle('open-file', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile']
  });

  if (result.canceled) return null;

  return readFileSync(result.filePaths[0], 'utf-8');
});

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
});

app.whenReady().then(createWindow);

function createWindow() {
  const mainWindow = createMainWindow();
  createTray(mainWindow);
  registerDeepLinks(mainWindow);
  registerOpenWindowHandler();
}