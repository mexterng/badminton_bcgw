import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-set-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './set-input.component.html',
  styleUrls: ['./set-input.component.scss']
})
export class SetInputComponent {
  @Input() input_label: string = '';
  @Input() winner_label: string = '';
  @Input() active: boolean = true;
  @Output() selectionChanged = new EventEmitter<{value1: number, value2: number}>();

  value1: number = 0;
  value2: number = 0;

  onInputChange() {
    this.selectionChanged.emit({ value1: this.value1, value2: this.value2 });
  }
}