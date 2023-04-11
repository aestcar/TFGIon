import { Component, NgZone, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Evento } from '../../interfaces/Evento';
import { Libro } from '../../interfaces/Libro';
import { EventosService } from '../../services/eventos.service';
import { LibrosService } from '../../services/libros.service';
import { DialogoComponent } from '../../components/dialogo-filtro/dialogo-filtro.component';
import { AutenticacionService } from '../../services/autentication.service';
import { User } from 'firebase/auth';
import { User as IUser } from '../../interfaces/User';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ReservasService } from '../../services/reservas.service';
import { TitulosService } from '../../services/titulos.service';
import { Capacitor } from '@capacitor/core';
import { DialogoConfirmarReservaComponent } from 'src/app/components/dialogo-confirmar-reserva/dialogo-confirmar-reserva.component';
import { DialogoConfirmarPedirComponent } from 'src/app/components/dialogo-confirmar-pedir/dialogo-confirmar-pedir.component';
import { isPlatform } from '@ionic/angular';
import { StorageAndroidService } from 'src/app/services/storage-android.service';
import { ColaReservasService } from 'src/app/services/cola-reservas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // Administracion
  currentUser?: User;
  observer: Observable<IUser>;
  isAdmin: boolean = false;

  // Listas
  lista: Observable<Libro[]>;
  listaFiltrada: Libro[];
  listaEventos: Observable<Evento[]>;

  //Calendario
  monday: number;
  dias: any;
  es: any;
  value: Date;

  // Esteticos
  contadorLibros: number;
  totalLibros: number;

  // Localstorage
  user: any;

  // Orden
  orden: string;
  esOrdenNew: boolean;

  categoria: string;
  iconCat: string;

  // Libro info
  libroSeleccionado: Libro;

  constructor(
    private libroService: LibrosService,
    private eventoService: EventosService,
    private router: Router,
    public dialog: MatDialog,
    private autorizacionService: AutenticacionService,
    private tituloService: TitulosService // private storageService: StorageAndroidService, // private colaService: ColaReservasService
  ) {
    this.contadorLibros = 0;
    this.totalLibros = 60;
  }

  ngOnInit() {
    this.libroService.getLibros().subscribe((lista) => {
      this.lista = this.ordenarListas(lista);
      this.listaFiltrada = lista;
    });

    this.funcionContadorLibros();

    // Autenticacion
    this.user = JSON.parse(localStorage.getItem('user'));

    if (this.user) {
      this.getEsAdmin(this.user.uid).subscribe((res) => {  
        this.isAdmin = res[0].isAdmin;
      });
    }
  }

  // ADMIN
  getEsAdmin(localUID: string) {
    return this.autorizacionService.getUser(localUID);
  }

  adminClick() {
    if (this.isAdmin) {
      this.router.navigate(['/admin']);
    }
  }

  funcionContadorLibros() {
    let duracion = Math.floor(3000 / this.totalLibros);
    let c = setInterval(() => {
      this.contadorLibros += 1;
      if (this.contadorLibros == this.totalLibros) {
        clearInterval(c);
      }
    }, duracion);
  }

  cargarMas() {}

  onEnter() {
    const aBuscar = (<HTMLInputElement>document.getElementById('input')).value;

    if (!aBuscar) {
      this.lista.subscribe((res) => (this.listaFiltrada = res));
    }

    this.libroService
      .getLibrosByName(aBuscar)
      .subscribe((res) => (this.listaFiltrada = res));
  }

  // Filtros...
  filtroClick() {
    // Abre el dialogo selector
    const dialogo = this.dialog.open(DialogoComponent, {
      width: '250px',
    });

    dialogo.afterClosed().subscribe((res) => {
      // Obtiene los valores
      this.orden = res.ordenSeleccionado;
      this.categoria = res.categoriaSeleccionada;

      this.asignarIcono();

      this.libroService
        .getFilteredBooks(this.orden, this.categoria)
        .subscribe((res) => (this.listaFiltrada = res));
    });
  }

  cerrarIcono(s: string) {
    switch (s) {
      case 'categoria':
        delete this.categoria;
        break;
      case 'orden':
        delete this.orden;
        break;
    }
    if (!this.orden && !this.categoria) {
      return this.libroService
        .getLibros()
        .subscribe((res) => (this.listaFiltrada = res));
    }
    if (this.orden && this.categoria) {
      return this.libroService
        .getLibrosOrderedAndCategory(this.orden, this.categoria)
        .subscribe((res) => (this.listaFiltrada = res));
    }
    if (this.orden) {
      return this.libroService.getLibrosOrdered(this.orden).subscribe((res) => {
        this.listaFiltrada = res;
      });
    }
    if (this.categoria) {
      return this.libroService
        .getLibrosCategory(this.categoria)
        .subscribe((res) => (this.listaFiltrada = res));
    }
  }

  asignarIcono() {
    // No se puede hacer un switch ya que conitene includes
    if (!this.categoria) {
    } else if (this.categoria.includes('acción')) {
      this.iconCat = 'speedometer-outline';
    } else if (this.categoria.includes('autobiográficos')) {
      this.iconCat = 'book-outline';
    } else if (this.categoria.includes('autoayuda')) {
      this.iconCat = 'medkit-outline';
    } else if (this.categoria.includes('científicos')) {
      this.iconCat = 'flask-outline';
    } else if (this.categoria.includes('ciencia-ficción')) {
      this.iconCat = 'planet-outline';
    } else if (this.categoria.includes('comic')) {
      this.iconCat = 'library-outline';
    } else if (this.categoria.includes('cuento')) {
      this.iconCat = 'flower-outline';
    } else if (this.categoria.includes('de-viaje')) {
      this.iconCat = 'airplane-outline';
    } else if (this.categoria.includes('deporte')) {
      this.iconCat = 'football-outline';
    } else if (this.categoria.includes('erótico')) {
      this.iconCat = 'heart-outline';
    } else if (this.categoria.includes('ficción')) {
      this.iconCat = 'telescope-outline';
    } else if (this.categoria.includes('historia')) {
      this.iconCat = 'newspaper-outline';
    } else if (this.categoria.includes('humor')) {
      this.iconCat = 'happy-outline';
    } else if (this.categoria.includes('infantil')) {
      this.iconCat = 'rocket-outline';
    } else if (this.categoria.includes('juveniles')) {
      this.iconCat = 'shirt-outline';
    } else if (this.categoria.includes('literatura')) {
      this.iconCat = 'book-outline';
    } else if (this.categoria.includes('poéticos')) {
      this.iconCat = 'rose-outline';
    } else if (this.categoria.includes('religión')) {
      this.iconCat = 'bonfire-outline';
    } else if (this.categoria.includes('romance')) {
      this.iconCat = 'heart-circle-outline';
    } else if (this.categoria.includes('suspense')) {
      this.iconCat = 'walk-outline';
    } else if (this.categoria.includes('nuevo')) {
      this.iconCat = 'sparkles-outline';
    }
  }

  buscar() {}

  pedirClick(libro: Libro) {
    // const dialogo = this.dialog.open(DialogoConfirmarPedirComponent, {
    //   width: '50%',
    //   data: { libro: libro, biblioteca: 'Biblioteca 66' },
    // });
    // dialogo.afterClosed().subscribe(async (result) => {
    //   if (result == true) {
    //     let lector;
    //     let lectorID;
    //     if (isPlatform('mobileweb')) {
    //       lector = JSON.parse(localStorage.getItem('user'));
    //       try {
    //         lectorID = lector.uid;
    //       } catch (e) {
    //         alert('Usuario no encontrado');
    //       }
    //     } else if (isPlatform('mobile')) {
    //       lector = await this.storageService.getUser();
    //       let aux = await JSON.parse(lector);
    //       lectorID = aux.userId;
    //     } else {
    //       // Web
    //       lector = JSON.parse(localStorage.getItem('user'));
    //       try {
    //         lectorID = lector.uid;
    //       } catch (e) {
    //         alert('Usuario no encontrado');
    //       }
    //     }
    //     if (lector && lectorID) {
    //       this.reservasService.addNuevaReserva(libro.isbn, lectorID);
    //       this.reservasService.cambiarEstadoaND(libro.isbn, lectorID);
    //     } else {
    //       alert(
    //         'No se ha podido completar la operación, no se detecta el usuario'
    //       );
    //     }
    //   }
    // });
  }

  reservarClick(libro: Libro) {
    // // Abre el dialogo selector
    // const dialogo = this.dialog.open(DialogoConfirmarReservaComponent, {
    //   width: '50%',
    //   data: { libro: libro, biblioteca: 'Biblioteca 66' },
    // });
    // dialogo.afterClosed().subscribe((result) => {
    //   if (result == true) {
    //     // Obtener lector
    //     let lector;
    //     let lectorID;
    //     if (isPlatform('mobileweb')) {
    //       lector = JSON.parse(localStorage.getItem('user'));
    //       try {
    //         lectorID = lector.uid;
    //       } catch (e) {
    //         alert('Usuario no encontrado');
    //       }
    //     } else if (isPlatform('mobile')) {
    //       lector = this.storageService.getUser();
    //       lectorID = lector.userId;
    //     } else {
    //       // Web
    //       lector = JSON.parse(localStorage.getItem('user'));
    //       try {
    //         lectorID = lector.uid;
    //       } catch (e) {
    //         alert('Usuario no encontrado');
    //       }
    //     }
    //     // Obtener cola
    //     let res = this.colaService.getColaHTTP();
    //     res.subscribe((r) => {
    //       try {
    //         if (lector && lectorID) {
    //           this.colaService.addReservaCola(libro.isbn, lectorID, r);
    //         } else {
    //           alert('ERROR, no se ha podido encontrar al usuario');
    //         }
    //       } catch (e) {
    //         alert('Ha habido un error en la reserva');
    //       }
    //     });
    //   }
    // });
  }

  libroClick(libro: any) {
    // this.libroSeleccionado = libro;
    // this.libroService.setLibroSeleccionado(libro);
    // this.zone.run(() => {
    //   this.router.navigate(['/detalles-libro']);
    // });
  }

  // Esteticos
  aplicarNombreEstetico(s: string, i: number) {
    return this.tituloService.aplicarNombreEstetico(s, i);
  }

  aplicarNombreEsteticoSimplificado(s: string) {
    return this.tituloService.aplicarNombreEsteticoSimplificado(s);
  }

  quitarNumsYGuion(s: string) {
    return this.tituloService.quitarNumsYGuion(s);
  }

  esAndroid(): boolean {
    if (Capacitor.getPlatform() === 'android') {
      return true;
    } else if (window.screen.width < 650) {
      return true;
    } else {
      return false;
    }
  }

  ordenarListas(lista) {
    return lista.sort((a, b) => {
      if (a.titulo < b.titulo) {
        return -1;
      } else if (a.titulo > b.titulo) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
