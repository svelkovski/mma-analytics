import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FightersService } from '../fighters/fighters.service';
import { Fighter } from '../fighters/fighter.model';
import { FormsModule } from '@angular/forms';
import { RadarChartComponent } from '../shared/radar-chart/radar-chart.component';

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [FormsModule, RadarChartComponent],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.css',
})
export class AnalysisComponent implements OnInit {
  private fightersService = inject(FightersService);
  private destroyRef = inject(DestroyRef);

  fighters = signal<Fighter[]>([]);

  firstSelectedFighter = signal<Fighter | null>(null);
  secondSelectedFighter = signal<Fighter | null>(null);

  ngOnInit() {
    const subscription = this.fightersService.fighters$.subscribe((fighters) =>
      this.fighters.set(fighters),
    );

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
