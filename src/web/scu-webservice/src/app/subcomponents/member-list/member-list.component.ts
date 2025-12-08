import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Member {
  member_id: number;
  display_name: string;
  gender: string;
  age_division: number[];
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
  @Input() loading = false;
  @Output() selectionChanged = new EventEmitter<Member>();

  onSelect(member: Member) {
    window.location.href = `/member/${member.member_id}`
    this.selectedMember = member;
    this.selectionChanged.emit(member);
  }
}