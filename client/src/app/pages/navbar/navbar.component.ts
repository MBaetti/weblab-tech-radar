import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButton,
    RouterLink,
    RouterLinkActive
  ],
  template: `
    <mat-toolbar class="navbar" color="primary">
      <mat-icon>radar</mat-icon>
      <span>Tech Radar</span>

      <span class="spacer"></span>

      <a matButton routerLink="/viewer" routerLinkActive="active-link">Viewer</a>
      <a matButton routerLink="/administration" routerLinkActive="active-link">Administration</a>
    </mat-toolbar>
  `,
  styles: `
    .navbar {
      background-color: var(--mat-sys-surface-container);
    }
  `,
})
export class NavbarComponent {

}
