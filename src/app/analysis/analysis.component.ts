import { Component, inject, signal } from '@angular/core';
import { FightersService } from '../fighters/fighters.service';
import { Fighter } from '../fighters/fighter.model';
import { FormsModule } from '@angular/forms';
import { RadarChartComponent } from '../shared/radar-chart/radar-chart.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [FormsModule, RadarChartComponent],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.css',
})
export class AnalysisComponent {
  private fightersService = inject(FightersService);

  fighters = toSignal(this.fightersService.fighters$, { initialValue: [] });

  firstSelectedFighter = signal<Fighter | null>(null);
  secondSelectedFighter = signal<Fighter | null>(null);
}
