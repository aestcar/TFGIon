import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reserva } from '../interfaces/Reserva';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Libro } from '../interfaces/Libro';
import { LibrosService } from './libros.service';

@Injectable({
  providedIn: 'root',
})
export class ReservasService {
  constructor(
    private httpClient: HttpClient,
    private libroService: LibrosService
  ) {}

  addNuevaReserva(id: string, lector: string) {
    const now = new Date();
    const fechaIni = new Date().toLocaleDateString();
    now.setDate(now.getDate() + 15);
    const fechaFin = now.toLocaleDateString();
    const idLector = lector;

    // Construir objeto JSON a actualizar
    const reserva: Reserva = {
      id: fechaIni + 'x' + Math.floor(Math.random() * 10000),
      isbn: id,
      fechaIni: fechaIni,
      fechaFin: fechaFin,
      lectorId: idLector,
    };


    // Posteamos la reserva en /reservas
    return this.httpClient
      .post('http://localhost:3000/reservas/', reserva)
      .subscribe((r) => {
        console.log(r);
      });
  }

  getReservas(userID: string) {
    return this.httpClient
    .get<any>('http://localhost:3000/reservasID/' + userID);
    // .subscribe((r) => {
    //   console.log(r);
    // });;
  }

  deleteReserva(isbn: string) {
    return this.httpClient
      .delete('http://localhost:3000/reservas/' + isbn)
      .subscribe((r) => {
        console.log(r);
      });
  }

  /* --------------------------------------------------------------------------------- */

  getDisponibilidad(isbn: string) {
    return this.httpClient.get<any>(
      'http://localhost:3000/disponibilidades/' + isbn
    );
  }

  /* CAMBIO DE ESTADO */
  // Disponible -> No disponible
  cambiarEstadoaND(isbnAPedir: string, lector: string) {
    const now = new Date();
    const fechaIni = new Date().toLocaleDateString();
    now.setDate(now.getDate() + 15);
    const fechaFin = now.toLocaleDateString();
    const idLector = lector;

    this.httpClient
      .put('http://localhost:3000/disponibilidades/' + isbnAPedir, {
        isbn: isbnAPedir,
        estado: 'No disponible',
      })
      .subscribe((r) => console.log(r));
    // Cambiar estado en el atributo 'disponible' a 'no disponible' de libro
    this.httpClient
      .put('http://localhost:3000/books/' + isbnAPedir, {
        isbn: isbnAPedir,
        disponible: false,
      })
      .subscribe((r) => console.log(r));
  }

  cambiarEstadoaD(isbnAPedir: string, lector: string) {
    const now = new Date();
    const fechaIni = new Date().toLocaleDateString();
    now.setDate(now.getDate() + 15);
    const fechaFin = now.toLocaleDateString();
    const idLector = lector;

    this.httpClient
      .put('http://localhost:3000/disponibilidades/' + isbnAPedir, {
        isbn: isbnAPedir,
        estado: 'Disponible',
      })
      .subscribe((r) => console.log(r));
    // Cambiar estado en el atributo 'disponible' a 'no disponible' de libro
    this.httpClient
      .put('http://localhost:3000/books/' + isbnAPedir, {
        isbn: isbnAPedir,
        disponible: true,
      })
      .subscribe((r) => console.log(r));
  }

  addNuevaDisponibilidad(libro: Libro) {
    const objeto = {
      estado: 'Disponible',
      isbn: libro.isbn,
      localizacion: 'En Biblioteca',
    };

    return this.httpClient.post(
      'https://localhost:3000/disponibilidades/',
      objeto
    );
  }
}
