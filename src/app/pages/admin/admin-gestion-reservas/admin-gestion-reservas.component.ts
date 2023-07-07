import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminComponent } from '../admin.component';
import { Cola } from '../../../interfaces/Cola';
import { Reserva } from '../../../interfaces/Reserva';
import { AutenticacionService } from '../../../services/autentication.service';
import { ColaReservasService } from '../../../services/cola-reservas.service';
import { ReservasService } from '../../../services/reservas.service';
import { LibrosService } from 'src/app/services/libros.service';

@Component({
  selector: 'app-admin-gestion-reservas',
  templateUrl: './admin-gestion-reservas.component.html',
  styleUrls: ['./admin-gestion-reservas.component.css'],
})
export class AdminGestionReservasComponent implements OnInit {
  subirReservaActivo: boolean;
  reservas: Observable<Reserva[]>;
  valorInputGR: string;
  valorInputUser: string;
  existeLibro: boolean;
  resDisponibilidad: any;
  usuarioEncontrado: boolean;
  resUsuario: any;

  // Obtener la cola de reservas
  obsCola?: Observable<Cola[]>;
  // Se debe ir actualizando su valor
  // ColaAUX = cola con todo
  colaAux: Cola[];

  constructor(
    private autenticacionService: AutenticacionService,
    private reservasService: ReservasService,
    private libroService: LibrosService,
    private adminComponent: AdminComponent,
    private colaService: ColaReservasService
  ) {}

  ngOnInit(): void {}

  // -------------------------------------------------------------------------------

  atrasDesdeGestion() {
    this.adminComponent.gestionActivado = false;
  }

  async buscarUsuario() {
    // Checkear Inputs
    this.autenticacionService.getUser(this.valorInputUser).subscribe((res) => {
      this.usuarioEncontrado = true;
      this.resUsuario = res[0];
    });
  }

  buscarDisponibilidadLibro() {
    //  isbn = this.valorInputGR;
    this.reservasService
      .getDisponibilidad(this.valorInputGR)
      .subscribe((res) => {
        this.resDisponibilidad = res[0];
        this.existeLibro = true;
      });
  }

  pedirLibro(isbnAPedir: string) {
    // Pides un libro cuando está disponible
    this.reservasService.cambiarEstadoaND(isbnAPedir, this.valorInputUser);
    this.resDisponibilidad.estado = 'No disponible';
    this.reservasService.addNuevaReserva(isbnAPedir, this.valorInputUser);
  }

  async seHaDevuelto(isbnADevolver: string) {
    this.colaService.getColaByIsbn(isbnADevolver).subscribe((res) => {
      console.log(res);
      if (res.length === 0) {
        // No hay cola para ese isbn
        this.reservasService.cambiarEstadoaD(
          isbnADevolver,
          this.valorInputUser
        );
        this.resDisponibilidad.estado = 'Disponible';
        this.reservasService.deleteReserva(isbnADevolver);
      } else {
        this.reservasService.deleteReserva(isbnADevolver);
        this.colaService.eliminarElementoColaReservas(isbnADevolver).subscribe(a => {
          console.log(a);
          this.colaService.getColaByIsbn(isbnADevolver).subscribe((res) => {
            const lastReserva = res[0];
            this.reservasService.addNuevaReserva(
              isbnADevolver,
              lastReserva.idUser
            );
          });
        });
      }
    }, err => console.log('UN PUTISIMO ERROR BRO', err), );
  }

  reservarLibro(isbnADevolver: string) {
    // Añadimos la reserva y actualizamos el valor de colaAUX
    try {
      this.colaService.addReservaCola(isbnADevolver, this.valorInputUser, []);
    } catch (e) {
      console.log(e);
      console.log('No se ha podido actualizar aux');
    }
  }
}
