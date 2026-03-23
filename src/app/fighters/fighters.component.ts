import { Component, inject, OnInit, signal } from '@angular/core';
import { Fighter } from './fighter.model';
import { FightersService } from './fighters.service';
import { FighterDetailsComponent } from './fighter-details/fighter-details.component';

@Component({
  selector: 'app-fighters',
  standalone: true,
  imports: [FighterDetailsComponent],
  templateUrl: './fighters.component.html',
  styleUrl: './fighters.component.css',
})
export class FightersComponent implements OnInit {
  fighters = signal<Fighter[] | undefined>(undefined);
  selectedFighter!: Fighter;
  isViewingDetails = false;

  private fightersService = inject(FightersService);

  ngOnInit() {
    this.fightersService.fighters$.subscribe((fighters) =>
      this.fighters.set(fighters),
    );
  }

  onViewDetails(fighter: Fighter) {
    this.selectedFighter = fighter
    this.isViewingDetails = true;
  }

  onCloseDetails() {
    this.isViewingDetails = false;
  }
}
