import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../subcomponents/header/header.component';
import { GameCategorySelectorComponent } from '../subcomponents/game-category-selector/game-category-selector.component';
import { MemberSelectorComponent, Member } from '../subcomponents/member-selector/member-selector.component';
import { FooterComponent } from '../subcomponents/footer/footer.component';

@Component({
  selector: 'app-create-match',
  standalone: true,
  imports: [CommonModule, HttpClientModule, HeaderComponent, FooterComponent, GameCategorySelectorComponent, MemberSelectorComponent],
  templateUrl: './create-match.component.html',
  styleUrl: './create-match.component.scss'
})
export class CreateMatchComponent {
  title="Neues Spiel";
  loading = false;
  allMembers: Member[] = [];
  filteredMembers: Member[] = [];
  memberKeys: string[] = [];
  memberLabels: string[] = [];
  selectedMembers: { [key: string]: Member } = {};

  @ViewChild(MemberSelectorComponent) memberSelector!: MemberSelectorComponent;
  
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  onMemberSelected(member: Member, id: string) {
    this.selectedMembers[id] = member;
    this.filteredMembers = this.allMembers.filter(m => {
      const isSelected = Object.values(this.selectedMembers)
        .some(sel => sel.member_id === m.member_id);
      return !isSelected;
    });
    console.log('Ausgewähltes Mitglied für ID: ' + id, member);
    console.log(this.selectedMembers);
  }

  onSelectionChanged(event: { ageClass: string | null; playType: string | null; same: boolean; sameAgeClass: boolean ; samePlayType: boolean }) {
    if (!event.ageClass || !event.playType) return;

    if (event.same) return;

    if (event.playType === 'single') {
      this.memberKeys = ['player1', 'player2'];
      this.memberLabels = ['Spieler/in 1', 'Spieler/in 2'];
    } else if (event.playType === 'doubles') {
      this.memberKeys = ['player1a', 'player1b', 'player2a', 'player2b'];
      this.memberLabels = ['Team 1', 'Team 1', 'Team 2', 'Team 2'];
    }

    if(event.sameAgeClass) {
      this.selectedMembers = {};
      this.filteredMembers = this.allMembers;
      this.cdr.detectChanges(); // new rendering
      return;
    } else {
      // choose API endpoint based on play type
      const endpoint = `/api/member/age_division/${event.ageClass}?all=true`;

      this.loading = true;

      // fetch data from API
      this.http.get<{data: any[]; meta: any}>(endpoint).subscribe({
        next: res => {
          this.allMembers = res.data;
          this.filteredMembers = this.allMembers;
          this.loading = false;
          this.selectedMembers = {};
        },
        error: err => {
          console.error('Error fetching pyramid data:', err);
          this.allMembers = []; // reset results on error
          this.filteredMembers = [];
          this.loading = false;
        }
      });
    }
  }
}
