import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from 'src/app/interfaces/Evento';
import { EventosService } from 'src/app/services/eventos.service';
import { TitulosService } from 'src/app/services/titulos.service';
import { AdminComponent } from '../admin.component';

@Component({
  selector: 'app-admin-borrar-evento',
  templateUrl: './admin-borrar-evento.component.html',
  styleUrls: ['./admin-borrar-evento.component.css'],
})
export class AdminBorrarEventoComponent implements OnInit {
  eventos: Evento[];
  displayedColumnsEv: string[] = ['nombre', 'descripcion'];
  filaEvABorrar: any;
  idABorrar: string;
  nombreABorrar: string;

  constructor(
    private eventoServicio: EventosService,
    private adminComponent: AdminComponent,
    private tituloService: TitulosService
  ) {}

  ngOnInit(): void {
    this.eventoServicio.getEvents().subscribe((res) => {
      this.eventos = res;
    });
  }

  async clickBorrarEvento() {
    const eventos = this.eventos;
    this.eventos = eventos.filter((ev) => ev.id != this.idABorrar);
    this.eventoServicio.borrarEvento(this.idABorrar);
    alert('Se ha borrado el evento con éxito');

    // Borrar Valor Boton
    this.filaEvABorrar = '';
    this.idABorrar = '';
    this.nombreABorrar = '';
  }

  atrasDesdeBorrarEv() {
    this.adminComponent.borrarEventoActivado = false;
  }

  filaEvClick(row: any) {
    this.filaEvABorrar = row;
    this.idABorrar = row.id;
    this.nombreABorrar = row.nombre;
  }

  aplicarNombreEstetico(s: any, i: number) {
    if (typeof s === 'string') {
      return this.tituloService.aplicarNombreEstetico(s, i);
    } else {
      return '';
    }
  }

  nombreAMayus(s: string) {
    return this.tituloService.aplicarNombreEsteticoSimplificado(s);
  }
}
