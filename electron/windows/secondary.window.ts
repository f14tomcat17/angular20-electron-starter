import { BrowserWindow } from 'electron';
import { resolveWindowIcon } from '../helpers/window-icon';

export function createSecondaryWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 400,
    icon: resolveWindowIcon(),
  });

  win.loadURL('http://localhost:4200/secondary');
}
