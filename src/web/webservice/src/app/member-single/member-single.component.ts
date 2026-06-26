import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../subcomponents/header/header.component';
import { GamesTableComponent, Game } from '../subcomponents/games-table/games-table.component';
import { FooterComponent } from '../subcomponents/footer/footer.component';
import { AgeDivisionService } from '../services/age-division.service';
import { AuthService } from '../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface Member {
  display_name: string | null;
  first_name: string | null;
  last_name: string | null;
  gender: string | null;
  age_division: string[] | null;
  age_division_str?: string[];
}

@Component({
  selector: 'app-member-single',
  standalone: true,
  imports: [HeaderComponent, GamesTableComponent, FooterComponent, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './member-single.component.html',
  styleUrls: ['./member-single.component.scss']
})


export class MemberSingleComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private ageService: AgeDivisionService,
    private authService: AuthService,
  ) {}

  title="Spielerinformationen";

  memberId: string | null = null;

  member: Partial<Member> = {
    display_name: '',
    first_name: '',
    last_name: '',
    gender: '',
    age_division: [],
  };

  gamesData: Game[] = [];
  readMoreMemberVisible = false;
  canEditMember = false;

  ngOnInit() {
    this.memberId = this.route.snapshot.paramMap.get('id');
    if (!this.memberId) return;
    this.authService.username$.subscribe(username => {
      this.canEditMember = this.authService.canEditMember();
    });

    this.loadMemberInfos();
    this.loadGames();
  }

  private loadMemberInfos() {
    this.http.get<Partial<Member>>(`/api/member/${this.memberId}`).subscribe({
      next: data => {
        this.member = { ...this.member, ...data };
        this.member.gender = this.getGenderLong(this.member.gender || '');

        if (data.age_division) {
          this.ageService.resolveIds(data.age_division).then(names => {
            this.member.age_division_str = names;
          });
        }
      },
      error: () => alert('Fehler beim Laden')
    });
  }

  private loadGames(): void {
    this.http.get<Game[]>(`/api/games/member/${this.memberId}`)
      .subscribe({
        next: (data) => {
          this.gamesData = data;
        },
        error: (err) => {
          console.error('Fehler beim Laden der Spiele', err);
        }
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

  toggleReadMoreMember(): void {
    this.readMoreMemberVisible = !this.readMoreMemberVisible;
  }
}