import { Tray, Menu, app, nativeImage, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import fs from 'node:fs';
import { isQuitting, setIsQuitting } from '../../state';

let tray: Tray | null = null;

function resolveAsset(file: string) {
  const assetPath = path.join(app.getAppPath(), 'dist-electron', 'assets', file);
  if (fs.existsSync(assetPath)) {
    return assetPath;
  }
  return null;
}

function getTrayIcon() {
  if (process.platform === 'win32') {
    return resolveAsset('tray.ico');
  }
  if (process.platform === 'darwin') {
    return resolveAsset('trayTemplate.png');
  }
  return resolveAsset('tray.png');
}

function registerTrayHandlers(mainWindow: BrowserWindow) {
  app.on('window-all-closed', function () {
    // This will prevent the app from closing when windows close
  });
  mainWindow.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });
  // Minimize-to-tray behavior (cast to avoid strict typing issues)
  (mainWindow as any).on('minimize', () => {
    try { mainWindow.hide(); } catch {}
  });
  // Keep taskbar tidy: hide from taskbar when hidden
  mainWindow.on('hide', () => {
    try { mainWindow.setSkipTaskbar(true); } catch {}
  });
  mainWindow.on('show', () => {
    try { mainWindow.setSkipTaskbar(false); } catch {}
  });
  ipcMain.on('show-app', () => {
    mainWindow.show();
    try { mainWindow.setSkipTaskbar(false); } catch {}
  });
}

export function createTray(mainWindow: BrowserWindow) {
  if (tray) return tray;

  const iconPath = getTrayIcon();
  if (!iconPath) {
    console.error('Tray icon not found');
    return null;
  }
  const icon = nativeImage.createFromPath(iconPath);
  try {
    console.log('[Tray] Using icon path:', iconPath);
    console.log('[Tray] nativeImage empty:', icon.isEmpty());
  } catch {}
  // If icon failed to load (bad path or format), try a simple path string
  tray = icon.isEmpty() ? new Tray(iconPath) : new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Mostrar',
      click: () => {
        if (mainWindow.isMinimized()) {
          mainWindow.restore();
        }
        mainWindow.show();
        try { mainWindow.setSkipTaskbar(false); } catch {}
        mainWindow.focus();
      }
    },
    {
      label: 'Ocultar',
      click: () => {
        mainWindow.hide();
        try { mainWindow.setSkipTaskbar(true); } catch {}
      }
    },
    { type: 'separator' },
    {
      label: 'Salir',
      accelerator: 'CmdOrCtrl+Q',
      click: () => {
        setIsQuitting(true);
        tray?.destroy();
        app.quit();
      }
    }
  ]);
  registerTrayHandlers(mainWindow);
  tray.setToolTip('Angular Electron Pro');
  tray.setContextMenu(contextMenu);
  try {
    console.log('[Tray] Tray created successfully');
  } catch {}

  // Click simple → toggle
  tray.on('click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
      try { mainWindow.setSkipTaskbar(true); } catch {}
    } else {
      mainWindow.show();
      try { mainWindow.setSkipTaskbar(false); } catch {}
    }
  });

  return tray;
}
