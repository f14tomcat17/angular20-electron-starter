import { Component, inject, signal } from '@angular/core';
import { TitlebarComponent } from './shell/titlebar.component';
import { Router, RouterOutlet } from '@angular/router';
import { ElectronAPI } from './common/types';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [CommonModule, RouterOutlet, TitlebarComponent],
})
export class App {
  private readonly router = inject(Router);

  constructor() {
    if ('electron' in window && !!window.electron) {
      (window.electron as ElectronAPI)?.onDeeplink((url) => {
        const path = this.parseDeepLink(url);
        this.router.navigateByUrl(path);
      });
    }
    
  }

  private parseDeepLink(url: string): string {
    // myapp://users/42 → /users/42
    const parsed = new URL(url);
    return parsed.pathname;
  }
}
