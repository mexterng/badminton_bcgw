import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public username$ = new BehaviorSubject<string | null>(null);

  public allowedUsersForMemberEdit = ['admin', 'funki'];

  constructor(private http: HttpClient) {
    this.loadUser();
  }

  private loadUser() {
    this.http.get<{ username: string }>('/api/me', { withCredentials: true })
      .subscribe({
        next: res => this.username$.next(res.username),
        error: () => this.username$.next(null)
      });
  }

  getAuthHeaders(): HttpHeaders {
    const user = this.username$.value;
    return new HttpHeaders({ 'X-User': user || '' });
  }

  canEditMember(): boolean {
    const user = this.username$.value;
    if (!user) return false;
    return this.allowedUsersForMemberEdit.includes(user);
  }
}