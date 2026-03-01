import { Routes } from '@angular/router';
import { TechViewerComponent } from '../pages/tech-viewer/tech-viewer.component';
import { TechAdministrationComponent } from '../pages/tech-administration/tech-administration.component';

export const routes: Routes = [
  { path: 'viewer', component: TechViewerComponent },
  { path: 'administration', component: TechAdministrationComponent },
  { path: '**', redirectTo: 'viewer' }
];
