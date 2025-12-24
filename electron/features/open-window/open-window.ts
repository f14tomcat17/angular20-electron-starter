import { ipcMain } from 'electron';
import { createSecondaryWindow } from '../../windows/secondary.window';

export function registerOpenWindowHandler() {
  ipcMain.handle('open-window', () => {
    createSecondaryWindow();
  });
}