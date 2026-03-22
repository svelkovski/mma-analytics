import { Component } from '@angular/core';
import { GeneralStatsComponent } from './general-stats/general-stats.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { P4pChampionComponent } from './p4p-champion/p4p-champion.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [GeneralStatsComponent, HeroSectionComponent, P4pChampionComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
