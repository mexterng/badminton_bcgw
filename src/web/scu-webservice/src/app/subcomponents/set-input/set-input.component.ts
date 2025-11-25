import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-set-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './set-input.component.html',
  styleUrls: ['./set-input.component.scss']
})
export class SetInputComponent {
  @Input() label: string = '';
}