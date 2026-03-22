import { Component } from '@angular/core';
import { GeneralStatsComponent } from './general-stats/general-stats.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [GeneralStatsComponent, HeroSectionComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
