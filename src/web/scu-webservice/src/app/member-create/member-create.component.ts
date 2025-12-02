import { Component } from '@angular/core';
import { HeaderComponent } from '../subcomponents/header/header.component';
import { FooterComponent } from '../subcomponents/footer/footer.component';

@Component({
  selector: 'app-member-create',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './member-create.component.html',
  styleUrl: './member-create.component.scss'
})
export class MemberCreateComponent {
      title="Spieler/in hinzufügen";
}