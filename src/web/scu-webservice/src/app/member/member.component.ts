import { Component } from '@angular/core';
import { HeaderComponent } from '../subcomponents/header/header.component';
import { FooterComponent } from '../subcomponents/footer/footer.component';

@Component({
  selector: 'app-member',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss'
})
export class MemberComponent {
  title = 'Spieler/innen';
}
