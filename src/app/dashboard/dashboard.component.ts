import { Component } from '@angular/core';
import { GeneralStatsComponent } from './general-stats/general-stats.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [GeneralStatsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
