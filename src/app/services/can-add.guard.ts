import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { AuthService } from './auth.service';
import { tap, map, take } from 'rxjs/operators';
import {MatSnackBar} from "@angular/material/snack-bar";
import {SHELF} from "../constants/routes.const";

@Injectable({
  providedIn: 'root'
})
export class CanAddGuard implements CanActivate {

  constructor(private auth: AuthService, private snackBar: MatSnackBar, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.auth.user$.pipe(take(1),
        map((user:any) => !!(user)),
        tap(canView => {
          if (!canView) {
            this.router.navigate([SHELF]);
            this.snackBar.open('Login first to read your books! 📚', 'Close', {
              duration: 4000,
            });
          }
        }));
  }
}
