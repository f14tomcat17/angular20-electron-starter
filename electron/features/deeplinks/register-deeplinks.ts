
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { registerProtocol } from './register-protocol';

const PROTOCOL = 'electronapp';

export function registerDeepLinks(mainWindow: BrowserWindow) {
  registerProtocol(PROTOCOL);

  // macOS: eventos especiales
  app.on('open-url', (event, url) => {
    console.log('Deep link URL received:', url);
    event.preventDefault();
    handleDeepLink(mainWindow, url);
  });

  ipcMain.handle('open-external', (_e, url: string) => {
    shell.openExternal(url);
  });

  const gotLock = app.requestSingleInstanceLock();

  if (!gotLock) {
    app.quit();
  } else {
    app.on('second-instance', (_e, argv) => {
      const link = argv.find(a => a.startsWith(`${PROTOCOL}://`));
      if (link) {
        mainWindow.webContents.send('deep-link', link);
        mainWindow.show();
      }
    });
  }

}

function handleDeepLink(mainWindow: BrowserWindow, url: string) {
  if (!mainWindow) return;

  // Enviamos la URL cruda a Angular
  mainWindow.webContents.send('deep-link', url);
}