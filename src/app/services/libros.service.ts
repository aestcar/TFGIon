import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { toArray, map, switchMap } from 'rxjs/operators';
import { Libro } from '../interfaces/Libro';
import { getDatabase, ref, child, get, orderByChild } from 'firebase/database';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LibrosService {
  // private libroSeleccionado: Libro;

  constructor(private httpClient: HttpClient) {}

  addLibro(libro: Libro) {
    this.httpClient.post(
      'http://localhost:3000/books/' + libro.isbn + '.json',
      libro
    );
  }

  getLibros(): Observable<Libro[]> {
    return this.httpClient.get<Libro[]>('http://localhost:3000/books');
  }

  getLibrosByName(name: string) {
    return this.httpClient.get<Libro[]>(
      'http://localhost:3000/books/name/' + name
    );
  }

  getLibrosOrdered(order: string): Observable<Libro[]> {
    return this.httpClient.get<Libro[]>(
      'http://localhost:3000/books/order/' + order
    );
  }

  getLibrosCategory(category: string): Observable<Libro[]> {
    return this.httpClient.get<Libro[]>(
      'http://localhost:3000/books/category/' + category
    );
  }

  getLibrosOrderedAndCategory(order: string, category: string) {
    return this.httpClient.get<Libro[]>(
      'http://localhost:3000/books/category/' + category + '/order/' + order
    );
  }

  borrarLibro(isbn: string) {
    // this.httpClient
    //   .delete(
    //     'https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/libros/' +
    //       isbn +
    //       '.json'
    //   )
    //   .subscribe((r) => {
    //     console.log(r);
    //   });
    // // Borrar tmb disponibilidad del mismo
    // this.httpClient
    //   .delete(
    //     'https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/disponibilidad/' +
    //       isbn +
    //       '.json'
    //   )
    //   .subscribe((r) => {
    //     console.log(r);
    //   });
  }

  // -------------------------------------------------------------------------------------------

  getFilteredBooks(orden: string, categoria: string) {
    if (!orden && !categoria) {
      return;
    } else if (orden && !categoria) {
      return this.getLibrosOrdered(orden);
    } else if (!orden && categoria) {
      return this.getLibrosCategory(categoria);
    } else {
      return this.getLibrosOrderedAndCategory(orden, categoria);
    }
  }

  getLibrosNuevos() {
    // this.librosDBOrdenadosAZ = this.db.list('/libros', (ref) =>
    //   ref.orderByChild('categoria').startAt('nuevo-15').endAt('nuevo-15')
    // );
    // return this.librosDBOrdenadosAZ
    //   .snapshotChanges()
    //   .pipe(
    //     map((changes) => changes.map((c) => this.getUserFromPayload(c.payload)))
    //   );
  }

  getLibrosPorCategoria(id: string) {
    // this.librosDBOrdenadosAZ = this.db.list('/libros', (ref) =>
    //   ref.orderByChild('categoria').startAt(id).endAt(id)
    // );
    // return this.librosDBOrdenadosAZ
    //   .snapshotChanges()
    //   .pipe(
    //     map((changes) => changes.map((c) => this.getUserFromPayload(c.payload)))
    //   );
  }

  // -------------------------------------------------------------------------------------------
  setLibroSeleccionado(libro: Libro) {
    // this.libroSeleccionado = libro;
  }

  getLibroSeleccionado() {
    // return this.libroSeleccionado;
  }
}
