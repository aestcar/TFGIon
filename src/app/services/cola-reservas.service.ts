import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cola } from '../interfaces/Cola';

@Injectable({
  providedIn: 'root',
})
export class ColaReservasService {
  // Una vez reservado el libro se encola la peticion de resreva

  // Colas de reservas
  resCola: Cola[];
  colaFiltradaGlobal: Cola[];
  noQuedanUsuarios: boolean;

  constructor(private httpClient: HttpClient) {}

  /* -------------------------------------------------------------------------------------------------------- */

  /**
   * @param {Cola[]} colaAux           Este parámetro contiene todas las colas de reserva de la BD. Se debe actualizar en AdminGestionDeReservas.
   * @param {string} isbn              Es el isbn del libro al que hace referencia.
   * @param {string} idUser            Id del usuario al que le asignaremos la reserva.
   */
  addReservaCola(isbn: string, idUser: string, colaAux: Cola[]) {
    // Añade una reserva en la cola, si no hay cola la crea
    // Si la hay, la añade asi -> id User = [..., ..., ..., new]
    // cambio
    let estruct;

    if (this.hayColaEnBD(colaAux)) {
      if (this.hayColaParaElLibro(isbn, colaAux)) {
        let colaFiltrada = this.filtrarCola(isbn, colaAux);
        console.log('Hay cola filtrada');
        console.log(colaFiltrada);
        let array: string[] = [];
        colaFiltrada.forEach((e) => array.push(e.idUser));
        console.log('Array es');
        console.log(array.toString());
        console.log(array);
        let res = this.quitarComa(array.toString());
        let s;
        if (!res) {
          s = idUser;
        } else {
          s = res + ',' + idUser;
        }
        console.log(s);
        estruct = {
          idUser: s,
          id: isbn,
        };
      } else {
        // NO ENTRA SIEMPRE POR AQI
        // No hay cola filtrada
        estruct = {
          idUser: idUser,
          id: isbn,
        };
      }
    } else {
      // No hay cola
      // ENTRA SIEMPRE POR AQI
      console.log('No hay cola filtrada - O por aqui');
      estruct = {
        isbn: isbn,
        idUser: idUser,
      };
    }

    console.log(estruct);

    // Se suben los cambios a la BD
    this.httpClient
      .post(
        'http://localhost:3000/colareservas/',
        estruct
      )
      .subscribe((res) => console.log(res),
       (err) => console.log(err));
  }

  getCola(): Observable<Cola[]> {
    return this.httpClient.get<Cola[]>('http://localhost:3000/colareservas');
  }

  getColaByIsbn(isbn: string): Observable<Cola[]> {
    return this.httpClient.get<any>('http://localhost:3000/colareservas/'+isbn);
  }

  eliminarElementoColaReservas(isbn: string) {
   return this.httpClient.delete('http://localhost:3000/colareservas/' + isbn);
  }

  /**
   * @summary Comprueba si es el ultimo elemento en la cola de reservas
   * @return true = ultimo, false = quedan más
   */
  esElUltimoElem(arrayRes: string[]) {
    if (arrayRes.length == 1) {
      // Queda 1 elemento, tras la eliminacion no quedará nada
      return true;
    } else {
      return false;
    }
  }

  hayColaEnBD(colaAux: Cola[]): boolean {
    return false;
    // console.log(colaAux);
    // if (!colaAux) {
    //   return false;
    // } else {
    //   return true;
    // }
  }

  hayColaParaElLibro(isbn: string, cola: Cola[]): boolean {
    let colaAux = this.filtrarCola(isbn, cola);
    // Obtenemos si hay cola filtrada, y de paso Set cola filtrada global
    if (Object.entries(colaAux).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  filtrarCola(isbn: string, cola: Cola[]): Cola[] {
    const colaFiltrada = Object.values(cola).filter(
      (reserva) => reserva.id == isbn
    );
    return colaFiltrada;
  }

  quitarComa(s: string): string {
    // A veces el id del usuario se guarda como -> ,asdfioasdbfoa
    // Este método es para eliminar la coma primera si es que la hay
    console.log(s);
    if (s.charAt(0) == ',') {
      s = s.substring(1);
      console.log(s);
      return s;
    } else {
      return s;
    }
  }
}
