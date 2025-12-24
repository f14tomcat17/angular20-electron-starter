export type ElectronAPI = {
  openWindow(): Promise<void>;
  openFile(): Promise<string | null>;
  onDeeplink(callback: (url: string) => void): void;
  openExternal(url: string): Promise<void>;
}