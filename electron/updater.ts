import { BrowserWindow, dialog } from 'electron';
import { autoUpdater } from 'electron-updater';

export function initAutoUpdater(win: BrowserWindow) {
  autoUpdater.autoDownload = true;

  autoUpdater.on('update-available', () => {
    win.webContents.send('update-available');
  });

  autoUpdater.on('update-downloaded', async () => {
    const result = await dialog.showMessageBox(win, {
      type: 'info',
      buttons: ['Reiniciar ahora', 'Más tarde'],
      title: 'Actualización lista',
      message: 'Hay una nueva versión disponible'
    });

    if (result.response === 0) {
      autoUpdater.quitAndInstall();
    }
  });

  autoUpdater.on('error', err => {
    console.error('[autoUpdater]', err);
  });

  autoUpdater.checkForUpdates();
}