import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
//import { AutenticacionService } from '../../services/autenticacion.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // Localstorage
  user: any;

  constructor(private router: Router, private zone: NgZone) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void { }

  esMovil(): boolean {
    if (
      Capacitor.getPlatform() === 'android' ||
      Capacitor.getPlatform() === 'ios'
    ) {
      return true;
    } else if (window.screen.width < 650) {
      return true;
    } else {
      return false;
    }
  }

  clickLogo() {
    this.router.navigate(['/home']);
  }

  perfilClick() {
    if (!this.user) {
      this.zone.run(() => {
        this.router.navigate(['/registrarse']);
      });
    } else {
      this.zone.run(() => {
        this.router.navigate(['/perfil']);
      });
    }
  }

  esHome(): boolean {
    if (this.router.url === '/home') {
      return true;
    } else {
      return false;
    }
  }

  menuAbierto() {
    console.log('Se abbrio');
  }
}
