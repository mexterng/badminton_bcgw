import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AgeDivisionService } from '../../services/age-division.service';

interface AgeDivision {
  age_division_id: string;
  description: string;
}

@Component({
  selector: 'app-member-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './member-form.component.html',
   styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent {
  memberForm = new FormGroup({
    displayName: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    ageGroup: new FormControl('', Validators.required),
  });

  genders = [
    { value: 'm', label: 'Männlich' },
    { value: 'w', label: 'Weiblich' },
  ];

  agegroups: { value: string; label: string }[] = [];

  constructor(private ageService: AgeDivisionService) {}

  async ngOnInit() {
    await this.loadAgeGroups();
  }

  private async loadAgeGroups() {
    const allDivisions: AgeDivision[] = await this.ageService.getAgeDivisions();
    this.agegroups = allDivisions.map(d => ({
      value: d.age_division_id,
      label: d.description
    }));
  }

  onSave(): void {
    console.log('Benutzer speichern:', this.memberForm.value);
  }

  onCancel(): void {
    this.memberForm.reset();
    console.log('Abgebrochen');
  }
}