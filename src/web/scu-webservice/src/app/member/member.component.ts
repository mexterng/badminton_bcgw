import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../subcomponents/header/header.component';
import { MemberListComponent, Member } from '../subcomponents/member-list/member-list.component';
import { FooterComponent } from '../subcomponents/footer/footer.component';

@Component({
  selector: 'app-member',
  imports: [HeaderComponent, MemberListComponent, FooterComponent],
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss'
})
export class MemberComponent {
  title = 'Spieler/innen';
  loading = false;
  members: Member[] = [];
  allMembers: Member[] = [];
  selectedMember?: Member;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchMembers();
  }

  private fetchMembers() {
    const endpoint = `/api/member?all=true`;
    this.loading = true;

    this.http.get<{data: Member[]; meta: any}>(endpoint).subscribe({
      next: res => {
        this.allMembers = res.data;
        this.members = [... this.allMembers];
        this.loading = false;
      },
      error: err => {
        console.error('Fehler beim Laden der Mitglieder:', err);
        this.allMembers = [];
        this.members = [];
        this.loading = false;
      }
    });
  }

  onSelectionChanged(member: Member) {
    this.selectedMember = member;
  }
}
