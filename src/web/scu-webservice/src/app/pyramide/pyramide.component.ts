import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../subcomponents/header/header.component';
import { GameCategorySelectorComponent } from '../subcomponents/game-category-selector/game-category-selector.component';
import { PyramideCanvasComponent } from '../subcomponents/pyramide-canvas/pyramide-canvas.component';
import { PyramideDivsComponent } from '../subcomponents/pyramide-divs/pyramide-divs.component';
import { FooterComponent } from '../subcomponents/footer/footer.component';

@Component({
  selector: 'app-pyramide',
  standalone: true,
  imports: [CommonModule, HttpClientModule, HeaderComponent, FooterComponent, GameCategorySelectorComponent, PyramideCanvasComponent, PyramideDivsComponent],
  templateUrl: './pyramide.component.html',
  styleUrls: ['./pyramide.component.scss']
})
export class PyramideComponent {
  title = 'Pyramide';
  data: any[] = [];

  constructor(private http: HttpClient) {}

  // handle selection from child component
  onSelectionChanged(event: { ageClass: string | null; playType: string | null }) {
    if (!event.ageClass || !event.playType) return;

    // choose API endpoint based on play type
    const endpoint =
      event.playType === 'single'
        ? `/api/pyramides/single/${event.ageClass}`
        : `/api/pyramides/doubles/${event.ageClass}`;

    // fetch data from API
    this.http.get<any[]>(endpoint).subscribe({
      next: data => {
        this.data = data; // update results
      },
      error: err => {
        console.error('Error fetching pyramid data:', err);
        this.data = []; // reset results on error
      }
    });
  }
}