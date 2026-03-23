import { Component } from '@angular/core';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { QuickAccessComponent } from './quick-access/quick-access.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeroSectionComponent, QuickAccessComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
