import { Component } from '@angular/core';
import { HeaderComponent } from '../subcomponents/header/header.component';
import { FooterComponent } from '../subcomponents/footer/footer.component';

@Component({
  selector: 'app-pyramide',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './pyramide.component.html',
  styleUrl: './pyramide.component.scss'
})
export class PyramideComponent {
  title = 'Pyramide';
}
