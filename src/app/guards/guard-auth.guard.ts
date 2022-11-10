import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { isPlatform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../services/autentication.service';
import { StorageAndroidService } from '../services/storage-android.service';

@Injectable({
  providedIn: 'root'
})
export class GuardAuthGuard implements CanActivate {
  constructor(private authService: AutenticacionService, private router: Router, private storage:StorageAndroidService){};
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(isPlatform('mobileweb')){
      if (!this.authService.getLocalUser()) {
        alert('No estás logueado');
        this.router.navigate(['/']);
        return false;
      }else{
        alert(this.authService.getLocalUser());
      }
    }
    else if(isPlatform('android') || isPlatform('ios')){
      if (!this.storage.getUser()) {
        alert('No estás logueado');
        this.router.navigate(['/']);
        return false;
      }
    }else{
      // Web 
      if (!this.authService.getLocalUser()) {
        alert('No estás logueado');
        this.router.navigate(['/']);
        return false;
      }else{
        alert(this.authService.getLocalUser());
      }
    }

    return true;
  }
  
}
