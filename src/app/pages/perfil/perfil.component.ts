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
  user:any;
  phone:string;
  bibliotecaFav:string;

  constructor(
    private autenticacionService: AutenticacionService,
    private storage:StorageAndroidService,
    private router: Router,
    private zone: NgZone
  ) { 
    this.obtenerUsuario();
  }

  ngOnInit(): void {
  }

  async obtenerUsuario(){
    // Local Storage
    this.user = JSON.parse(localStorage.getItem('user')!);
    if(!this.user){
      // Probar si es android
      let res =  await this.storage.getUser();
      this.user = this.castearAUser(JSON.parse(res));
    } 
  }

  // HTML
  obtenerFoto(){
    if(isPlatform('mobile')){
      this.storage.getUser();
    }
  }

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

  clickAtras(){
    this.zone.run(() => {
      this.router.navigate(['/home']);
    });
  }

  cerrarSesion() {
      this.autenticacionService.hacerSignOut();
  }

  castearAUser(user:MobileUser){
    // User (Android) to User (Firebase Autentication)
    let userConverted = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.imageUrl
    };
    return userConverted;
  }
}
