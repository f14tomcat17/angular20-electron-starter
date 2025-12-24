import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-titlebar',
  styleUrl: './titlebar.component.css',
  template: `
    <header [class.overlay]="overlay()">
      <span>Angular + Electron</span>
    </header>
  `
})
export class TitlebarComponent {
  overlay = signal(false);

  constructor() {
    if ('windowControlsOverlay' in navigator) {
      const wco = navigator.windowControlsOverlay as { visible: boolean } | undefined;
      if (!wco) {
        return;
      }
      this.overlay.set(wco.visible);
    }
  }
}
