import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../subcomponents/header/header.component';
import { MemberListComponent, Member } from '../subcomponents/member-list/member-list.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from '../subcomponents/footer/footer.component';
import { AgeDivisionService } from '../services/age-division.service';

interface AgeDivision {
  age_division_id: string;
  description: string;
}
@Component({
  selector: 'app-member',
  imports: [HeaderComponent, MemberListComponent, FooterComponent, MatSelectModule, FormsModule, CommonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss'
})
export class MemberComponent implements OnInit{
  title = 'Spieler/innen';

  agegroups: { value: string; label: string }[] = [];
  selectedAgegroup: string | null = null;

  genders = [
    { value: 'm', label: 'Männlich' },
    { value: 'w', label: 'Weiblich' },
  ];
  selectedGender: string | null = null;
  selectedName: string = '';


  loading = false;
  members: Member[] = [];
  allMembers: Member[] = [];
  selectedMember?: Member;

  constructor(private http: HttpClient, private ageService: AgeDivisionService) {}

  async ngOnInit() {
    await this.loadAgeGroups();
    this.fetchMembers();
  }

  private async loadAgeGroups() {
    const allDivisions: AgeDivision[] = await this.ageService.getAgeDivisions();
    this.agegroups = allDivisions.map(d => ({
      value: d.age_division_id,
      label: d.description
    }));
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

  applyFilters(): void {
    // Start with all members
    let filtered = [...this.allMembers];

    // Filter by age group
    if (this.selectedAgegroup && this.selectedAgegroup !== '-') {
      filtered = filtered.filter(m => m.age_division.includes(parseInt(this.selectedAgegroup!, 10)));
    }

    // Filter by gender
    if (this.selectedGender && this.selectedGender !== '-') {
      filtered = filtered.filter(m => m.gender === this.selectedGender);
    }

    // Filter by name
    if (this.selectedName && this.selectedName.trim() !== '') {
      const nameLower = this.selectedName.toLowerCase();
      filtered = filtered.filter(m =>
        m.display_name?.toLowerCase().includes(nameLower) ||
        m.first_name?.toLowerCase().includes(nameLower) ||
        m.last_name?.toLowerCase().includes(nameLower)
      );
    }

    // Update visible list
    this.members = filtered;
  }
}
