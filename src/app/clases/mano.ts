import { EAccionBoton } from '../utils/enums';
import { dameAleatorio } from '../utils/utils';

export class Mano {
  mano: IMano;
  accionesCorrectas: EAccionBoton[];
  accionSeleccionada: EAccionBoton;
  validada: boolean;

  get correcta(): boolean {
    if (this.validada && this.accionesCorrectas.indexOf(this.accionSeleccionada) >= 0) {
      return true;
    }
    return false;
  }

  construirMano(manoString: string, acciones: EAccionBoton[]) {
    // Aquí se hará la magia
    if (manoString[0] === manoString[1]) {
      this.mano = this.damePareja(manoString[0]);
    } else if (manoString[2] === 's') {
      this.mano = this.dameManoSuited(manoString[0], manoString[1]);
    } else {
      this.mano = this.dameManoOfsuited(manoString[0], manoString[1]);
    }
    this.accionesCorrectas = acciones;
  }

  seleccionarAccion(accion: EAccionBoton) {
    this.accionSeleccionada = accion;
  }

  damePareja(value: string) {
    let suits = [];
    suits = this.damePalos(2);
    return {
      carta1: value + suits[0],
      carta2: value + suits[1]
    };
  }

  dameManoSuited(value1: string, value2: string) {
    if (value1 === value2) {
      return this.damePareja(value1);
    }
    let suits = [];
    suits = this.damePalos(1);
    return {
      carta1: value1 + suits[0],
      carta2: value2 + suits[0]
    };
  }
  dameManoOfsuited(value1: string, value2: string) {
    if (value1 === value2) {
      return this.damePareja(value1);
    }
    let suits = [];
    suits = this.damePalos(2);
    return {
      carta1: value1 + suits[0],
      carta2: value2 + suits[1]
    };
  }

  damePalos(cuantos: number) {
    let palos = 'SCHD';
    const respuesta = [];
    let rnd = -1;

    if (cuantos > 4) {
      cuantos = 4;
    }

    for (let i = 0; i < cuantos; i++) {
      rnd = dameAleatorio(0, palos.length - 1);
      respuesta.push(palos[rnd]);
      palos = palos.slice(0, rnd) + palos.slice(rnd + 1, palos.length);
    }

    return respuesta;
  }

  validar() {
    this.validada = true;
  }
}

export interface IMano {
  carta1: string;
  carta2: string;
}
