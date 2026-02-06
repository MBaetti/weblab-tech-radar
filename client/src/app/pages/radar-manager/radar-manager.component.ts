import { Component } from '@angular/core';
import {email} from 'zod';
import {FromComponent} from '../../features/tech_manager/smart_components/form/form.component';

@Component({
  selector: 'app-radar-manager',
  imports: [
    FromComponent
  ],
  template: `
    <h1>Technologie-Manager</h1>
    <div class="tech-form">
      <h2>Technologie erfassen</h2>
      <p>Hier können neue Technologien erfasst werden.</p>
      <form-component></form-component>
    </div>
    <div class="tech-list">
      <h2>Erfasste Technologien</h2>
      <p>Hier wird die Liste an erfassten Technologien angezeigt.</p>
    </div>
  `,
  styles: ``,
})
export class RadarManagerComponent {

  protected readonly email = email;
}
