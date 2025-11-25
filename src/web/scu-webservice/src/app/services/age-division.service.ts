// age-division.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AgeDivisionService {

  private cache: any[] | null = null;   // internal cache

  constructor(private http: HttpClient) {}

  async getAgeDivisions(): Promise<any[]> {
    // return cached data if available
    if (this.cache) {
      return this.cache;
    }

    const allDivisions: any[] = [];
    let page = 1;
    let keepGoing = true;

    while (keepGoing) {
      const response: any = await firstValueFrom(
        this.http.get(`/api/age_division?page=${page}`)
      );

      if (response.data?.length > 0) {
        allDivisions.push(...response.data);
        page++;
      } else {
        keepGoing = false;
      }
    }

    this.cache = allDivisions;
    return this.cache;
  }
}