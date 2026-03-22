import { Component, inject, signal } from '@angular/core';
import { FightersService } from '../../fighters/fighters.service';
import { Fighter } from '../../fighters/fighter.model';

@Component({
  selector: 'app-general-stats',
  standalone: true,
  imports: [],
  templateUrl: './general-stats.component.html',
  styleUrl: './general-stats.component.css',
})
export class GeneralStatsComponent {
  private fightersService = inject(FightersService);

  private fighters = signal<Fighter[]>([]);

  ngOnInit() {
    this.fightersService.fighters$.subscribe((fighters) => {
      this.fighters.set(fighters);
    });
  }

  activeFighters() {
    return this.fighters().length;
  }

  dominantFighter() {
    const sorted = this.sortByWinRate();

    const dominantFighter = sorted.at(0)!;

    const winRate = calculateWinRate(dominantFighter);

    return { ...dominantFighter, winRate };
  }

  mostWinsFighter() {
    const sorted = this.sortByWins();
    return sorted.at(0);
  }

  private sortByWinRate() {
    return [...this.fighters()].sort((a, b) => {
      const winRateA = calculateWinRate(a);
      const winRateB = calculateWinRate(b);
      return winRateB - winRateA;
    });
  }

  private sortByWins() {
    return [...this.fighters()].sort((a, b) => {
      return a.wins - b.wins;
    });
  }
}

export function calculateWinRate(dominantFighter?: Fighter) {
    if (!dominantFighter) {
      return 0;
    }
    return (
      ((2 * dominantFighter.wins + dominantFighter.draws) /
        (2 *
          (dominantFighter.wins +
            dominantFighter.draws +
            dominantFighter.losses))) *
      100
    );
  }
