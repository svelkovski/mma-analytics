import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RankingsService } from './rankings.service';
import { Ranking } from './ranking.model';
import { FightersService } from '../fighters/fighters.service';
import { Fighter } from '../fighters/fighter.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-rankings',
  standalone: true,
  imports: [NgClass],
  templateUrl: './rankings.component.html',
  styleUrl: './rankings.component.css',
})
export class RankingsComponent implements OnInit {
  private fightersService = inject(FightersService);
  private rankingsService = inject(RankingsService);
  private destroyRef = inject(DestroyRef);

  rankings = signal<Ranking[]>([]);
  fighters = signal<Fighter[]>([]);

  ngOnInit() {
    const subscription = this.rankingsService.rankings$.subscribe(
      (rankings) => {
        this.rankings.set(rankings);
        const subscription = this.fightersService.fighters$.subscribe(
          (fighters) => this.fighters.set(fighters),
        );

        this.destroyRef.onDestroy(() => {
          subscription.unsubscribe();
        });
      },
    );

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  findFighterByName(fighterName: string) {
    return this.fighters().find((f) => f.name === fighterName);
  }
}
