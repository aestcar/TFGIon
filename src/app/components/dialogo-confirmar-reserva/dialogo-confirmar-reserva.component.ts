import { Component, Inject, OnInit } from '@angular/core';
import { Libro } from 'src/app/interfaces/Libro';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TitulosService } from 'src/app/services/titulos.service';

@Component({
  selector: 'app-dialogo-confirmar-reserva',
  templateUrl: './dialogo-confirmar-reserva.component.html',
  styleUrls: ['./dialogo-confirmar-reserva.component.scss'],
})
export class DialogoConfirmarReservaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {libro: Libro, biblioteca:string}, private tituloService:TitulosService) { }

  ngOnInit() {}

  darFormatoNombre(s){
    return this.tituloService.aplicarNombreEsteticoSimplificado(s.libro.value.titulo.toString());
  }
}
