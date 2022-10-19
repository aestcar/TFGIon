import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from 'src/app/interfaces/Evento';
import { EventosService } from 'src/app/services/eventos.service';
import { TitulosService } from 'src/app/services/titulos.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {

  listaEventos: Observable<Array<Evento>>;

  constructor(private eventoService:EventosService, private tituloService:TitulosService) { 
    this.listaEventos = this.eventoService.getEventos();
  }

  ngOnInit() {}

   // Esteticos 
   aplicarNombreEstetico(s:string, i:number){
    return this.tituloService.aplicarNombreEstetico(s, i);
  }

  aplicarNombreEsteticoSimplificado(s:string){
    return this.tituloService.aplicarNombreEsteticoSimplificado(s);
  }

  quitarNumsYGuion(s:string){
    return this.tituloService.quitarNumsYGuion(s);
  }

}
