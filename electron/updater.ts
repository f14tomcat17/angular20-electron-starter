import { autoUpdater } from 'electron-updater';

export function initUpdater() {
  autoUpdater.checkForUpdatesAndNotify();
}
