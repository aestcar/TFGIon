import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Evento } from '../interfaces/Evento';
import { getDatabase, ref, child, get } from 'firebase/database';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EventosService {
  // private eventosDB: AngularFireList<Evento>;

  constructor(private httpClient: HttpClient) {}

  addEvento(evento: Evento) {
    // const doc = ref(this.dbFire, 'eventos'); // Doc = referencia a la BD + test = path
    // push(doc, evento).then((r) => console.log('evento posteado'));
  }

  addEventoHTTP(evento: Evento) {
    // Hacemos un post y un put para eliminar la key por defecto
    // this.httpClient
    //   .post(
    //     'https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/eventos/' +
    //       evento.nombre +
    //       '.json',
    //     evento
    //   )
    //   .subscribe(() => {
    //     this.httpClient
    //       .put(
    //         'https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/eventos/' +
    //           evento.nombre +
    //           '.json',
    //         evento
    //       )
    //       .subscribe((r) => console.log(r));
    //   });
  }

  getEvents(): Observable<Evento[]> {
    return this.httpClient.get<Evento[]>('http://localhost:3000/events');
  }

  borrarEvento(id: any) {
    // this.httpClient
    //   .delete(
    //     'https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/eventos/' +
    //       id +
    //       '.json'
    //   )
    //   .subscribe((r) => {
    //     console.log(r);
    //   });
  }
}
