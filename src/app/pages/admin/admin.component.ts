import { Component, OnInit } from '@angular/core';
import { _isNumberValue } from '@angular/cdk/coercion';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  // General
  subirLibroActivado: boolean;
  borrarLibroActivado: boolean;
  subirEventoActivado: boolean;
  borrarEventoActivado: boolean;
  subirPersActivado: boolean;
  bajarPersActivado: boolean;
  gestionActivado: boolean;
  erroresActivado: boolean;

  constructor() {
    this.subirLibroActivado = false;
    this.borrarLibroActivado = false;
    this.subirEventoActivado = false;
    this.subirPersActivado = false;
    this.bajarPersActivado = false;
    this.borrarEventoActivado = false;
    this.gestionActivado = false;
    this.erroresActivado = false;
  }

  ngOnInit(): void {}

  /* --------------- GENERAL ---------------*/
  activarSubirLibro() {
    this.subirLibroActivado = true;
  }

  activarBorrarLibro() {
    this.borrarLibroActivado = true;
  }

  activarSubirEvento() {
    this.subirEventoActivado = true;
  }

  activarBorrarEvento() {
    console.log('Borrar Evento');
    this.borrarEventoActivado = true;
  }

  activarGestion() {
    this.gestionActivado = true;
  }

  activarGestionErrores() {
    this.erroresActivado = true;
  }
}
