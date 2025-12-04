import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../subcomponents/header/header.component';
import { GamesTableComponent, Game } from '../subcomponents/games-table/games-table.component';
import { FooterComponent } from '../subcomponents/footer/footer.component';
import { AgeDivisionService } from '../services/age-division.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface Member {
  display_name: string | null;
  first_name: string | null;
  last_name: string | null;
  gender: string | null;
  age_division_id: string[] | null;
  age_division_str?: string[];
}

@Component({
  selector: 'app-member-single',
  standalone: true,
  imports: [HeaderComponent, GamesTableComponent, FooterComponent, MatButtonModule, MatIconModule],
  templateUrl: './member-single.component.html',
  styleUrls: ['./member-single.component.scss']
})


export class MemberSingleComponent {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private ageService: AgeDivisionService
  ) {}

  title="Spielerinformationen";

  memberId: string | null = null;

  member: Partial<Member> = {
    display_name: '',
    first_name: '',
    last_name: '',
    gender: '',
    age_division_id: [],
  };

  gamesData: Game[] = [{"game_id":6,"timestamp":"2025-09-29T13:39:47.000Z","valid":1,"host_display_name":"SmashKing","opponent_display_name":"AceMan","result":"2:0","play_type_db":"games_single"},{"game_id":8,"timestamp":"2025-09-29T13:39:47.000Z","valid":1,"host_display_name":"SmashKing","opponent_display_name":"NetNinja","result":"1:2","play_type_db":"games_single"},{"game_id":16,"timestamp":"2025-12-01T12:30:26.000Z","valid":1,"host_display_name":"SmashKing","opponent_display_name":"NetNinja","result":"2:0","play_type_db":"games_single"},{"game_id":17,"timestamp":"2025-12-01T12:38:31.000Z","valid":1,"host_display_name":"SmashKing","opponent_display_name":"NetNinja","result":"2:0","play_type_db":"games_single"},{"game_id":18,"timestamp":"2025-12-01T12:48:58.000Z","valid":1,"host_display_name":"SmashKing","opponent_display_name":"CourtQueen","result":"1:2","play_type_db":"games_single"},{"game_id":3,"timestamp":"2025-09-29T13:39:47.000Z","valid":1,"host_display_name":"SmashKing/AceMan","opponent_display_name":"DropShotDiva/ServeStar","result":"2:0","play_type_db":"games_double"},{"game_id":6,"timestamp":"2025-09-29T13:39:47.000Z","valid":1,"host_display_name":"SmashKing/AceMan","opponent_display_name":"ShuttleBelle/FleetFiona","result":"0:2","play_type_db":"games_double"},{"game_id":9,"timestamp":"2025-09-29T13:39:47.000Z","valid":1,"host_display_name":"SmashKing/AceMan","opponent_display_name":"NetNinja/CourtQueen","result":"1:2","play_type_db":"games_double"},{"game_id":13,"timestamp":"2025-09-29T13:39:47.000Z","valid":1,"host_display_name":"SmashKing/AceMan","opponent_display_name":"VolleyVic/RacketRick","result":"2:1","play_type_db":"games_double"},{"game_id":16,"timestamp":"2025-12-01T14:33:47.000Z","valid":1,"host_display_name":"SmashKing/ShuttleBelle","opponent_display_name":"NetNinja/CourtQueen","result":"2:0","play_type_db":"games_double"}];

  ngOnInit() {
    this.memberId = this.route.snapshot.paramMap.get('id');
    if (!this.memberId) return;

    this.loadMemberInfos();
  }

  private loadMemberInfos() {
    this.http.get<Partial<Member>>(`/api/member/${this.memberId}`).subscribe({
      next: data => {
        this.member = { ...this.member, ...data };
        this.member.gender = this.getGenderLong(this.member.gender || '');

        if (data.age_division_id) {
          this.ageService.resolveIds(data.age_division_id).then(names => {
            this.member.age_division_str = names;
          });
        }
      },
      error: () => alert('Fehler beim Laden')
    });
  }

  editMember(): void {
    if (!this.memberId) return;
    window.location.href = `/member/${this.memberId}/edit`;
  }

  private getGenderLong(g: string | null): string {
    // simple mapping
    if (g === 'm') return 'Männlich';
    if (g === 'w') return 'Weiblich';
    return '';
  }
}