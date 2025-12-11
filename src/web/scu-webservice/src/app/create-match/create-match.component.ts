import { Component, ViewChild, ChangeDetectorRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../subcomponents/header/header.component';
import { GameCategorySelectorComponent } from '../subcomponents/game-category-selector/game-category-selector.component';
import { MemberSelectorComponent, Member } from '../subcomponents/member-selector/member-selector.component';
import { SetInputComponent } from '../subcomponents/set-input/set-input.component';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from '../subcomponents/footer/footer.component';
import { getDoublesDisplayName } from '../utils/doubles-utils';
import { firstValueFrom } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-match',
  standalone: true,
  imports: [CommonModule, HttpClientModule, HeaderComponent, FooterComponent, GameCategorySelectorComponent, MemberSelectorComponent, MatButtonModule, SetInputComponent],
  templateUrl: './create-match.component.html',
  styleUrl: './create-match.component.scss'
})
export class CreateMatchComponent {
  title="Neues Spiel";
  loading = false;
  set3Active = false;
  singlePlayType = true;
  selectedAgeClass = '';
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
  @ViewChildren(SetInputComponent) setInputs!: QueryList<SetInputComponent>;
  
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private router: Router) {
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
      this.selectedAgeClass = event.ageClass;
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

    // check if third set must be deactivated/activated
    if (Object.keys(this.setValues).length > 1) {
      const set1 = this.setValues['set1'];
      const set2 = this.setValues['set2'];

      const tieExists = set1.value1 === set1.value2 || set2.value1 === set2.value2;
      const winner1 = set1.value1 > set1.value2;
      const winner2 = set2.value1 > set2.value2;

      this.set3Active = tieExists ? false : winner1 !== winner2;
    }
  }

  onSubmit(): void {
    const validRes = this.checkInputsForValidGame();

    if (validRes.status) {
      // all good -> add game
      if (this.singlePlayType) {
        this.createSingleGame();
      } else {
        this.createDoublesGame();
      }
    } else {
      // show errors
      alert(validRes.errMessage);
    }
  }

  onCancel(): void {
    window.history.back();
  }

  // helper
  private computeWinnerGame(setData : any): number {
    const set1 = this.computeWinnerSet(setData["set1"].a, setData["set1"].b);
    const set2 = this.computeWinnerSet(setData["set2"].a, setData["set2"].b);
    const set3 = this.computeWinnerSet(setData["set3"].a, setData["set3"].b);

    const player1Wins = (set1 === 1 ? 1 : 0) + (set2 === 1 ? 1 : 0) + (set3 === 1 ? 1 : 0);
    const player2Wins = (set1 === 2 ? 1 : 0) + (set2 === 2 ? 1 : 0) + (set3 === 2 ? 1 : 0);

    return player1Wins === 2 ? 1 : 2 ;
  }

  private computeWinnerSet(val1: number, val2: number): number {
    // return 1 if val1 > val2, 2 if val2 > val1, else 0
    return val1 === val2 ? 0 : (val1 > val2 ? 1 : 2);
  }

  private computeWinnerLabel(value1: number, value2: number): string {
    const winner = this.computeWinnerSet(value1, value2);
    if (winner === 1 || winner === 2) {
      return this.selectedDisplayNames[`team${winner}`];
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

  private checkInputsForValidGame(): {status: boolean, errMessage: string}{
    if (this.singlePlayType) {
      // check selected player
      if (this.selectedMembers['player1'].member_id < 0) {
        return {status: false, errMessage: 'Gewählte/r Spieler/in 1 ist nicht gültig.'};
      }
      if (this.selectedMembers['player2'].member_id < 0) {
        return {status: false, errMessage: 'Gewählte/r Spieler/in 2 ist nicht gültig.'};
      }
    } else {
      // check selected teams
      if (this.selectedMembers['player1a'].member_id < 0 || this.selectedMembers['player1b'].member_id < 0) {
        return {status: false, errMessage: 'Das Team 1 ist unvollständig.'};
      }
      if (this.selectedMembers['player2a'].member_id < 0 || this.selectedMembers['player2b'].member_id < 0) {
        return {status: false, errMessage: 'Das Team 2 ist unvollständig.'};
      }
    }
    const setPoints = [
      {id: 1, a : this.setValues['set1']?.value1 || 0, b : this.setValues['set1']?.value2 || 0, active: true },
      {id: 2, a : this.setValues['set2']?.value1 || 0, b : this.setValues['set2']?.value2 || 0, active: true },
      {id: 3, a : this.setValues['set3']?.value1 || 0, b : this.setValues['set3']?.value2 || 0, active: this.set3Active },     
  ]
    // check set winner
    for (const set of setPoints) {
      if (set.active && set.a === set.b) {
        return {status: false, errMessage: `Satz ${set.id} hat keine/n Gewinner/in.`};
      }
    }

    for (const set of setPoints) {
      if (!set.active) continue;

      const isMaxClose = (set.a === 30 && set.b === 29) || (set.a === 29 && set.b === 30);
      const diff = Math.abs(set.a - set.b);

      if (!isMaxClose && diff <= 2) {
        return { status: false, errMessage: `Satz ${set.id} hat nicht mindestens 2 Punkte Differenz.` };
      }
    }

    return {status: true, errMessage: ''};
  }

  private getFullSetData() {
    const setKeys = ['set1', 'set2', 'set3'];
    const fullSetData = Object.fromEntries(
      setKeys.map(k => [
        k,
        {
          a: this.setValues[k]?.value1 || 0,
          b: this.setValues[k]?.value2 || 0
        }
      ])
    );
    return fullSetData;
  }

  private createSingleGame() {
    // prepare game payload
    const fullSetData = this.getFullSetData();
    const gameWinner = this.computeWinnerGame(fullSetData);
    const winnerMember = this.selectedMembers[`player${gameWinner}`];
    const gamePayload: any = {
      player_a: this.selectedMembers[`player1`].member_id,
      player_b: this.selectedMembers[`player2`].member_id,
      age_division_id: this.selectedAgeClass,
      winner_id: winnerMember.member_id,
      set_one: `${fullSetData['set1'].a}-${fullSetData['set1'].b}`,
      set_two: `${fullSetData['set2'].a}-${fullSetData['set2'].b}`,
      set_three: this.set3Active 
        ? `${fullSetData['set3'].a}-${fullSetData['set3'].b}` 
        : null,
    };

    // POST request to backend
    this.loading = true;
    this.http.post('/api/single_games', gamePayload).subscribe({
      next: (res) => {
        this.loading = false;
        alert('Spiel erfolgreich gespeichert');
        // optional: redirect to overview
        this.router.navigate(['/match']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Fehler beim Erstellen des Spiels:', err);
        alert('Fehler beim Speichern des Spiels');
      }
    });
  }

  private async createDoublesGame() {
    const fullSetData = this.getFullSetData();
    const gameWinner = this.computeWinnerGame(fullSetData);

    this.loading = true;

    try {
      // fetch doubles IDs
      const double_a_id = await firstValueFrom(this.getDoublesID(this.selectedMembers['player1a'].member_id, this.selectedMembers['player1b'].member_id));
      const double_b_id = await firstValueFrom(this.getDoublesID(this.selectedMembers['player2a'].member_id, this.selectedMembers['player2b'].member_id));
      console.log("double_ids", double_a_id, double_b_id);
      const winner_id = gameWinner === 1 ? double_a_id : double_b_id;
      console.log("winner_id", winner_id);

      const gamePayload: any = {
        player_a: double_a_id,
        player_b: double_b_id,
        age_division_id: this.selectedAgeClass,
        winner_id: winner_id,
        set_one: `${fullSetData['set1'].a}-${fullSetData['set1'].b}`,
        set_two: `${fullSetData['set2'].a}-${fullSetData['set2'].b}`,
        set_three: this.set3Active 
          ? `${fullSetData['set3'].a}-${fullSetData['set3'].b}` 
          : null,
      };

      // POST request to backend
      await firstValueFrom(this.http.post('/api/double_games', gamePayload));
      this.loading = false;
      alert('Spiel erfolgreich gespeichert');
      this.router.navigate(['/match']);
      
    } catch (err) {
      this.loading = false;
      console.error('Fehler beim Erstellen des Spiels:', err);
      alert('Fehler beim Speichern des Spiels');
    }
  }

  private getDoublesID(player_a_id: number, player_b_id: number): Observable<number> {
    const url = `/api/doubles/by-players?playerA=${player_a_id}&playerB=${player_b_id}`;
    
    return this.http.get<{ id: number, player_a: number, player_b: number, message: string }>(url).pipe(
      map(response => response.id),  // extract doubles_id
      catchError(err => {
        console.error('Error fetching doubles id:', err);
        return throwError(() => err);
      })
    );
  }
}
