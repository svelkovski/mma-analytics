import { Component, input, output } from '@angular/core';
import { Fighter } from '../fighter.model';

@Component({
  selector: 'app-fighter-details',
  standalone: true,
  imports: [],
  templateUrl: './fighter-details.component.html',
  styleUrl: './fighter-details.component.css',
})
export class FighterDetailsComponent {
  fighter = input.required<Fighter>();
  close = output<boolean>();

  onCloseDetails() {
    this.close.emit(false);
  }

  calculatePercentage(value: number): number {
    const total =
      this.fighter().wins + this.fighter().losses + this.fighter().draws;
    return total > 0 ? Math.round((value / total) * 100) : 0;
  }
}
