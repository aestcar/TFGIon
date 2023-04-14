import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Problema } from '../interfaces/Problema';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ErroresService {
  constructor(private httpClient: HttpClient) {}

  subirError(error: any) {
    this.httpClient
      .post('http://localhost:3000/errors', error)
      .subscribe((r) => console.log(r));
  }

  getErrores(): Observable<Problema[]> {
    return this.httpClient.get<Problema[]>('http://localhost:3000/errors');
  }

  borrarError(errora: Problema) {
    return this.httpClient
      .delete('http://localhost:3000/errors/' + errora.id)
      .subscribe((r) => console.log(r));
  }
}
