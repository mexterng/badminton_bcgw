import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {ChangeDetectionStrategy} from '@angular/core';
import { AgeDivisionService } from '../../services/age-division.service';

@Component({
  selector: 'app-game-category-selector',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonToggleModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './game-category-selector.component.html',
  styleUrl: './game-category-selector.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class GameCategorySelectorComponent {
  @Output() selectionChanged = new EventEmitter<any>();
  
  ageClass = '';
  playType = 'single';

  ageOptions: any[] = [];

  playOptions = [
    { value: 'single', label: 'Einzel' },
    { value: 'doubles', label: 'Doppel/Mixed' }
  ];

  constructor(private ageService: AgeDivisionService) {}
  async ngOnInit() {
    const allDivisions = await this.ageService.getAgeDivisions();

    this.ageOptions = allDivisions.map(d => ({
      value: d.age_division_id,
      label: d.description
    }));

    if (this.ageOptions.length > 0) {
      this.ageClass = this.ageOptions[0].value;
      this.emitSelection();
    }
  }

  onAgeClassChange(value: string) {
    this.ageClass = value;
    this.emitSelection();
  }

  onPlayTypeChange(value: string) {
    this.playType = value;
    this.emitSelection();
  }

  private emitSelection() {
    this.selectionChanged.emit({ ageClass: this.ageClass, playType: this.playType });
  }

  onToggleClick(type: 'ageClass' | 'playType', value: string) {
    const isSameAgeClass = type === 'ageClass' ? this.ageClass === value : true;
    const isSamePlayType = type === 'playType' ? this.playType === value : true;
    const isSame = isSameAgeClass && isSamePlayType;
    console.log("isSameAgeClass: " + isSameAgeClass);
    console.log("isSamePlayType: " + isSamePlayType);
    console.log("isSame: " + isSame);
    this[type] = value;
    this.selectionChanged.emit({ ageClass: this.ageClass, playType: this.playType, same: isSame, sameAgeClass: isSameAgeClass, isSamePlayType: isSamePlayType });
  }
}