import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../subcomponents/header/header.component';
import { GameCategorySelectorComponent } from '../subcomponents/game-category-selector/game-category-selector.component';
import { FooterComponent } from '../subcomponents/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, GameCategorySelectorComponent, MatButtonModule],
  templateUrl: './match.component.html',
  styleUrl: './match.component.scss'
})
export class MatchComponent {
  title="Spiele";
  loading = false;
  singlePlayType = true;
  selectedAgeClass = '';
  
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  onSelectionChanged(event: { ageClass: string | null; playType: string | null; same: boolean; sameAgeClass: boolean ; samePlayType: boolean }) {
    if (!event.ageClass || !event.playType) return;

    if (event.same) return;

    // choose API endpoint based on play type
    this.selectedAgeClass = event.ageClass;

    this.loading = true;

    // fetch data from API
    this.loading = false;
  }
}
