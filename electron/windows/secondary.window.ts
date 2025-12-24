import { BrowserWindow } from 'electron';

export function createSecondaryWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 400
  });

  win.loadURL('http://localhost:4200/secondary');
}
