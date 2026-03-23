import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FightersComponent } from './fighters/fighters.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: DashboardComponent,
  },
  {
    path: 'fighters',
    component: FightersComponent,
  },
];
