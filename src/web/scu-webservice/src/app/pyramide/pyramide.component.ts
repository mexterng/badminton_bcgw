import { Component } from '@angular/core';
import { HeaderComponent } from '../subcomponents/header/header.component';

@Component({
  selector: 'app-pyramide',
  imports: [HeaderComponent],
  templateUrl: './pyramide.component.html',
  styleUrl: './pyramide.component.scss'
})
export class PyramideComponent {
  title = 'Pyramide';
}
