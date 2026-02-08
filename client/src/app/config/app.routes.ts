import { Routes } from '@angular/router';
import { RadarViewerComponent } from '../pages/radar-viewer/radar-viewer.component';
import { TechManagerComponent } from '../pages/tech-manager/tech-manager.component';

export const routes: Routes = [
  { path: 'viewer', component: RadarViewerComponent },
  { path: 'manager', component: TechManagerComponent },
  { path: '**', redirectTo: 'viewer' }
];
