import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../subcomponents/header/header.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = 'Menü';
  appVersion = environment.appVersion;

  constructor(private router: Router) {}

  onDirectionClick(direction: string) {
    this.router.navigate([direction]);
  }
}
