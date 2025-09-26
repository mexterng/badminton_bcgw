import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../subcomponents/header/header.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = 'SCU - Pyramidranking';

  constructor(private router: Router) {}

  onDirectionClick(direction: string) {
    this.router.navigate([direction]);
  }
}
