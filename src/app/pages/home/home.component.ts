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
  esOrdenAZ:boolean; // Controla el reverse
  esOrdenAZIcon:boolean;
  esOrdenZA:boolean;
  esOrdenNew:boolean;

  categoria:string;
  iconCat:string;

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

  // Filtros...
  filtroClick(){
    // Abre el dialogo selector
    const dialogo =this.dialog.open(DialogoComponent, {
      width: '250px'
    });

    // Vaciar lista
    this.lista.forEach((e) => e.pop());

    dialogo.afterClosed().subscribe(() => {
      // Obtiene los valores
      let orden = dialogo.componentInstance.getOrden();
      let cat = dialogo.componentInstance.getCategoria();

      // Si no hay categoria solo se Comprobar orden
      if(!cat){
        if(!orden){}
        else if(orden.includes('0')){
          console.log('entra por 0');
          this.lista = this.libroService.getLibrosOrdenadosAZ();
          this.esOrdenAZ = true;
          this.esOrdenAZIcon = true;
        }else if(orden.includes('1')){
          // Solo cambia el boolean y por tanto el HTML asociado
          this.lista = this.libroService.getLibrosOrdenadosAZ();
          console.log('es orden 1');
          this.esOrdenAZ = false;
          this.esOrdenZA = true;
        }else if(orden.includes('2')){
          console.log('entra por 2');
          this.esOrdenNew = true;
          this.lista = this.libroService.getLibrosNuevos();
        }
      }

      // Comprobar categoria
      if(cat){
       this.categoria = cat;
        this.asignarIcono();
        this.lista = this.libroService.getLibrosPorCategoria(cat);

        // El orden da igual siempre es A-Z
        if(!orden){}
        if(orden.includes('0')){
          this.esOrdenAZ = false;
          this.esOrdenAZIcon = true;
        }else if(orden.includes('1')){
          // Solo cambia el boolean y por tanto el HTML asociado
          this.esOrdenAZ = true;
          this.esOrdenAZIcon = false;
          this.esOrdenZA = true;
        }else if(orden.includes('2')){
          this.esOrdenNew = true;
        }
      }
    });
  }

  cerrarIcono(s:string){
    if(s == 'za'){
      this.esOrdenZA = false;
    }else if(s == 'az'){
      this.esOrdenAZIcon = false;
    }else if(s == 'new'){
      this.esOrdenNew = false;
      this.lista = this.libroService.getLibros();
    }else if(s == 'cat'){
      this.categoria = '';
      this.lista = this.libroService.getLibrosOrdenadosAZ();
    }
  }

  asignarIcono(){
    if(!this.categoria){}
    else if(this.categoria.includes('acción')){ console.log('cambiado'); this.iconCat = "speedometer-outline" }
    else if(this.categoria.includes('autobiográficos')){ this.iconCat = "book-outline" }
    else if(this.categoria.includes('autoayuda')){ this.iconCat = "medkit-outline" }
    else if(this.categoria.includes('científicos')){ this.iconCat = "flask-outline" }
    else if(this.categoria.includes('ciencia-ficción')){ this.iconCat = "planet-outline" }
    else if(this.categoria.includes('comic')){ this.iconCat = "library-outline" }
    else if(this.categoria.includes('cuento')){ this.iconCat = "flower-outline" }
    else if(this.categoria.includes('de-viaje')){ this.iconCat = "airplane-outline" }
    else if(this.categoria.includes('deporte')){ this.iconCat = "football-outline" }
    else if(this.categoria.includes('erótico')){ this.iconCat = "heart-outline" }
    else if(this.categoria.includes('ficción')){ this.iconCat = "telescope-outline" }
    else if(this.categoria.includes('historia')){ this.iconCat = "newspaper-outline" }
    else if(this.categoria.includes('humor')){ this.iconCat = "happy-outline" }
    else if(this.categoria.includes('infantil')){ this.iconCat = "rocket-outline" }
    else if(this.categoria.includes('juveniles')){ this.iconCat = "shirt-outline" }
    else if(this.categoria.includes('literatura')){ this.iconCat = "book-outline" }
    else if(this.categoria.includes('poéticos')){ this.iconCat = "rose-outline" }
    else if(this.categoria.includes('religión')){ this.iconCat = "bonfire-outline" }
    else if(this.categoria.includes('romance')){ this.iconCat = "heart-circle-outline" }
    else if(this.categoria.includes('suspense')){ this.iconCat = "walk-outline" }
    else if(this.categoria.includes('nuevo')){ this.iconCat = "sparkles-outline" }
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
  aplicarNombreEstetico(s:string, i:number){
    return this.tituloService.aplicarNombreEstetico(s, i);
  }

  aplicarNombreEsteticoSimplificado(s:string){
    return this.tituloService.aplicarNombreEsteticoSimplificado(s);
  }

  quitarNumsYGuion(s:string){
    return this.tituloService.quitarNumsYGuion(s);
  }
}
