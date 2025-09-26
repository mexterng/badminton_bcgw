import { Component } from '@angular/core';
import { HeaderComponent } from '../subcomponents/header/header.component';

@Component({
  selector: 'app-create-match',
  imports: [HeaderComponent],
  templateUrl: './create-match.component.html',
  styleUrl: './create-match.component.scss'
})
export class CreateMatchComponent {
  title="Neues Spiel";
}
