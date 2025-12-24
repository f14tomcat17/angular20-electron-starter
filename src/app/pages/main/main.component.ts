import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  template: `
      <h1>Angular 20 + Electron</h1>

      <button type="button" (click)="openWindow()">Open Secondary Window</button>
      
  `,
})
export class MainComponent {
  openWindow() {
    if ('electron' in window && !!window.electron && typeof window.electron === 'object' && 'openWindow' in window.electron && typeof window.electron.openWindow === 'function') {
      window.electron?.openWindow();
    }
  }
}