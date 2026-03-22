import { Component, inject, signal } from '@angular/core';
import { RankingsService } from '../../fighters/rankings/rankings.service';
import { FightersService } from '../../fighters/fighters.service';
import { Fighter } from '../../fighters/fighter.model';
import { calculateWinRate } from '../general-stats/general-stats.component';

@Component({
  selector: 'app-p4p-champion',
  standalone: true,
  imports: [],
  templateUrl: './p4p-champion.component.html',
  styleUrl: './p4p-champion.component.css',
})
export class P4pChampionComponent {
  private rankingsService = inject(RankingsService);
  private fightersService = inject(FightersService);

  champion = signal<Fighter | undefined>(undefined);

  ngOnInit() {
    this.rankingsService.rankings$.subscribe((rankings) => {
      const rankingsChampion = rankings.find(
        (ranking) => ranking.categoryName === "Men's Pound-for-Pound Top Rank",
      )?.champion;

      this.fightersService.fighters$.subscribe((fighters) => {
        const p4pChampion = fighters.find(
          (fighter) => fighter.name === rankingsChampion?.championName,
        );
        this.champion.set(p4pChampion);
      });
    });
  }

  championWinRate() {
    calculateWinRate(this.champion());
  }
}
