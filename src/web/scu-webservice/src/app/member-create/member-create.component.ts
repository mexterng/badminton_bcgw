import { Component } from '@angular/core';
import { HeaderComponent } from '../subcomponents/header/header.component';
import { MemberFormComponent } from '../subcomponents/member-form/member-form.component';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from '../subcomponents/footer/footer.component';

interface Member {
  displayName: string | null;
  firstName: string | null;
  lastName: string | null;
  gender: string | null;
  ageGroup: string[] | null;
}

@Component({
  selector: 'app-member-create',
  standalone: true,
  imports: [HeaderComponent, MemberFormComponent, FooterComponent, MatButtonModule],
  templateUrl: './member-create.component.html',
  styleUrl: './member-create.component.scss'
})
export class MemberCreateComponent {
  title="Spieler/in hinzufügen";

  onSave(member: Member) {
    console.log('Speichern:', member);
    // API-Aufruf
  }

  onCancel() {
    window.history.back();
  }
}