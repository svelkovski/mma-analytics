import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Fighter } from './fighter.model';
import { FightersService } from './fighters.service';
import { FighterDetailsComponent } from './fighter-details/fighter-details.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fighters',
  standalone: true,
  imports: [FighterDetailsComponent, FormsModule],
  templateUrl: './fighters.component.html',
  styleUrl: './fighters.component.css',
})
export class FightersComponent implements OnInit {
  fighters = signal<Fighter[]>([]);

  selectedFighter!: Fighter;
  isViewingDetails = false;

  searchFilter = signal('');
  categoryFilter = signal<string | null>(null);
  sortOption = signal<'wins' | 'weight' | 'name' | 'age'>('wins');

  private fightersService = inject(FightersService);
  private destroyRef = inject(DestroyRef);

  filteredFighters = computed(() => {
    let fightersList = this.fighters();

    if (this.searchFilter()) {
      const searchInput = this.searchFilter().toLowerCase();

      fightersList = fightersList.filter(
        (fighter) =>
          fighter.name.toLowerCase().includes(searchInput) ||
          fighter.nickname.toLowerCase().includes(searchInput),
      );
    }

    if (this.categoryFilter()) {
      fightersList = fightersList.filter(
        (fighter) => fighter.category === this.categoryFilter(),
      );
    }

    switch (this.sortOption()) {
      case 'weight':
        fightersList = [...fightersList].sort((a, b) => a.weight - b.weight);
        break;
      case 'wins':
        fightersList = [...fightersList].sort((a, b) => b.wins - a.wins);
        break;
      case 'age':
        fightersList = [...fightersList].sort((a, b) => a.age - b.age);
        break;
      default:
        fightersList = [...fightersList].sort((a, b) =>
          a.name.localeCompare(b.name),
        );
    }

    return fightersList;
  });

  ngOnInit() {
    const subscription = this.fightersService.fighters$.subscribe((fighters) =>
      this.fighters.set(fighters),
    );

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onViewDetails(fighter: Fighter) {
    this.selectedFighter = fighter;
    this.isViewingDetails = true;
  }

  onCloseDetails() {
    this.isViewingDetails = false;
  }

  get categories(): string[] {
    return Array.from(new Set(this.fighters().map((f) => f.category)));
  }
}
