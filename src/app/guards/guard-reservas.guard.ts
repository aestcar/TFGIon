import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../services/autentication.service';
import { StorageAndroidService } from '../services/storage-android.service';

@Injectable({
  providedIn: 'root'
})
export class ReservasGuard implements CanActivate {
  constructor(private authService: AutenticacionService, private router: Router, private storage:StorageAndroidService){};
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.getLocalUser() && !this.storage.getUser()) {
      alert('No estás logueado');
      this.router.navigate(['/']);
      return false;
    } 
    return true;
  }
  
}
