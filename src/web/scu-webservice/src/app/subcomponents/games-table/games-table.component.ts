import { Component, Input, AfterViewInit, ViewChild, OnChanges, SimpleChanges, HostListener} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CustomMatPaginatorIntl } from './custom-paginator-intl';

export interface Game {
  game_id: number;
  age_division_id: number;
  age_division_initial: string;
  timestamp: string;
  timestamp_date?: Date;
  valid: number;
  host_display_name: string;
  opponent_display_name: string;
  result: string;
  set_one: string;
  set_two: string;
  set_three: string;
  play_type_db: string;
  resultTooltip?: string;
}

@Component({
  selector: 'app-games-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, CommonModule, MatPaginatorModule],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }],
  templateUrl: './games-table.component.html',
  styleUrl: './games-table.component.scss',
})
export class GamesTableComponent implements AfterViewInit, OnChanges {
  @Input() games: Game[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() columnLabels: Record<string, string> = {}
  private defaultColumnLabels: Record<string, string> = {
    game_id: 'Nr.',
    age_division_id: "AK (ID)",
    age_division_initial: "AK",
    timestamp: 'Datum (ISO)',
    timestamp_date: 'Datum',
    valid: 'Gültig',
    result: 'Ergebnis'
  };

  dataSource = new MatTableDataSource<Game>();

  // Popup state
  activePopupRow: number | null = null;
  popupPosition = { x: 0, y: 0 };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['games']) {
      this.dataSource.data = this.games.map(game => ({
        ...game,
        timestamp_date: new Date(game.timestamp),
      }));
    }
    if (changes['columnLabels']) {
      this.defaultColumnLabels = { ...this.defaultColumnLabels, ...this.columnLabels };
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getHeaderLabel(col: string): string {
    return this.defaultColumnLabels[col] ?? col;
  }

  // Open result popup
  openResultPopup(event: MouseEvent | TouchEvent, row: Game, target: EventTarget | null): void {
    event.stopPropagation();

    if (!target) return;

    const element = target as HTMLElement;
    
    // If clicking the same row, toggle the popup
    if (this.activePopupRow === row.game_id) {
      this.closeResultPopup();
      return;
    }
    
    this.activePopupRow = row.game_id;
    
    // Get element position
    const rect = element.getBoundingClientRect();
    
    // Calculate position - adjust for viewport boundaries
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize); // px per rem
    const popupWidth = 12 * rootFontSize;  // 12rem
    const popupHeight = 9 * rootFontSize;  // 9rem

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let posX = rect.right;
    let posY = rect.top;
    
    // Adjust if popup would overflow viewport
    if (posX + popupWidth > viewportWidth) {
      posX = rect.left - popupWidth - 10;
    }
    
    if (posY + popupHeight > viewportHeight) {
      posY = viewportHeight - popupHeight - 10;
    }
    
    this.popupPosition = { x: Math.max(10, posX), y: Math.max(10, posY) };
  }

  // Close result popup
  closeResultPopup(): void {
    this.activePopupRow = null;
  }

  // Listen for clicks outside the popup
  @HostListener('document:click')
  onDocumentClick(): void {
    if (this.activePopupRow !== null) {
      this.closeResultPopup();
    }
  }

  // Listen for escape key
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.closeResultPopup();
  }

  // Prevent closing when clicking inside the popup
  onPopupClick(event: Event): void {
    event.stopPropagation();
  }

}

