import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Member {
  id: number;
  displayName: string;
}

@Component({
  selector: 'app-member-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-selector.component.html',
  styleUrls: ['./member-selector.component.scss']
})
export class MemberSelectorComponent {
  @Input() data: Member[] = [];
  @Input() label: string = '';
  @Output() selectionChanged = new EventEmitter<Member>();

  selectedMember?: Member;
  dropdownOpen = false;

  constructor(private elRef: ElementRef) {}

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onSelect(member: Member) {
    this.selectedMember = member;
    this.selectionChanged.emit(member);
    this.dropdownOpen = false;
  }

  get buttonText(): string {
    return this.selectedMember?.displayName || 'Mitglied wählen';
  }

  get membersWithEmpty(): Member[] {
    return [{ id: -1, displayName: 'Mitglied wählen' }, ...this.data];
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }
}