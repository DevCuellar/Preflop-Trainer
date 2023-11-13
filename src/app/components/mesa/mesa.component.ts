import { Component, Input } from '@angular/core';
import { IMesa } from 'src/app/utils/interfaces';
import { DatosJugador } from '../../utils/interfaces';
import { ENumJugadores, EPosicion } from 'src/app/utils/enums';
import { dameAleatorio } from '../../utils/utils';
import { Globals } from '../../globals';

@Component({
  selector: 'dcm-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.scss'],
})
export class MesaComponent {
  mesa: IMesa;
  posicionBTN: number; // 0 hero, 1 player1, 2 player2
  datosHero: DatosJugador;
  datosVillano1: DatosJugador;
  datosVillano2: DatosJugador;

  constructor(public globals: Globals) {}

  @Input()
  set data(mesa: IMesa) {
    this.mesa = mesa;
    if (this.mesa.numJugadores === ENumJugadores._3H) {
      this.rellenar3Handed();
    } else {
      this.rellenarHU();
    }
    this.datosHero = {
      nombre: 'Hero',
      stack: this.mesa.stacks.hero,
      tipo: null,
      accion: null,
      apuestas: this.mesa.apuestas.hero,
    };
  }

  private rellenar3Handed() {
    switch (this.mesa.posicionHero) {
      case EPosicion.SB:
        this.posicionBTN = 2;
        break;
      case EPosicion.BB:
        this.posicionBTN = 1;
        break;
      default:
        this.posicionBTN = 0;
    }

    this.datosVillano1 = {
      nombre: 'Villano 1',
      stack: this.mesa.stacks.vil1,
      tipo: this.mesa.tipoOponente,
      accion: this.mesa.accionVil1,
      apuestas: this.mesa.apuestas.vil1,
    };
    this.datosVillano2 = {
      nombre: 'Villano 2',
      stack: this.mesa.stacks.vil2,
      tipo: this.mesa.tipoOponente,
      accion: this.mesa.accionVil2,
      apuestas: this.mesa.apuestas.vil2,
    };
  }

  private rellenarHU() {
    // Primero decidimos si jugamos contra vil1 o vil2
    let vil = dameAleatorio(1, 2);
    if (vil === 1) {
      // HU contra villano 1
      switch (this.mesa.posicionHero) {
        case EPosicion.SB:
          this.posicionBTN = 0;
          break;
        default:
          this.posicionBTN = 1;
      }
      this.datosVillano1 = {
        nombre: 'Villano 1',
        stack: this.mesa.stacks.vil1,
        tipo: this.mesa.tipoOponente,
        accion: this.mesa.accionVil1,
        apuestas: this.mesa.apuestas.vil1,
      };
      this.datosVillano2 = null;
    } else {
      // HU contra villano 2
      switch (this.mesa.posicionHero) {
        case EPosicion.SB:
          this.posicionBTN = 0;
          break;
        default:
          this.posicionBTN = 2;
      }
      this.datosVillano2 = {
        nombre: 'Villano 2',
        stack: this.mesa.stacks.vil1,
        tipo: this.mesa.tipoOponente,
        accion: this.mesa.accionVil1,
        apuestas: this.mesa.apuestas.vil1,
      };
      this.datosVillano1 = null;
    }
  }
}
