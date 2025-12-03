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

    const response: any = await firstValueFrom(
      this.http.get('/api/age_division?all=true')
    );

    if (response.data?.length > 0) {
      allDivisions.push(...response.data);
    }

    this.cache = allDivisions;
    return this.cache;
  }

  async resolveIds(ids: string[]): Promise<string[]> {
    const divisions = await this.getAgeDivisions();
    console.log("divisions", divisions);
    console.log("ids", ids);
    const idNumbers = ids.map(id => Number(id));
    return divisions
      .filter(d => idNumbers.includes(d.age_division_id))
      .map(d => d.description);
  }
}