import { Component, NgZone, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { AutenticacionService } from '../../services/autentication.service';
import { isPlatform } from '@ionic/angular';
import { StorageAndroidService } from 'src/app/services/storage-android.service';
import { MobileUser } from 'src/app/interfaces/MobileUser';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  currentUser?: User;

  // Localstorage
  user: any;
  userData: any;

  constructor(
    private autenticacionService: AutenticacionService,
    private storage: StorageAndroidService,
    private router: Router
  ) {
    this.obtenerUsuario();
  }

  ngOnInit(): void {}

  async obtenerUsuario() {
    // Local Storage
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.userData = JSON.parse(localStorage.getItem('userData')!);

    if (!this.user) {
      // Probar si es android
      let res = await this.storage.getUser();
      this.user = this.castearAUser(JSON.parse(res));
    }
  }

  // HTML
  obtenerFoto() {
    if (isPlatform('mobile')) {
      this.storage.getUser();
    }
  }

  obtenerTelefono() {
    if (this.userData) {
      return this.userData.phone;
    } else {
      return '?';
    }
  }

  obtenerBibliotecaFav() {
    if (this.userData) {
      return this.userData.biblioPrinc;
    } else {
      return '?';
    }
  }

  obtenerSecBibliotecaFav(){
    if (this.userData) {
      return this.userData.biblioSec;
    } else {
      return '?';
    }
  }

  clickMisReservas() {
    this.router.navigate(['/mis-reservas']);
  }

  clickAtras() {
    this.router.navigate(['/home']);
  }

  editarPerfil() {
    this.router.navigate(['/editar-perfil']);
  }

  cerrarSesion() {
    this.autenticacionService.hacerSignOut();
  }

  castearAUser(user: MobileUser) {
    // User (Android) to User (Firebase Autentication)
    let userConverted = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.imageUrl,
    };
    return userConverted;
  }
}
