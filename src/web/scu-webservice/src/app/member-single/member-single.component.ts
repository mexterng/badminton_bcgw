import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../subcomponents/header/header.component';
import { FooterComponent } from '../subcomponents/footer/footer.component';
import { AgeDivisionService } from '../services/age-division.service';

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
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './member-single.component.html',
  styleUrl: './member-single.component.scss'
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

  ngOnInit() {
    this.memberId = this.route.snapshot.paramMap.get('id');
    if (!this.memberId) return;

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

  private getGenderLong(g: string | null): string {
    // simple mapping
    if (g === 'm') return 'Männlich';
    if (g === 'w') return 'Weiblich';
    return '';
  }
}