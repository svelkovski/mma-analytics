import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ranking } from './ranking.model';

@Injectable({
  providedIn: 'root',
})
export class RankingsService {
  private httpClient = inject(HttpClient);

  private rankingsSubject = new BehaviorSubject<Ranking[]>([]);

  rankings$ = this.rankingsSubject.asObservable();

  constructor() {
    this.loadRankings();
  }

  private loadRankings() {
    this.httpClient
      .get<Ranking[]>('https://api.octagon-api.com/rankings')
      .subscribe((rankings) => {
        console.log(rankings);
        this.rankingsSubject.next(rankings);
      });
  }
}
