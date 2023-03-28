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

  constructor(
    // private db: AngularFireDatabase,
    // private dbFire: Database,
    // private httpClient: HttpClient
  ) {
    // this.eventosDB = this.db.list('/eventos', (ref) => ref.orderByChild('id'));
  }

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

  async getLibros(): Promise<Observable<any>> {
    const dbRef = ref(getDatabase());
    try {
      const snapshot = await get(child(dbRef, `libros/`));
      if (snapshot.exists()) {
        console.log(snapshot.val());
        return from(Promise.resolve(snapshot.val()));
      } else {
        console.log('No data available');
        return from(Promise.resolve(null));
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getUserFromPayload(payload: any): Evento {
    return {
      $key: payload.key,
      ...payload.val(),
    };
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
