import { BrowserWindow } from 'electron';
import { join } from 'node:path';

export function createMainWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#0f172a',
      symbolColor: '#ffffff',
      height: 32
    },
    webPreferences: {
      preload: join(__dirname, '../preload.js')
    }
  });

  if (!win.isDestroyed()) {
    if (!process.env.ELECTRON_BUILD) {
      win.loadURL('http://localhost:4200');
      win.webContents.openDevTools();
    } else {
      win.loadFile(join(__dirname, '../../dist/browser/index.html'));
    }
  }

  return win;
}
