import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { AutenticacionService } from 'src/app/services/autentication.service';
import { isPlatform } from '@ionic/angular';
import { MobileUser } from '../../interfaces/MobileUser';
import { StorageAndroidService } from 'src/app/services/storage-android.service';

@Component({
  selector: 'app-no-registrado',
  templateUrl: './no-registrado.component.html',
  styleUrls: ['./no-registrado.component.scss'],
})
export class NoRegistradoComponent implements OnInit {

  constructor(private autenticacionService: AutenticacionService, private router: Router, private zone: NgZone, private storage: StorageAndroidService) { }

  ngOnInit() {}

  async onClickGoogle() {
    if(isPlatform('mobileweb')){
      const user = await this.autenticacionService.getAutenticacion();
      this.comprobarAutenticacion(user);
    }else if(isPlatform('mobile')){
      const user = await this.autenticacionService.getAutorizacionCordova();
      this.storage.setUser(user);
      this.comprobarAutenticacion(user);
    }else{
      const user = await this.autenticacionService.getAutenticacion();
      this.comprobarAutenticacion(user);
    }
  }

  async onClickFacebook() {
    const user = await this.autenticacionService.getAutenticacionFacebook();
    this.comprobarAutenticacion(user);
  }

  comprobarAutenticacion(user: User | null | undefined | MobileUser) {
    if (user === null || user === undefined) {
      this.autenticacionCorrecta(false);
      console.log('Autenticacion Incorrecta');
    } else {
      this.autenticacionCorrecta(true);
      console.log('Autenticacion Correcta');
    }
  }

  autenticacionCorrecta(b: boolean) {
    if (b) {
      this.zone.run(() => {
        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        });      
      });
    } else {
      alert('Error en la autenticación de usuario');
      this.zone.run(() => {
        this.router.navigate(['/']);
      });
    }
  }

}
