import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../subcomponents/header/header.component';
import { GameCategorySelectorComponent } from '../subcomponents/game-category-selector/game-category-selector.component';
import { FooterComponent } from '../subcomponents/footer/footer.component';

@Component({
  selector: 'app-create-match',
  standalone: true,
  imports: [CommonModule, HttpClientModule, HeaderComponent, FooterComponent, GameCategorySelectorComponent],
  templateUrl: './create-match.component.html',
  styleUrl: './create-match.component.scss'
})
export class CreateMatchComponent {
  title="Neues Spiel";
  data: any[] = [];
  loading = false;

  // handle selection from child component
  onSelectionChanged(event: { ageClass: string | null; playType: string | null}) {
    if (!event.ageClass || !event.playType) return;
  }
}
