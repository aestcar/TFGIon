import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Evento } from '../interfaces/Evento';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EventosService {
  // private eventosDB: AngularFireList<Evento>;

  constructor(private httpClient: HttpClient) {}

  addEvento(evento: Evento) {
    this.httpClient
      .post('http://localhost:3000/events/', evento)
      .subscribe((r) => console.log(r));
  }

  getEvents(): Observable<Evento[]> {
    return this.httpClient.get<Evento[]>('http://localhost:3000/events');
  }

  borrarEvento(id: any) {
    this.httpClient
      .delete('http://localhost:3000/events/' + id)
      .subscribe((r) => {
        console.log(r);
      });
  }
}
