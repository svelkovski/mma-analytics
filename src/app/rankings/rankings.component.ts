import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RankingsService } from './rankings.service';
import { Ranking } from './ranking.model';
import { FightersService } from '../fighters/fighters.service';
import { Fighter } from '../fighters/fighter.model';
import { NgClass } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-rankings',
  standalone: true,
  imports: [NgClass],
  templateUrl: './rankings.component.html',
  styleUrl: './rankings.component.css',
})
export class RankingsComponent {
  private fightersService = inject(FightersService);
  private rankingsService = inject(RankingsService);

  rankings = toSignal(this.rankingsService.rankings$, { initialValue: [] });
  fighters = toSignal(this.fightersService.fighters$, { initialValue: [] });

  findFighterByName(fighterName: string) {
    return this.fighters().find((f) => f.name === fighterName);
  }
}
