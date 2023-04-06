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

  constructor(private httpClient: HttpClient) { }

  // -------------------------------------------------------------------------------------------

  addLibro(libro: Libro) {
    // const doc = ref(this.dbFire, 'libros'); // Doc = referencia a la BD + test = path
    // push(doc, libro).then((r) => console.log('libro posteado'));
  }

  addLibroHTTP(libro: Libro) {
    // Hacemos un post y un put para eliminar la key por defecto
    // this.httpClient
    //   .post(
    //     'https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/libros/' +
    //       libro.isbn +
    //       '.json',
    //     libro
    //   )
    //   .subscribe(() => {
    //     this.httpClient
    //       .put(
    //         'https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/libros/' +
    //           libro.isbn +
    //           '.json',
    //         libro
    //       )
    //       .subscribe((r) => console.log(r));
    //   });
  }

  getLibros(): Observable<Libro[]> {
    return this.httpClient.get<Libro[]>('http://localhost:3000/api');
  }

  getUserFromPayload(payload: any): Libro {
    return {
      $key: payload.key,
      ...payload.val(),
    };
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

  filterLibrosOrdenados(
    listaLibros: Libro[],
    ordenNuevo: string,
    ordenViejo: string,
    categoria: string
  ) {
    if (!categoria) {
      if (ordenNuevo !== ordenViejo) {
        if (ordenNuevo === 'az-0') {
          return listaLibros;
        } else {
          return listaLibros.reverse();
        }
      } else {
        return listaLibros;
      }
    }
    return null;
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
  buscarLibros(aBuscar: string) {
    // console.log('Buscando ' + aBuscar);
    // this.librosDB = this.db.list('/libros', (ref) =>
    //   ref
    //     .orderByChild('titulo')
    //     .startAt(aBuscar.toLowerCase())
    //     .endAt(aBuscar.toLowerCase() + '\uf8ff')
    // );
    // console.log(this.librosDB);
    // return this.getLibros();
  }

  // -------------------------------------------------------------------------------------------
  setLibroSeleccionado(libro: Libro) {
    // this.libroSeleccionado = libro;
  }

  getLibroSeleccionado() {
    // return this.libroSeleccionado;
  }
}
