import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {

    const requiredRole = route.data['requiredRole'];

    return this.auth.authChecked$.pipe(
      filter((checked) => checked),
      map(() => {

        console.log('RoleGuard');
        console.log('Role:', this.auth.getRole());

        if (
          this.auth.isLoggedIn() &&
          this.auth.hasRole(requiredRole)
        ) {
          return true;
        }

        this.router.navigate(['/']);
        return false;
      })
    );
  }
}