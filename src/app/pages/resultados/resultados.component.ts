import { Component, ViewChild, OnInit } from '@angular/core';
import { EjerciciosService } from '../../services/ejercicios.service';
import { Ejercicio, NUM_MANOS } from '../../clases/ejercicio';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  AplicacionService,
  EPaginasAplicacion,
} from '../../services/aplicacion.service';
import { ConfiguracionService } from '../../services/configuracion.service';
import { NavbarService } from '../../services/navbar.service';
import { Router } from '@angular/router';
import { delay } from 'src/app/utils/utils';

@Component({
  selector: 'dcm-resultados',
  templateUrl: './resultados.component.html',
  styles: [],
})
export class ResultadosComponent implements OnInit {
  ejercicios: Ejercicio[];
  datasource: any;

  porcentajeAciertos: string;
  totalAciertos: number;
  totalErrores: number;

  public animacion = 'slideInRight';

  columnas: string[] = [
    'id',
    'numJugadores',
    'tipoOponente',
    'posicionHero',
    'textoAccionPrevia',
    'stackEfectivo',
    'manosCorrectas',
    'manosIncorrectas',
  ];
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private es: EjerciciosService,
    private as: AplicacionService,
    private navService: NavbarService,
    private router: Router
  ) {
    this.ejercicios = es.ejercicios.filter((e) => e.validado);
    this.datasource = new MatTableDataSource(this.ejercicios);
    this.navService.setTitulo('Resultados');
  }

  ngOnInit() {
    this.datasource.sort = this.sort;
    this.construirTotales();
  }

  construirTotales() {
    this.totalAciertos = this.getTotalAciertos();
    this.totalErrores = this.ejercicios.length * NUM_MANOS - this.totalAciertos;
    let porcAux: number =
      this.ejercicios.length * NUM_MANOS > 0
        ? (this.totalAciertos / (this.ejercicios.length * NUM_MANOS)) * 100
        : 0;
    this.porcentajeAciertos = porcAux.toFixed(1);
  }

  getTotalAciertos() {
    return this.ejercicios
      .map((item) => item.manosCorrectas)
      .reduce((prev, curr) => prev + curr, 0);
  }

  getTotalCorrectas() {
    let sum = this.ejercicios
      .map((item) => item.manosCorrectas)
      .reduce((prev, curr) => prev + curr, 0);
    let total = this.ejercicios.length * NUM_MANOS;
    let porc = total > 0 ? (sum / total) * 100 : 0;

    return `${sum} (${porc.toFixed(1)}%)`;
  }

  getTotalIncorrectas() {
    let sum = this.ejercicios
      .map((item) => item.manosIncorrectas)
      .reduce((prev, curr) => prev + curr, 0);

    let total = this.ejercicios.length * 4;
    let porc = total > 0 ? (sum / total) * 100 : 0;

    return `${sum} (${porc.toFixed(1)}%)`;
  }

  async inicio() {
    this.animacion = 'slideOutLeft';
    await delay(250);
    this.as.irAPagina(EPaginasAplicacion.Configuracion);
  }

  async clickEnRow(row) {
    this.animacion = 'slideOutLeft';
    await delay(250);
    this.as.irAPagina(EPaginasAplicacion.Ejercicio, row.id);
  }
}
