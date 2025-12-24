import { app } from 'electron';

export function registerProtocol(protocol: string) {
  // Electron lanzado vía `electron .` o npm
  if (process.platform === 'win32' && process.defaultApp) {
    console.warn('[protocol] skip register in windows dev');
    return;
  }

  if (!app.isDefaultProtocolClient(protocol)) {
    app.setAsDefaultProtocolClient(protocol);
  }
}