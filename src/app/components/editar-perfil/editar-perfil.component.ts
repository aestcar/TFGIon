import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { isPlatform } from '@ionic/angular';
import { MobileUser } from 'src/app/interfaces/MobileUser';
import { AutenticacionService } from 'src/app/services/autentication.service';
import { StorageAndroidService } from 'src/app/services/storage-android.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss'],
})
export class EditarPerfilComponent implements OnInit {
  // Localstorage
  user: any;
  userData: any;

  inputTelefonoValue: number;
  inputBibliotecaPrimValue: string;
  inputBibliotecaSecValue: string;

  telefFormControl = new FormControl('', [
    Validators.max(999999999),
    Validators.min(99999999),
  ]);
  bibliotecaFav = new FormControl('', [Validators.required, Validators.pattern('/^[A-Za-z]+$/')]);
  secBibliotecaFav = new FormControl('', [Validators.required]);

  constructor(
    private autenticacionService: AutenticacionService,
    private storage: StorageAndroidService,
    private router: Router
  ) {
    this.obtenerUsuario();
  }

  ngOnInit() {}

  async obtenerUsuario() {
    // Local Storage
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.userData = JSON.parse(localStorage.getItem('userData')!);

    if (this.userData) {
      this.escribirUserData();
    }

    if (!this.user) {
      // Probar si es android
      let res = await this.storage.getUser();
      this.user = this.castearAUser(JSON.parse(res));
    }
  }

  escribirUserData(): void {
    this.inputTelefonoValue = this.userData.phone;
    this.inputBibliotecaPrimValue = this.userData.biblioPrinc;
    this.inputBibliotecaSecValue = this.userData.biblioSec;
  }

  clickAtras() {
    this.router.navigate(['/perfil']);
  }

  obtenerFoto() {
    if (isPlatform('mobile')) {
      this.storage.getUser();
    }
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

  aplicarCambios() {
    if (
      !this.telefFormControl.errors &&
      !this.bibliotecaFav.errors &&
      !this.secBibliotecaFav.errors
    ) {
      let userData = {
        phone: this.inputTelefonoValue,
        biblioPrinc: this.inputBibliotecaPrimValue,
        biblioSec: this.inputBibliotecaSecValue,
      };
      localStorage.setItem('userData', JSON.stringify(userData));
    } else {
      alert('Debes rellenar todos los campos marcados en rojo');
    }
  }
}
