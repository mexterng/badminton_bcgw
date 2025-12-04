import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../subcomponents/header/header.component';
import { GameCategorySelectorComponent } from '../subcomponents/game-category-selector/game-category-selector.component';
import { GamesTableComponent, Game } from '../subcomponents/games-table/games-table.component';
import { FooterComponent } from '../subcomponents/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, GameCategorySelectorComponent, MatButtonModule, GamesTableComponent],
  templateUrl: './match.component.html',
  styleUrl: './match.component.scss'
})
export class MatchComponent {
  title="Spiele";
  loading = false;
  singlePlayType = true;
  selectedAgeClass = '';
  allGames: Game[] = [];
  
  constructor(private http: HttpClient) {}

  onSelectionChanged(event: { ageClass: string | null; playType: string | null; same: boolean; sameAgeClass: boolean ; samePlayType: boolean }) {
    if (!event.ageClass || !event.playType) return;

    if (event.same) return;

    // choose API endpoint based on play type
    const endpoint =
      event.playType === 'single'
        ? `/api/single_games/age_division/${event.ageClass}?all=true`
        : `/api/double_games/age_division/${event.ageClass}?all=true`;

    this.loading = true;

    // fetch data from API
    this.http.get<{data: Game[], meta: any}>(endpoint).subscribe({
      next: data => {
        this.allGames = data.data; // update results
        this.loading = false;
      },
      error: err => {
        console.error('Error fetching pyramid data:', err);
        this.allGames = []; // reset results on error
        this.loading = false;
      }
    });
  }
}
