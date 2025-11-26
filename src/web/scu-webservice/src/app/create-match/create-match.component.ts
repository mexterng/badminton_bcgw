import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../subcomponents/header/header.component';
import { GameCategorySelectorComponent } from '../subcomponents/game-category-selector/game-category-selector.component';
import { MemberSelectorComponent, Member } from '../subcomponents/member-selector/member-selector.component';
import { SetInputComponent } from '../subcomponents/set-input/set-input.component';
import { FooterComponent } from '../subcomponents/footer/footer.component';
import { getDoublesDisplayName } from '../utils/doubles-utils';

@Component({
  selector: 'app-create-match',
  standalone: true,
  imports: [CommonModule, HttpClientModule, HeaderComponent, FooterComponent, GameCategorySelectorComponent, MemberSelectorComponent, SetInputComponent],
  templateUrl: './create-match.component.html',
  styleUrl: './create-match.component.scss'
})
export class CreateMatchComponent {
  title="Neues Spiel";
  loading = false;
  singlePlayType = true;
  dummyMember = { member_id: -1, display_name: 'Spieler/in wählen' };
  allMembers: Member[] = [this.dummyMember];
  filteredMembers: Member[] = [];
  memberKeys: string[] = [];
  singleMemberKeys = ['player1', 'player2'];
  doubleMemberKeys = ['player1a', 'player1b', 'player2a', 'player2b'];
  memberLabels: string[] = [];
  selectedMembers: { [key: string]: Member } = {};
  selectedDisplayNames: { [key: string]: string } = {'team1': '', 'team2': ''};
  setValues: Record<string, {value1: number, value2: number, winner_label: string}> = {};

  @ViewChild(MemberSelectorComponent) memberSelector!: MemberSelectorComponent;
  
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {
    this.initMembers();
  }

  private initMembers() {
    this.initSelectedMembers();
    this.initSelectedDisplayNames();
  }

  private initSelectedMembers() {
    this.singleMemberKeys.forEach((mem_key) => {
      this.selectedMembers[mem_key] = this.dummyMember;
    });

    this.doubleMemberKeys.forEach((mem_key) => {
      this.selectedMembers[mem_key] = this.dummyMember;
    });
  }

  private initSelectedDisplayNames() {
    if (this.singlePlayType) {
      const disp_name = this.dummyMember.display_name;
      this.selectedDisplayNames = {'team1': disp_name, 'team2': disp_name};
    } else {
      const disp_name = getDoublesDisplayName(this.dummyMember, this.dummyMember)
      this.selectedDisplayNames = {'team1': disp_name, 'team2': disp_name};
    }
  }

  onMemberSelected(member: Member, id: string) {
    this.selectedMembers[id] = member;
    this.filteredMembers = this.allMembers.filter(m => {
      const isSelected = Object.values(this.selectedMembers)
        .some(sel => sel.member_id === m.member_id);
      return !isSelected;
    });
    if (this.singlePlayType) {
      // single
      this.selectedDisplayNames['team1'] = this.selectedMembers[this.singleMemberKeys[0]].display_name || 'Spieler/in wählen';
      this.selectedDisplayNames['team2'] = this.selectedMembers[this.singleMemberKeys[1]].display_name || 'Spieler/in wählen';
    } else {
      //doubles
      const m1a = this.selectedMembers[this.doubleMemberKeys[0]];
      const m1b = this.selectedMembers[this.doubleMemberKeys[1]];
      const m2a = this.selectedMembers[this.doubleMemberKeys[2]];
      const m2b = this.selectedMembers[this.doubleMemberKeys[3]];
      this.selectedDisplayNames['team1'] = getDoublesDisplayName(m1a, m1b);
      this.selectedDisplayNames['team2'] = getDoublesDisplayName(m2a, m2b);
    }

    this.refreshWinnerLables();    

    console.log('Ausgewähltes Mitglied für ID: ' + id, member);
    console.log(this.selectedMembers);
  }

  onSelectionChanged(event: { ageClass: string | null; playType: string | null; same: boolean; sameAgeClass: boolean ; samePlayType: boolean }) {
    if (!event.ageClass || !event.playType) return;

    if (event.same) return;

    if (event.playType === 'single') {
      this.singlePlayType = true;
      this.memberKeys = this.singleMemberKeys;
      this.memberLabels = ['Spieler/in 1', 'Spieler/in 2'];
    } else if (event.playType === 'doubles') {
      this.singlePlayType = false;
      this.memberKeys = this.doubleMemberKeys;
      this.memberLabels = ['Team 1', 'Team 1', 'Team 2', 'Team 2'];
    }

    if(event.sameAgeClass) {
      this.initMembers();
      this.filteredMembers = this.allMembers;
      this.cdr.detectChanges(); // new rendering
      this.refreshWinnerLables();
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
          this.initMembers();
          this.refreshWinnerLables();
        },
        error: err => {
          console.error('Error fetching pyramid data:', err);
          this.allMembers = [this.dummyMember]; // reset results on error
          this.filteredMembers = [];
          this.loading = false;
          this.refreshWinnerLables();
        }
      });
    }
  }

  onSetChanged(event: {value1: number, value2: number}, setId: string) {
    const winner_label = this.computeWinnerLabel(event.value1, event.value2);
    this.setValues[setId] = { ...event, winner_label };
  }

  // helper
  private computeWinnerLabel(value1: number, value2: number): string {
    if (value1 > value2) {
      return this.selectedDisplayNames['team1'];
    }
    if (value2 > value1) {
      return this.selectedDisplayNames['team2'];
    }
    return '';
  }

  private refreshWinnerLables(){
    Object.keys(this.setValues).forEach(setId => {
      const s = this.setValues[setId];
      const winner_label = this.computeWinnerLabel(s.value1, s.value2);
      this.setValues[setId] = { ...s, winner_label };
    });
  }
}
