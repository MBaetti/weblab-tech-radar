import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  imports: [MatToolbarModule],
  template: `
    <mat-toolbar class="footer">
      <span>© 2026 Tech Radar</span>
      <span class="spacer"></span>
      <span>By Maurice Bättig</span>
    </mat-toolbar>
  `,
  styles: `
    .footer {
      background-color: var(--mat-sys-surface-container);
      font-size: medium;
    }

    .spacer {
      flex: 1 1 auto;
    }`,
})
export class FooterComponent {

}
