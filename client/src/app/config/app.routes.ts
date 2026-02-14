import { Routes } from '@angular/router';
import { RadarViewerComponent } from '../pages/radar-viewer/radar-viewer.component';
import { TechAdministrationComponent } from '../pages/tech-administration/tech-administration.component';

export const routes: Routes = [
  { path: 'viewer', component: RadarViewerComponent },
  { path: 'manager', component: TechAdministrationComponent },
  { path: '**', redirectTo: 'viewer' }
];
