import { Component } from '@angular/core';
import { TitlebarComponent } from './shell/titlebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [RouterOutlet, TitlebarComponent],
})
export class App {}
