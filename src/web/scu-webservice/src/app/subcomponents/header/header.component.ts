import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() heading: string = '';
  
  constructor(private router: Router) {}

  home() {
    this.router.navigate(['home']);
  }
}
