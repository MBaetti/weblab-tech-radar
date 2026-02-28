import { Component } from '@angular/core';
import {TechRadarComponent} from '../../features/tech-viewer/tech-radar/component/tech-radar.component';

@Component({
  selector: 'app-radar-viewer',
  imports: [
    TechRadarComponent
  ],
  template: `
    <h1>Technologie-Radar</h1>
    <div class="tech-radar">
      <p>Hier werden publizierte Technologien in Form eines Technologie-Radars dargestellt.</p>
      <tech-radar-component></tech-radar-component>
    </div>
  `,
  styles: ``,
})
export class TechViewerComponent {

}
