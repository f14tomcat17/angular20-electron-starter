import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  openFile: () => ipcRenderer.invoke('open-file'),
  openWindow: () => ipcRenderer.invoke('open-window'),
  showApp: () => ipcRenderer.send('show-app'),
  openExternal: (url: string) => ipcRenderer.invoke('open-external', url),
  onDeeplink: (callback: (url: string) => void) => {
    ipcRenderer.on('deep-link', (_, url: string) => {
      callback(url);
    });
  },
});
