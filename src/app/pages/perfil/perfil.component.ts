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
  name?: string;
  email?: string;
  phone?: string;
  photo?: any;
  bibliotecaFav?: string;
  segBibliotecaFav?: string;

  constructor(
    private autenticacionService: AutenticacionService,
    private router: Router,
    private zone: NgZone
  ) {

    // Local Storage
    this.name = localStorage.getItem('userName')!;
    this.email = localStorage.getItem('userEmail')!;
    this.phone = localStorage.getItem('userPhone')!;
    this.photo = localStorage.getItem('userPhoto')!;
    this.bibliotecaFav = localStorage.getItem('userBibio')!;
    this.segBibliotecaFav = localStorage.getItem('userBiblioFav')!;
    
  }

  ngOnInit(): void {}

  // HTML
  obtenerTelefono() {
   if (this.phone != '') {
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
      // Borrar los valores
      this.name = '';
      this.email = '';
      this.phone = '';
      this.photo = '';
      this.bibliotecaFav = '';
      this.segBibliotecaFav = '';

      localStorage.setItem('userName', '');
      localStorage.setItem('userEmail', '');
      localStorage.setItem('userPhone', '');
      localStorage.setItem('userPhoto', '');
      localStorage.setItem('userBibio', '');
      localStorage.setItem('userBiblioFav', '');   
  }
}
