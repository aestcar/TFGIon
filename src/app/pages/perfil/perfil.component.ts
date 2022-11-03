import { Component, NgZone, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { AutenticacionService } from '../../services/autentication.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  currentUser?: User;

  // Localstorage
  user:any;
  phone:string;
  bibliotecaFav:string;

  constructor(
    private autenticacionService: AutenticacionService,
    private router: Router,
    private zone: NgZone
  ) {

    // Local Storage
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

  ngOnInit(): void {}

  // HTML
  obtenerTelefono() {
   if (this.phone) {
      return this.phone;
    } else {
      return '?';
    }
  }

  obtenerBibliotecaFav() {
    if (this.bibliotecaFav) {
      return this.bibliotecaFav;
    } else {
      return '?';
    }
  }

  clickMisReservas() {
    this.zone.run(() => {
      this.router.navigate(['/mis-reservas']);
    });
  }

  cerrarSesion() {
      this.autenticacionService.hacerSignOut();
  }
}
