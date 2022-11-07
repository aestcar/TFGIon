import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { AutenticacionService } from 'src/app/services/autentication.service';
import { isPlatform } from '@ionic/angular';
import { MobileUser } from '../../interfaces/MobileUser';

@Component({
  selector: 'app-no-registrado',
  templateUrl: './no-registrado.component.html',
  styleUrls: ['./no-registrado.component.scss'],
})
export class NoRegistradoComponent implements OnInit {

  constructor(private autenticacionService: AutenticacionService, private router: Router, private zone: NgZone) { }

  ngOnInit() {}

  async onClickGoogle() {
    if(isPlatform('mobile')){
      const user = await this.autenticacionService.getAutorizacionCordova();
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
      alert('Autenticacion Incorrecta');
    } else {
      this.autenticacionCorrecta(true);
      alert('Autenticacion Correcta');
    }
  }

  autenticacionCorrecta(b: boolean) {
    if (b) {
      this.zone.run(() => {
        this.router.navigate(['/home']);
      });
    } else {
      alert('Error en la autenticación de usuario');
      this.zone.run(() => {
        this.router.navigate(['/']);
      });
    }
  }

}
