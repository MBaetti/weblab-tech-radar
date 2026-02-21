import { Component } from '@angular/core';
import {email} from 'zod';
import {TechFromComponent} from '../../features/tech-manager/tech-form/tech-form.component';
import {TechCardsComponent} from '../../features/tech-manager/tech-cards/tech-cards.component';

@Component({
  selector: 'app-radar-manager',
  imports: [
    TechFromComponent,
    TechCardsComponent
  ],
  template: `
    <div class="tech-administraiton">
      <h1>Technologie-Administration</h1>
      <div class="tech-form">
        <h2>Technologie erfassen</h2>
        <p>Hier können neue Technologien erfasst werden.</p>
        <tech-form-component></tech-form-component>
      </div>
      <div class="tech-cards">
        <h2>Erfasste/publizierte Technologien</h2>
        <p>
          Hier werden erfasste und publizierte Technologien angezeigt.<br>
          Technologien können mit einem Klick auf "Publizieren" und Angaben zum Ring und einem Text zur Einordnung (falls noch nicht vorhanden) publiziert werden.<br>
          Zudem können sie mit einem Klick auf "Löschen" gelöscht werden.
        </p>
        <tech-cards-component></tech-cards-component>
      </div>
    </div>
  `,
  styles: ``,
})
export class TechAdministrationComponent {
  protected readonly email = email;
}
