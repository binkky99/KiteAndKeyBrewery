import { Component, computed, effect, Signal, signal, WritableSignal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [
    CommonModule,
    MatToolbarModule, 
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  darkModeEnabled: boolean = true;

  darkMode: WritableSignal<boolean> = signal(this.darkModeEnabled);

  constructor() {
    effect(() => {
      const darkMode = this.darkMode();
      document.body.classList.toggle('darkMode', darkMode);
    })
  }

  public applyDarkMode() {
    this.darkModeEnabled = true;
    this.darkMode.set(true);
  }

  public applyLightMode() {
    this.darkModeEnabled = false;
    this.darkMode.set(false);
  }
}
