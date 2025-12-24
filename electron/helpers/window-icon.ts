import { existsSync } from 'node:fs';
import { app } from 'electron';
import { join } from 'node:path';

export function resolveWindowIcon(): string | undefined {
  const candidates: string[] = [];
  if (process.platform === 'win32') {
    candidates.push(
      // Prefer your app icons during dev
      join(app.getAppPath(), 'public', 'icons', 'icon-256.png'),
      join(app.getAppPath(), 'public', 'icons', 'icon-512.png'),
      // Fallback to bundled assets
      join(app.getAppPath(), 'dist-electron', 'assets', 'tray.ico'),
      join(app.getAppPath(), 'dist-electron', 'assets', 'tray.png')
    );
  } else if (process.platform === 'linux') {
    candidates.push(
      join(app.getAppPath(), 'public', 'icons', 'icon-256.png'),
      join(app.getAppPath(), 'public', 'icons', 'icon-512.png'),
      join(app.getAppPath(), 'dist-electron', 'assets', 'tray.png')
    );
  } else {
    // On macOS, BrowserWindow icon is generally ignored; app bundle icon applies.
    return undefined;
  }
  for (const p of candidates) {
    try { if (existsSync(p)) return p; } catch {}
  }
  return undefined;
}