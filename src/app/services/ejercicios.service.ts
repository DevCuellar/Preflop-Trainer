import { Injectable } from '@angular/core';
import { ConfiguracionService } from './configuracion.service';
import { RangosService } from './rangos.service';
import { FiltradorRango } from '../clases/filtradorRango';
import { IRango } from '../utils/interfaces';
import { Ejercicio } from '../clases/ejercicio';
import { dameAleatorio } from '../utils/utils';
import { AplicacionService } from './aplicacion.service';

@Injectable({
  providedIn: 'root'
})
export class EjerciciosService {
  public ejerciciosIniciados: boolean;

  get ejercicios() {
    return this._ejercicios;
  }

  private rangosPosibles: IRango[];
  private _ejercicios: Ejercicio[];
  constructor(
    private rs: RangosService,
    private cs: ConfiguracionService,
    private as: AplicacionService
  ) {}

  iniciarEjercicios() {
    this.ejerciciosIniciados = false;
    this._ejercicios = [];
    this.rangosPosibles = FiltradorRango.filtrarRangos(
      this.rs.rangos,
      this.cs.config
    );
    if (this.rangosPosibles.length === 0) {
      // Esto habría que controlarlo, aunque debería haber siempre...
    } else {
      this.rellenarEjercicios(this.cs.config.numEjercicios);
      this.ejerciciosIniciados = true;
    }
  }

  rellenarEjercicios(cuantos: number) {
    for (let i = 0; i < cuantos; i++) {
      if (this._ejercicios.length < this.cs.config.numEjercicios) {
        const ejercicio = this.dameEjercicio();
        ejercicio.id = i + 1;
        this._ejercicios.push(ejercicio);
      } else {
        break;
      }
    }
  }

  dameEjercicio() {
    const rnd = dameAleatorio(0, this.rangosPosibles.length - 1);
    let ejercicio: Ejercicio = new Ejercicio();
    ejercicio.construirEjercicio(this.rangosPosibles[rnd]);
    return ejercicio;
  }
}
