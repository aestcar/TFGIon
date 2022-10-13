import { Component, NgZone, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Evento } from '../../interfaces/Evento';
import { Libro } from '../../interfaces/Libro';
import { EventosService } from '../../services/eventos.service';
import { LibrosService } from '../../services/libros.service';
import { DialogoComponent } from '../../components/dialogo/dialogo.component';
import { AutenticacionService } from '../../services/autentication.service';
import { User } from 'firebase/auth';
import { Admin } from '../../interfaces/Admin';
import { ReservasService } from '../../services/reservas.service';
import { TitulosService } from '../../services/titulos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Administracion
  currentUser?:User;
  observer:Observable<Admin>;
  isAdmin?:boolean;

  // Listas
  lista: Observable<Array<Libro>>;
  listaEventos: Observable<Array<Evento>>;

  //Calendario
  monday: number;
  dias:any;
  es: any;
  value: Date;

  // Esteticos
  contadorLibros:number;
  totalLibros:number;

  // Localstorage
  name?:string;
  email?:string;
  phone?:string;
  photo?:any;
  uid?:string;

  // Orden
  esOrdenAZ:boolean;

  // Libro info
  libroSeleccionado:Libro;

  constructor(private libroService: LibrosService, private eventoService:EventosService, private router: Router, private zone: NgZone,
     public dialog: MatDialog, private autorizacionService:AutenticacionService, private reservasService:ReservasService,
     private tituloService:TitulosService) { 

    this.lista = this.libroService.getLibros();
    this.listaEventos = this.eventoService.getEventos();

    // Calendario
    this.monday = 1;

    // HTML
    this.contadorLibros = 0;
    this.totalLibros = 60;
  }

  ngOnInit(): void { 
    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","M","X","J","V","S" ],
      monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
      monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
      today: 'Hoy',
      clear: 'Borrar'
    }

    this.funcionContadorLibros();

    // Autenticacion
    this.currentUser = this.autorizacionService.getUser();
    let localUID = localStorage.getItem('userUID');

    if(this.currentUser){
      this.getEsAdmin(this.currentUser!.uid);
    }else if(localUID){
      this.getEsAdmin(localUID);
    }
  }

  // ADMIN
   async getEsAdmin(localUID: string | null):Promise<boolean>{
    let res = await this.autorizacionService.esAdminLocalStorage(localUID);
    res.subscribe((r) => {
      if(r == null){
        this.isAdmin = false;
      }else{
        this.isAdmin = true;
      }
    });
    return false;
  }

  adminClick(){
    if(this.isAdmin){
      this.zone.run(() => {
        this.router.navigate(['/admin']);
      });
    }
  }

  funcionContadorLibros(){
    let duracion = Math.floor(3000 / this.totalLibros);
    let c = setInterval(() =>{
      this.contadorLibros += 1;
      if(this.contadorLibros == this.totalLibros){
        clearInterval(c);
      }
    }, duracion);
  }

  cargarMas(){}

  // Eventos
  onEnter(){
    console.log('ha pulsado enter');
    const aBuscar = (<HTMLInputElement>document.getElementById("input")).value;
    this.lista = this.libroService.buscarLibros(aBuscar);
  }


  filtroClick(){
    console.log(this.isAdmin);
    const dialogo =this.dialog.open(DialogoComponent, {
      width: '250px'
    });

    // Vaciar lista
    this.lista.forEach((e) => e.pop());

    dialogo.afterClosed().subscribe(() => {
      let orden = dialogo.componentInstance.getOrden();

      if(orden.includes('0')){
        this.lista = this.libroService.getLibrosOrdenadosAZ();
        this.esOrdenAZ = true;
      }else if(orden.includes('1')){
        // Solo cambia el boolean y por tanto el HTML asociado
        this.lista = this.libroService.getLibrosOrdenadosAZ();
        this.esOrdenAZ = false;
      }else if(orden.includes('2')){
        this.lista = this.libroService.getLibrosNuevos();
      }
    });
  }

  buscar(){} 

  pedirClick(libro:Libro){
    console.log('Pedir click');
    let lector;
    let localUID = localStorage.getItem('userUID');
    if(this.currentUser){
      lector = this.currentUser.uid;
    }else if(localUID){
      lector = localUID;
    }

    if(lector){
      this.reservasService.addNuevaReserva(libro.isbn, lector);
      this.reservasService.cambiarEstadoaND(libro.isbn, lector);
    }else{
      alert('No se ha podido completar la operación, no se detecta el usuario');
    }
  }

  reservarClick(){

  }

  libroClick(libro:any){
    this.libroSeleccionado = libro;
    this.libroService.setLibroSeleccionado(libro);
    this.zone.run(() => {
      this.router.navigate(['/detalles-libro']);
    });
  }

  // Idiomas
  valenciaClick(){}
  espanolClick(){}
  englishClick(){}

  redClick(letra:string){
    switch(letra){
      case 'f':{
        window.location.href = 'https://facebook.com';
        break;
      }
      case 'i':{
        window.location.href = 'https://instagram.com';
        break;
      }
      case 't':{
        window.location.href = 'https://twitter.com';
        break;
      }
      case 'y':{
        window.location.href = 'https://youtube.com';
        break;
      }
    }
  }

  // Esteticos 
  aplicarNombreEstetico(s:string){
    return this.tituloService.aplicarNombreEstetico(s);
  }

  aplicarNombreEsteticoSimplificado(s:string){
    return this.tituloService.aplicarNombreEsteticoSimplificado(s);
  }

}
