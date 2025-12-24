import { BrowserWindow, app } from 'electron';
import { join } from 'node:path';
import { existsSync } from 'node:fs';
import { resolveWindowIcon } from '../helpers/window-icon';

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
    icon: resolveWindowIcon(),
    webPreferences: {
      preload: join(__dirname, '../preload.js')
    }
  });

  if (!win.isDestroyed()) {
    if (!app.isPackaged) {
      win.loadURL('http://localhost:4200');
      win.webContents.openDevTools();
    } else {
      win.loadFile(join(__dirname, '../../dist/angular20-electron-starter/browser/index.html'));
    }
  }

  try {
    win.webContents.on('did-fail-load', (_e, code, desc, url) => {
      console.error('[Electron] did-fail-load', { code, desc, url });
    });
    win.webContents.on('render-process-gone', (_e, details) => {
      console.error('[Electron] render gone', details);
    });
  } catch {}

  try {
    win.webContents.on('did-fail-load', (_e, code, desc, url) => {
      console.error('[Electron] did-fail-load', { code, desc, url });
    });
    win.webContents.on('render-process-gone', (_e, details) => {
      console.error('[Electron] render gone', details);
    });
  } catch {}

  return win;
}
