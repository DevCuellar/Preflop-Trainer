import { Component, OnInit, Input } from '@angular/core';
import { EjerciciosService } from '../../services/ejercicios.service';
import { NavbarService } from '../../services/navbar.service';
import { Ejercicio } from '../../clases/ejercicio';
import { MatDialog } from '@angular/material/dialog';
import { delay } from '../../utils/utils';
import {
  EPaginasAplicacion,
  AplicacionService,
} from '../../services/aplicacion.service';

@Component({
  selector: 'dcm-ejercicio',
  templateUrl: './ejercicio.component.html',
  styles: [],
})
export class EjercicioComponent implements OnInit {
  index = 0;
  ejercicio: Ejercicio;
  verTabla: boolean;
  hayIdObjetivo: boolean;

  public animacion = 'slideInRight';

  @Input()
  set idEjercicio(idEjercicio: number) {
    if (idEjercicio) {
      this.index = idEjercicio - 1;
      this.hayIdObjetivo = true;
    }
  }

  get textoSiguiente() {
    if (this.index < this.es.ejercicios.length - 1 && !this.hayIdObjetivo) {
      return 'SIGUIENTE';
    } else {
      return 'RESULTADOS';
    }
  }

  constructor(
    private as: AplicacionService,
    private navService: NavbarService,
    public es: EjerciciosService
  ) {}

  ngOnInit(): void {
    this.cargarEjercicio();
  }

  cargarEjercicio() {
    this.ejercicio = this.es.ejercicios[this.index];
    this.verTabla = this.hayIdObjetivo;
    this.actualizarTitulo();
  }

  async siguiente() {
    if (this.index < this.es.ejercicios.length - 1 && !this.hayIdObjetivo) {
      this.index += 1;
      this.animacion = '';
      this.cargarEjercicio();
    } else {
      this.animacion = 'slideOutLeft';
      await delay(250);
      this.as.irAPagina(EPaginasAplicacion.Resultados);
    }
  }

  async finalizar() {
    this.animacion = 'slideOutLeft';
    await delay(250);
    this.as.irAPagina(EPaginasAplicacion.Resultados);
  }

  validarEjercicio() {
    this.ejercicio.validar();
    this.abrirRango();
  }

  actualizarTitulo() {
    this.navService.setTitulo(
      `Ejercicio ${this.index + 1} de ${this.es.ejercicios.length}`
    );
  }

  abrirRango() {
    this.verTabla = true;
  }
}
