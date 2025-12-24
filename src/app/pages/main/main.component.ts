import { Component } from '@angular/core';
import { ElectronAPI } from '../../common/types';

@Component({
  selector: 'app-main',
  template: `
      <h1>Angular 20 + Electron</h1>

      <button type="button" (click)="openWindow()">Open Secondary Window</button>

      <button type="button" (click)="openDeepLink()">Open Deep Link to secondary window</button>
  `,
})
export class MainComponent {
  readonly PROTOCOL = 'electronapp';

  openWindow() {
    if ('electron' in window && !!window.electron) {
      (window.electron as ElectronAPI).openWindow();
    }
  }

  openDeepLink() {
    const url = `${this.PROTOCOL}://secondary`;
    if ('electron' in window && !!window.electron) {
      (window.electron as ElectronAPI).openExternal(url);
    }
  }
}