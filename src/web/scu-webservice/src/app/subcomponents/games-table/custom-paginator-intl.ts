import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Einträge pro Seite';
  override nextPageLabel     = 'Nächste Seite';
  override previousPageLabel = 'Vorherige Seite';
  override firstPageLabel    = 'Erste Seite';
  override lastPageLabel     = 'Letzte Seite';
  
  override getRangeLabel = function (page: number, pageSize: number, length: number): string {
    if (length === 0 || pageSize === 0) {
      return `0 von ${length}`;
    }
    const startIndex = page * pageSize;
    // letzter Index darf Länge nicht überschreiten
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} von ${length}`;
  };
}