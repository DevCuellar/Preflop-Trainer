import { Injectable } from '@angular/core';
import { RangosService } from './rangos.service';

@Injectable({
  providedIn: 'root'
})
export class AplicacionService {
  get paginaActual() {
    return this._paginaActual;
  }
  get idEjercicioObjetivo() {
    return this._idEjercicioObjetivo;
  }

  private _paginaActual: EPaginasAplicacion;
  private _idEjercicioObjetivo: number;

  constructor(private rs: RangosService) {
    this.rs.construirRangos();
  }

  async iniciarAplicacion() {
    this._paginaActual = EPaginasAplicacion.Configuracion;
  }

  irAPagina(pagina: EPaginasAplicacion, idEjercicio: number = null) {
    this._paginaActual = pagina;
    this._idEjercicioObjetivo = idEjercicio;
  }
}

export enum EPaginasAplicacion {
  Configuracion,
  Ejercicio,
  Resultados
}
