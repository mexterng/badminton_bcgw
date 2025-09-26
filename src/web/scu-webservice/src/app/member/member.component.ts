import { Component } from '@angular/core';
import { HeaderComponent } from '../subcomponents/header/header.component';

@Component({
  selector: 'app-member',
  imports: [HeaderComponent],
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss'
})
export class MemberComponent {
  title = 'Mitglieder';
}
