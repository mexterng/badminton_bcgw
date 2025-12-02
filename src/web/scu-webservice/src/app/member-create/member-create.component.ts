import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../subcomponents/header/header.component';
import { MemberFormComponent } from '../subcomponents/member-form/member-form.component';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from '../subcomponents/footer/footer.component';

interface Member {
  display_name: string | null;
  first_name: string | null;
  last_name: string | null;
  gender: string | null;
  age_division_id: string[] | null;
}

@Component({
  selector: 'app-member-create',
  standalone: true,
  imports: [HeaderComponent, MemberFormComponent, FooterComponent, MatButtonModule],
  templateUrl: './member-create.component.html',
  styleUrl: './member-create.component.scss'
})


export class MemberCreateComponent {
  constructor(private http: HttpClient){}
  title="Spieler/in hinzufügen";
  
  onSave(member: Member) {
    console.log('Speichern:', member);
    // API-Aufruf
    // POST request to backend
    this.http.post('/api/member', member).subscribe({
      next: (res) => {
        alert('Spieler/in erfolgreich hinzugefügt');
        // optional: redirect to overview
        window.location.href = '/member';
      },
      error: (err) => {
        console.error('Fehler beim Erstellen des/der Spieler/in:', err);
        alert('Fehler beim Erstellen des/der Spieler/in');
      }
    });
  }
  
  
  onCancel() {
    window.history.back();
  }
}