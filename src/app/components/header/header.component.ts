import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
//import { AutenticacionService } from '../../services/autenticacion.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // Autorizacion
  user:any;

  // Localstorage
  name?:string;
  email?:string;
  phone?:string;
  photo?:any;

  constructor(private router: Router, private zone: NgZone, /*private autenticacionService:AutenticacionService*/) { 
    //this.user = this.autenticacionService.getUser();

    // Local Storage
    if(!this.user){
      this.name = localStorage.getItem('userName')!;
      this.email = localStorage.getItem('userEmail')!;
      this.phone = localStorage.getItem('userPhone')!;
      this.photo = localStorage.getItem('userPhoto')!;
    }
  }

  ngOnInit(): void {
  }

  esAndroid():boolean{
    if(Capacitor.getPlatform() === 'android'){return true;}
    else{
      return false;
    }
  }

  clickLogo(){
    window.location.reload();
  }

  perfilClick(){
    this.zone.run(() => {
      this.router.navigate(['/perfil']);
    });
  }

  esHome():boolean{
    if(this.router.url === ('/home')){
      return true;
    }else{
      return false;
    }
  }

  menuAbierto(){
    console.log('Se abbrio');
  }
}

