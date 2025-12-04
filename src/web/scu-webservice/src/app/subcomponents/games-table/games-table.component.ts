import { Component, Input, AfterViewInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CustomMatPaginatorIntl } from './custom-paginator-intl';

export interface Game {
  game_id: number;
  timestamp: string;
  timestamp_date?: Date;
  valid: number;
  host_display_name: string;
  opponent_display_name: string;
  result: string;
  play_type_db: string;
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
    game_id: 'Spielnummer',
    timestamp: 'Datum (ISO)',
    timestamp_date: 'Datum',
    valid: 'Gültig',
    result: 'Ergebnis'
  };

  dataSource = new MatTableDataSource<Game>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['games']) {
      this.dataSource.data = this.games.map(game => ({
        ...game,
        timestamp_date: new Date(game.timestamp)
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
}

