import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './subcomponents/header/header.component';
import { FooterComponent } from './subcomponents/footer/footer.component';
import { PyramideComponent } from './pyramide/pyramide.component';

@Component({
  selector: 'app-root',
  imports: [
  RouterOutlet,
  HeaderComponent,
  FooterComponent,
  PyramideComponent
]
,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'scu-webservice';
}
