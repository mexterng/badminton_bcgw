import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../subcomponents/header/header.component';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = 'Menü';
  appVersion = environment.appVersion;

  constructor(public authService: AuthService, private router: Router) {}

  onDirectionClick(direction: string) {
    this.router.navigate([direction]);
  }

  logout() {
    const refreshToken = localStorage.getItem('refreshToken') || undefined;
    this.authService.logout(refreshToken).subscribe(() => {
      this.router.navigate(['/login']); // Weiterleitung zur Login-Seite
    });
  }
}