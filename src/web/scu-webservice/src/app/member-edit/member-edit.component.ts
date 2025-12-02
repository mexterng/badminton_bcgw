import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../subcomponents/header/header.component';
import { MemberFormComponent } from '../subcomponents/member-form/member-form.component';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from '../subcomponents/footer/footer.component';
import { ActivatedRoute } from '@angular/router';

interface Member {
  display_name: string | null;
  first_name: string | null;
  last_name: string | null;
  gender: string | null;
  age_division_id: string[] | null;
}

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [HeaderComponent, MemberFormComponent, FooterComponent, MatButtonModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.scss'
})


export class MemberEditComponent {
  @ViewChild('memberFormComp') memberFormComp!: MemberFormComponent;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}
  title="Spieler/in bearbeiten";
  memberId: string | null = null;

  loadedMember: Partial<Member> | null = null;

  ngOnInit() {
    this.memberId = this.route.snapshot.paramMap.get('id');
    if (this.memberId) {
      this.http.get<Partial<Member>>(`/api/member/${this.memberId}`).subscribe({
        next: data => this.loadedMember = data,
        error: () => alert('Fehler beim Laden')
      });
    }
  }
  
  onSave(member: Member) {
    if (!this.memberId) return;

    const payload = { id: this.memberId, ...member };

    this.http.patch(`/api/member/${this.memberId}`, payload).subscribe({
      next: () => {
        alert('Spieler/in erfolgreich aktualisiert');
        window.location.href = '/member';
      },
      error: (err) => {
        if (err?.error?.message?.includes("member.display_name")) {
          this.memberFormComp.setDuplicateDisplayNameError();
          return;
        }

        console.error('Fehler beim Aktualisieren:', err);
        alert('Fehler beim Aktualisieren');
      }
    });
  }

  onCancel() {
    window.history.back();
  }
}