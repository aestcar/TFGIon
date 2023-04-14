import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminComponent } from '../admin.component';
import { Problema } from '../../../interfaces/Problema';
import { ErroresService } from '../../../services/errores.service';
import { TitulosService } from '../../../services/titulos.service';

@Component({
  selector: 'app-admin-gestion-errores',
  templateUrl: './admin-gestion-errores.component.html',
  styleUrls: ['./admin-gestion-errores.component.css'],
})
export class AdminGestionErroresComponent implements OnInit {
  errores: Problema[];
  errorSeleccionado: Problema;
  index?: number;

  constructor(
    private adminComponent: AdminComponent,
    private erroresService: ErroresService,
    private tituloService: TitulosService
  ) {}

  ngOnInit(): void {
    this.erroresService.getErrores().subscribe(res => this.errores = res);
  }

  atrasDesdeGestion() {
    this.adminComponent.erroresActivado = false;
  }

  itemClick(error: Problema, indice: number) {
    this.errorSeleccionado = error;
    console.log(indice);
    this.index = indice + 1;
  }

  aplicarNombreEstetico(s: any, i: number) {
    if (!this.errorSeleccionado) {
      return '';
    } else if (this.errorSeleccionado.msg == '') {
      return '';
    }
    return this.tituloService.aplicarNombreEstetico(s.msg, i);
  }

  borrar(errorSeleccionado: Problema) {
    this.erroresService.borrarError(errorSeleccionado);
    const errores = this.errores;
    this.errores = errores.filter((err) => err.id != this.errorSeleccionado.id);
    delete this.index;
    this.errorSeleccionado.msg = '';
  }
}
