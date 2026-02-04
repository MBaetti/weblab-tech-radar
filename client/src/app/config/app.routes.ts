import { Routes } from '@angular/router';
import { RadarViewerComponent } from '../pages/radar-viewer/radar-viewer.component';
import { RadarManagerComponent } from '../pages/radar-manager/radar-manager.component';

export const routes: Routes = [
  { path: 'viewer', component: RadarViewerComponent },
  { path: 'manager', component: RadarManagerComponent },
  { path: '**', redirectTo: 'viewer' }
];
