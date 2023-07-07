import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { isPlatform } from '@ionic/angular';
import { User } from 'firebase/auth';
import { DialogoConfirmarPedirComponent } from 'src/app/components/dialogo-confirmar-pedir/dialogo-confirmar-pedir.component';
import { DialogoConfirmarReservaComponent } from 'src/app/components/dialogo-confirmar-reserva/dialogo-confirmar-reserva.component';
import { ColaReservasService } from 'src/app/services/cola-reservas.service';
import { StorageAndroidService } from 'src/app/services/storage-android.service';
import { Libro } from '../../interfaces/Libro';
import { AutenticacionService } from '../../services/autentication.service';
import { LibrosService } from '../../services/libros.service';
import { ReservasService } from '../../services/reservas.service';
import { TitulosService } from '../../services/titulos.service';

@Component({
  selector: 'app-info-libro',
  templateUrl: './info-libro.component.html',
  styleUrls: ['./info-libro.component.css'],
})
export class InfoLibroComponent implements OnInit {
  libroSeleccionado: Libro;
  currentUser?: User;

  constructor(
    private libroService: LibrosService,
    private tituloService: TitulosService,
    private reservasService: ReservasService,
    private storageService: StorageAndroidService,
    private colaService: ColaReservasService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.libroSeleccionado = this.libroService.getLibroSeleccionado();
  }

  async clickPedir() {
    let libro = this.libroSeleccionado;

    const dialogo = this.dialog.open(DialogoConfirmarPedirComponent, {
      width: '50%',
      data: { libro: libro, biblioteca: 'Biblioteca 66' },
    });

    dialogo.afterClosed().subscribe(async (result) => {
      if (result == true) {
        let lector;
        let lectorID;
        if (isPlatform('mobileweb')) {
          lector = JSON.parse(localStorage.getItem('user'));
          try {
            lectorID = lector.uid;
          } catch (e) {
            alert('Usuario no encontrado');
          }
        } else if (isPlatform('mobile')) {
          lector = await this.storageService.getUser();
          let aux = await JSON.parse(lector);
          lectorID = aux.userId;
        } else {
          lector = JSON.parse(localStorage.getItem('user'));
          try {
            lectorID = lector.uid;
          } catch (e) {
            alert('Usuario no encontrado');
          }
        }

        if (lector && lectorID) {
          this.reservasService.addNuevaReserva(libro.isbn, lectorID);
          this.reservasService.cambiarEstadoaND(libro.isbn, lectorID);
          this.libroSeleccionado.disponible = false;
          alert('Se ha pedido el libro con éxito');
        } else {
          alert(
            'No se ha podido completar la operación, no se detecta el usuario'
          );
        }
      }
    });
  }

  async clickReservar() {
    // let libro = this.libroSeleccionado;
    // // Abre el dialogo selector
    // const dialogo = this.dialog.open(DialogoConfirmarReservaComponent, {
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
    //       lector = JSON.parse(localStorage.getItem('user'));
    //       try {
    //         lectorID = lector.uid;
    //       } catch (e) {
    //         alert('Usuario no encontrado');
    //       }
    //     }
    //     if (lector && lectorID) {
    //       // Obtener cola
    //       let res = this.colaService.getColaHTTP();
    //       res.subscribe((r) => {
    //         try {
    //           if (lector && lectorID) {
    //             this.colaService.addReservaCola(libro.isbn, lectorID, r);
    //           } else {
    //             alert('ERROR, no se ha podido encontrar al usuario');
    //           }
    //         } catch (e) {
    //           alert('Ha habido un error en la reserva');
    //         }
    //       });
    //     } else {
    //       alert(
    //         'No se ha podido completar la operación, no se detecta el usuario'
    //       );
    //     }
    //   }
    // });
  }

  aplicarEsteticos(s: string, i: number) {
    return this.tituloService.aplicarNombreEstetico(s, i);
  }

  quitarNumsYGuion(s: string) {
    return this.tituloService.quitarNumsYGuion(s);
  }
}
