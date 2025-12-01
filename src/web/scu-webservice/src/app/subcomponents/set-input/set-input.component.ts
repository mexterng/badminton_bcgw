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

  // store as string to catch invalid input
  value1: string = '0';
  value2: string = '0';

  onInput(event: Event, key: 'value1' | 'value2'): void {
    const elem = event.target as HTMLInputElement;
    let value = elem.value;

    // read min/max from the input element
    const min = elem.min !== '' ? Number(elem.min) : 0;
    const max = elem.max !== '' ? Number(elem.max) : 999999

    // remove all non-digits
    value = value.replace(/\D+/g, '');

    // enforce min/max
    let num = Number(value);
    if (num < min) num = min;
    if (num > max) num = max;

    // update input value
    elem.value = String(num);

    // update internal state
    this[key] = String(num);

    // emit updated values
    this.selectionChanged.emit({
      value1: Number(this.value1),
      value2: Number(this.value2)
    });
  }
}