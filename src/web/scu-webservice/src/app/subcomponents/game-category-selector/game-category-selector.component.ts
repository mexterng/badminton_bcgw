import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {ChangeDetectionStrategy} from '@angular/core';

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
  ageClass = 'erwachsene';
  playType = 'einzel';

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
}