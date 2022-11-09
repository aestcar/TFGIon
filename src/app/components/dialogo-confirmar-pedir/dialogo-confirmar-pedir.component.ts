import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Libro } from 'src/app/interfaces/Libro';
import { TitulosService } from 'src/app/services/titulos.service';

@Component({
  selector: 'app-dialogo-confirmar-pedir',
  templateUrl: './dialogo-confirmar-pedir.component.html',
  styleUrls: ['./dialogo-confirmar-pedir.component.scss'],
})
export class DialogoConfirmarPedirComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {libro: Libro, biblioteca:string}, private tituloService:TitulosService) { }

  ngOnInit() {}

  clickPedir(){}

  darFormatoNombre(s:string){
    return this.tituloService.aplicarNombreEsteticoSimplificado(s);
  }

}
