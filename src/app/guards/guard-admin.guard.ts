import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../services/autentication.service';
import { catchError, map} from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuardAdminGuard implements CanActivate {
  constructor(
    private authService: AutenticacionService,
    private router: Router
  ) {}

  private res: any;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>{

    // falta arreglar

      let user = JSON.parse(this.authService.getLocalUser());
      return this.authService
        .esAdminLocalStorage(user.uid)
        .pipe(
          map(r => {
          if(r) {
            return true
          }
          else {
            alert('No tienes permiso para acceder a este sitio');
            this.router.navigate(['/']);
            return false;
          }
        }),
        catchError((err) =>{
          alert('No tienes permiso para acceder a este sitio');
          this.router.navigate(['/']);
          return of(false);
      }));
    }
}
