import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = '/api';
  private userSubject = new BehaviorSubject<any>(null);
  private authCheckedSubject = new BehaviorSubject<boolean>(false);

  public user$ = this.userSubject.asObservable();
  public authChecked$ = this.authCheckedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCurrentUser();
  }

  login(username: string, password: string, rememberMe: boolean): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password, rememberMe }, {withCredentials: true})
      .pipe(tap((res: any) => {
        if (res.refreshToken) {
          localStorage.setItem('refreshToken', res.refreshToken);
        } else {
          localStorage.removeItem('refreshToken');
        }
        this.userSubject.next({ username: res.username, role: res.role });
      }));
  }

  logout(refreshToken?: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, { refreshToken }, {withCredentials: true})
      .pipe(tap(() => {
        localStorage.removeItem('refreshToken');
        this.userSubject.next(null);
      }));
  }

  refreshSession(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return throwError(() => new Error('Kein Refresh-Token vorhanden'));
    }
    return this.http.post(`${this.apiUrl}/refresh`, { refreshToken }, {withCredentials: true})
      .pipe(tap((user: any) => {
        this.userSubject.next(user);
      }));
  }

  loadCurrentUser(): void {
    this.http.get(`${this.apiUrl}/me`, {withCredentials: true}).subscribe({
        next: (user) => {
            this.userSubject.next(user);
            this.authCheckedSubject.next(true);
        },
        error: (error) => {
            if (error.status === 401) {
                this.refreshSession().subscribe({
                    next: () => {
                        this.authCheckedSubject.next(true);
                    },
                    error: () => {
                        this.userSubject.next(null);
                        localStorage.removeItem('refreshToken');
                        this.authCheckedSubject.next(true);
                    }
                });
            } else {
                this.userSubject.next(null);
                this.authCheckedSubject.next(true);
            }
        }
    });
  }

  isLoggedIn(): boolean {
    return this.userSubject.value !== null;
  }

  getRole(): string | null {
    return this.userSubject.value?.role || null;
  }

  hasRole(role: string): boolean {
    return this.userSubject.value?.role === role;
  }
}