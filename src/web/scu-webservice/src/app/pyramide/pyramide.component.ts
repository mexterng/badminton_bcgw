import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../subcomponents/header/header.component';
import { GameCategorySelectorComponent } from '../subcomponents/game-category-selector/game-category-selector.component';
import { FooterComponent } from '../subcomponents/footer/footer.component';

@Component({
  selector: 'app-pyramide',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, GameCategorySelectorComponent],
  templateUrl: './pyramide.component.html',
  styleUrls: ['./pyramide.component.scss']
})
export class PyramideComponent {
  title = 'Pyramide';

  onSelectionChanged(event: { ageClass: string | null; playType: string | null }) {
    console.log('Neue Auswahl:', event);
  }
}