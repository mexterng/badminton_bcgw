import { Component, Input, AfterViewInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

export interface Game {
  game_id: number;
  timestamp: string;
  valid: number;
  host_display_name: string;
  opponent_display_name: string;
  result: string;
  play_type_db: string;
}

@Component({
  selector: 'app-games-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, CommonModule],
  templateUrl: './games-table.component.html',
  styleUrl: './games-table.component.scss',
})
export class GamesTableComponent implements AfterViewInit, OnChanges {
  @Input() games: Game[] = [];
  @Input() displayedColumns: string[] = [];

  dataSource = new MatTableDataSource<Game>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['games']) {
      this.dataSource.data = this.games;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource(this.games);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

