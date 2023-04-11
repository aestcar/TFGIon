import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-filtro',
  templateUrl: './dialogo-filtro.component.html',
  styleUrls: ['./dialogo-filtro.component.css'],
})
export class DialogoComponent implements OnInit {
  ordenSeleccionado: string;
  categoriaSeleccionada: string;

  orden: any[] = [
    { value: 'asc', viewValue: 'A-Z' },
    { value: 'desc', viewValue: 'Z-A' }
  ];

  categorias: any[] = [
    { value: 'acción-0', viewValue: 'Acción' },
    { value: 'autobiográficos-1', viewValue: 'Autobiográficos' },
    { value: 'autoayuda-2', viewValue: 'Autoayuda' },
    { value: 'científicos-3', viewValue: 'Científicos' },
    { value: 'ciencia-ficción-4', viewValue: 'Ciencia Ficción' },
    { value: 'comic-5', viewValue: 'Comic' },
    { value: 'cuento-6', viewValue: 'Cuento' },
    { value: 'de-viaje-7', viewValue: 'De Viaje' },
    { value: 'deporte-8', viewValue: 'Deporte' },
    { value: 'erótico-9', viewValue: 'Erótico' },
    { value: 'ficción-10', viewValue: 'Ficción' },
    { value: 'historia-11', viewValue: 'Historia' },
    { value: 'humor-12', viewValue: 'Humor' },
    { value: 'infantil-20', viewValue: 'Infantil' },
    { value: 'juveniles-13', viewValue: 'Juveniles' },
    { value: 'literatura-14', viewValue: 'Literatura' },
    { value: 'nuevo-15', viewValue: 'Nuevo' },
    { value: 'poéticos-16', viewValue: 'Poéticos' },
    { value: 'religión-17', viewValue: 'Religión' },
    { value: 'romance-18', viewValue: 'Romance' },
    { value: 'suspense-19', viewValue: 'Suspense' },
  ];

  constructor() {}

  ngOnInit(): void {}

  ordenCambiado(orden: any) {
    this.ordenSeleccionado = orden;
  }

  categoriaCambiada(cat: any) {
    this.categoriaSeleccionada = cat;
  }
}
