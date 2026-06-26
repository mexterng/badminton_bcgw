import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { map, filter, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.auth.username$.pipe(
      filter(username => username !== null),
      take(1),
      map(() => {
        if (!this.auth.canEditMember()) {
          alert('Zugriff verweigert');
          window.history.back();
          return false;
        }
        return true;
      })
    );
  }
}