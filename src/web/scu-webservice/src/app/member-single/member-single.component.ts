import { Component } from '@angular/core';
import { HeaderComponent } from '../subcomponents/header/header.component';
import { FooterComponent } from '../subcomponents/footer/footer.component';

interface Member {
  display_name: string | null;
  first_name: string | null;
  last_name: string | null;
  gender: string | null;
  age_division_id: string[] | null;
}

@Component({
  selector: 'app-member-single',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './member-single.component.html',
  styleUrl: './member-single.component.scss'
})


export class MemberSingleComponent {
    title="Spielerinformationen";
}