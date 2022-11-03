import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { AutenticacionService } from 'src/app/services/autentication.service';

@Component({
  selector: 'app-no-registrado',
  templateUrl: './no-registrado.component.html',
  styleUrls: ['./no-registrado.component.scss'],
})
export class NoRegistradoComponent implements OnInit {

  constructor(private autenticacionService: AutenticacionService, private router: Router, private zone: NgZone) { }

  ngOnInit() {}

  async onClickGoogle() {
    const user = await this.autenticacionService.getAutenticacion();

    this.comprobarAutenticacion(user);
  }

  async onClickFacebook() {
    const user = await this.autenticacionService.getAutenticacionFacebook();

    this.comprobarAutenticacion(user);
  }

  comprobarAutenticacion(user: User | null | undefined) {
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
