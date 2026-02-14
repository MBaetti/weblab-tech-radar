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
    <mat-toolbar color="primary" class="navbar">
      <mat-icon>radar</mat-icon>
      <span>Tech Radar</span>

      <span class="spacer"></span>

      <a mat-button routerLink="/viewer" routerLinkActive="active-link">Viewer</a>
      <a mat-button routerLink="/manager" routerLinkActive="active-link">Administration</a>
    </mat-toolbar>
  `,
  styles: ``,
})
export class NavbarComponent {

}
