import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { AgeDivisionService } from '../../services/age-division.service';

interface AgeDivision {
  age_division_id: string;
  description: string;
}
interface Member {
  display_name: string | null;
  first_name: string | null;
  last_name: string | null;
  gender: string | null;
  age_division_id: string[] | null;
}

@Component({
  selector: 'app-member-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnChanges {
  @ViewChild('displayNameField', { read: ElementRef })
  displayNameField!: ElementRef;

  @Input() memberData: Partial<Member> | null | undefined;
  @Output() save = new EventEmitter<Member>();
  @Output() cancel = new EventEmitter<void>();

  memberForm = new FormGroup({
    displayName: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    ageGroup: new FormControl<string[]>([], Validators.required)
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['memberData'] && this.memberData) {
      this.memberForm.patchValue({
        displayName: this.memberData.display_name ?? '',
        firstName: this.memberData.first_name ?? '',
        lastName: this.memberData.last_name ?? '',
        gender: this.memberData.gender ?? '',
        ageGroup: this.memberData.age_division_id ?? []
      });
    }
  }

  private async loadAgeGroups() {
    const allDivisions: AgeDivision[] = await this.ageService.getAgeDivisions();
    this.agegroups = allDivisions.map(d => ({ value: d.age_division_id, label: d.description }));
  }

  emitSave() {
    if (this.memberForm.valid) {
      const formValue = this.memberForm.value;
      // Optional auf null zurückwandeln, falls leer
      this.save.emit({
        display_name: formValue.displayName || null,
        first_name: formValue.firstName || null,
        last_name: formValue.lastName || null,
        gender: formValue.gender || null,
        age_division_id: formValue.ageGroup ?? null
      });
    }
  }

  emitCancel() {
    this.cancel.emit();
  }

  setDuplicateDisplayNameError() {
    const ctrl = this.memberForm.get('displayName');
    if (!ctrl) return;

    // set custom error
    ctrl.setErrors({ duplicate: true });
    ctrl.markAsTouched();
    this.scrollToDisplayNameField();
  }

  private scrollToDisplayNameField() {
    if (!this.displayNameField) return;

    const fieldEl: HTMLElement = this.displayNameField.nativeElement;
    const container = fieldEl.closest('.scroll-wrapper') as HTMLElement | null;

    if (!container) return;

    // compute relative offset inside the scroll-container
    const fieldRect = fieldEl.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const offset = fieldRect.top - containerRect.top + container.scrollTop - 20;

    container.scrollTo({
      top: offset,
      behavior: 'smooth'
    });
  }

}