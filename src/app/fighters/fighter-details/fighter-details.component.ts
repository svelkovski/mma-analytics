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
}
