import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Cola } from '../interfaces/Cola';

@Injectable({
  providedIn: 'root'
})
export class ColaReservasService {

  // Una vez reservado el libro se encola la peticion de resreva

  private colaDB: AngularFireList<any>;

  // Colas de reservas
  resCola:Cola[];
  colaFiltradaGlobal:Cola[];
  noQuedanUsuarios:boolean;

  constructor(private httpClient:HttpClient, private db: AngularFireDatabase) {
    this.colaDB = this.db.list('/colareservas', (ref) =>
      ref.orderByChild('id'));
  }

  obtenerColaInicializada():Observable<Cola[]>{
    // Obtener todas las colasDe reservas
    return this.getColaHTTP();
  }

  /* -------------------------------------------------------------------------------------------------------- */

  /**
   * @param {Cola[]} colaAux           Este parámetro contiene todas las colas de reserva de la BD. Se debe actualizar en AdminGestionDeReservas.
   * @param {string} isbn              Es el isbn del libro al que hace referencia.
   * @param {string} idUser            Id del usuario al que le asignaremos la reserva.
  */
  addReservaCola(isbn:string, idUser:string, colaAux:Cola[]){
    // Añade una reserva en la cola, si no hay cola la crea
    // Si la hay, la añade asi -> id User = [..., ..., ..., new]
    // cambio
    let estruct : Cola;

    if(this.hayColaEnBD(colaAux)){
      if(this.hayColaParaElLibro(isbn, colaAux)){
        let colaFiltrada = this.filtrarCola(isbn, colaAux);
        console.log('Hay cola filtrada');
        console.log(colaFiltrada);
        let array:string[] = [];
        colaFiltrada.forEach(e => array.push(e.idUser)); 
        console.log('Array es');
        console.log(array.toString());
        console.log(array);
        let res = this.quitarComa(array.toString());
        let s;
        if(!res){
          s = idUser;
        }else{
          s = res + ',' + idUser;
        }
        console.log(s);
        estruct = {
          idUser : s,
          id:isbn
        }
      }else{
          // No hay cola filtrada
        console.log('No hay cola filtrada');
        console.log(idUser);
        estruct = {
          idUser : idUser,
          id:isbn
        }
      }  
    }else{
        // No hay cola
        console.log('No hay cola');
        estruct = {
          idUser : idUser,
          id:isbn
        }
    }
    
    // Se suben los cambios a la BD
    this.httpClient.post('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/colareservas/'+isbn+'.json', estruct)
    .subscribe(() => {
      this.httpClient.put('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/colareservas/'+isbn+'.json', estruct)
      .subscribe(() => alert('Se ha reservado el libro con éxito'));
    });
  }
  
  getColaHTTP(): Observable<Cola[]>{
    return this.httpClient.get<Cola[]>('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/colareservas.json');
  }

  /* -------------------------------------------------------------------------------------------------------- */

  obtenerElementosColaReservas(isbn:string){
    // Obtenemos el id del usuario = elementos de la cola de reservas
    return this.httpClient.get('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/colareservas/'+isbn+'/idUser.json');
  }

  eliminarElementoColaReservas(isbn:string, arrayRes:string[]){
      if(arrayRes.length == 1){
        console.log('Entra por 1 --');
        // Se debe eliminar el id de ese libro y su cola de idsUsuarios en este caso 1 (Es decir, todo)
        this.httpClient.delete('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/colareservas/'+isbn+'.json')
        .subscribe(r => console.log(r));
      }else if(arrayRes.length > 1){
        console.log('Entra por 2 --');
        // Se debe desapilar un elemento de la cola de idsUsuarios, se elimina el ultimo elemento
        arrayRes.pop();
        console.log('Se ha eliminado?');
        console.log(arrayRes);
        // Y subir cambios a la BD
        let estruct = {
          id:isbn,
          idUser : arrayRes.toString()
        }

        // Se suben los cambios a la BD
        this.httpClient.put('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/colareservas/'+isbn+'.json',estruct)
          .subscribe(() => alert('Se ha devuelto el libro con éxito'));
      }
  }

  /**
   * @summary Comprueba si es el ultimo elemento en la cola de reservas
   * @return true = ultimo, false = quedan más
   */
  esElUltimoElem(arrayRes:string[]){
    if(arrayRes.length == 1){
        // Queda 1 elemento, tras la eliminacion no quedará nada
        return true;
    }else{
        return false;
    }
  }

  hayColaEnBD(colaAux:Cola[]):boolean{
    console.log(colaAux);
    if(!colaAux){return false;}
    else{return true;}
  }

  hayColaParaElLibro(isbn:string, cola:Cola[]):boolean{
    let colaAux = this.filtrarCola(isbn, cola);
    // Obtenemos si hay cola filtrada, y de paso Set cola filtrada global
    if(Object.entries(colaAux).length > 0){
      return true;
    }else{
      return false;
    }
  }

  filtrarCola(isbn:string, cola:Cola[]):Cola[]{
    const colaFiltrada = Object.values(cola).filter(  
      reserva => reserva.id == isbn
    );
    return colaFiltrada;
  }

  quitarComa(s:string):string{
    // A veces el id del usuario se guarda como -> ,asdfioasdbfoa
    // Este método es para eliminar la coma primera si es que la hay
    console.log(s);
    if(s.charAt(0) == ','){
      s = s.substring(1);
      console.log(s);
      return s;
    }else{
      return s;
    }
  }
}
