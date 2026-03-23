import { Component, inject, OnInit, signal } from '@angular/core';
import { Fighter } from './fighter.model';
import { FightersService } from './fighters.service';

@Component({
  selector: 'app-fighters',
  standalone: true,
  imports: [],
  templateUrl: './fighters.component.html',
  styleUrl: './fighters.component.css',
})
export class FightersComponent implements OnInit {
  fighters = signal<Fighter[] | undefined>(undefined);

  private fightersService = inject(FightersService);

  ngOnInit() {
    this.fightersService.fighters$.subscribe((fighters) =>
      this.fighters.set(fighters),
    );
  }
}
