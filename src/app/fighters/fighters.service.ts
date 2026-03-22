import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Fighter } from './fighter.model';

@Injectable({
  providedIn: 'root',
})
export class FightersService {
  private httpClient = inject(HttpClient);

  private fightersSubject = new BehaviorSubject<Fighter[]>([]);

  fighters$ = this.fightersSubject.asObservable();

  constructor() {
    this.loadFighters();
  }

  private loadFighters() {
    this.httpClient
      .get('https://api.octagon-api.com/fighters')
      .subscribe((fightersObj) => {
        const fightersArray: Fighter[] = Object.entries(fightersObj).map(
          ([key, fighter]) => ({
            age: Number(fighter.age),
            category: fighter.category,
            draws: Number(fighter.draws),
            fightingStyle: fighter.fightingStyle,
            height: Number(fighter.height),
            imgUrl: fighter.imgUrl,
            legReach: Number(fighter.legReach),
            losses: Number(fighter.losses),
            name: fighter.name,
            nickname: fighter.nickname,
            octagonDebut: fighter.octagonDebut,
            placeOfBirth: fighter.placeOfBirth,
            reach: Number(fighter.reach),
            status: fighter.status,
            weight: Number(fighter.weight),
            wins: Number(fighter.wins),
          }),
        );
        this.fightersSubject.next(fightersArray);
      });
  }
}
