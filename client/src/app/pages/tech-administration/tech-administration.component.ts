import { Component } from '@angular/core';
import {email} from 'zod';
import {TechFromComponent} from '../../features/tech-manager/tech-form/tech-form.component';
import {TechListComponent} from '../../features/tech-manager/tech-list/tech-list.component';

@Component({
  selector: 'app-radar-manager',
  imports: [
    TechFromComponent,
    TechListComponent
  ],
  template: `
    <h1>Technologie-Administration</h1>
    <div class="tech-form">
      <h2>Technologie erfassen</h2>
      <p>Hier können neue Technologien erfasst werden.</p>
      <tech-form-component></tech-form-component>
    </div>
    <div class="tech-list">
      <h2>Erfasste Technologien</h2>
      <p>Hier wird die Liste an erfassten Technologien angezeigt.</p>
      <tech-list-component></tech-list-component>
    </div>
  `,
  styles: ``,
})
export class TechAdministrationComponent {
  protected readonly email = email;
}
