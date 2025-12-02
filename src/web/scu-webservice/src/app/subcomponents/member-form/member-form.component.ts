import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

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
    { value: 'm', label: 'männlich' },
    { value: 'w', label: 'weiblich' },
  ];

  ageGroups = [
    { value: 'u10', label: 'U10' },
    { value: 'u12', label: 'U12' },
    { value: 'u14', label: 'U14' },
    { value: 'u16', label: 'U16' },
  ];

  onSave(): void {
    console.log('Benutzer speichern:', this.memberForm.value);
  }

  onCancel(): void {
    this.memberForm.reset();
    console.log('Abgebrochen');
  }
}