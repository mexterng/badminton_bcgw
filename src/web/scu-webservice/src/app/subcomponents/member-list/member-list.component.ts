import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Member {
  member_id: number;
  display_name: string;
  gender: string;
  age_division_id: number[];
}

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})

export class MemberListComponent {
  @Input() data: Member[] = [];
  @Input() selectedMember?: Member;
  @Output() selectionChanged = new EventEmitter<Member>();

  onSelect(member: Member) {
    console.log('Clicked', member);
    this.selectedMember = member;
    this.selectionChanged.emit(member);
  }
}