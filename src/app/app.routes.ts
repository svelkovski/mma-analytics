import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FightersComponent } from './fighters/fighters.component';
import { RankingsComponent } from './rankings/rankings.component';
import { AnalysisComponent } from './analysis/analysis.component';

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
  {
    path: 'rankings',
    component: RankingsComponent,
  },
  {
    path: 'analysis',
    component: AnalysisComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
