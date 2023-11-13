import { Injectable, Output, EventEmitter } from '@angular/core';
import { EBaraja } from '../utils/enums';
import { leerLocalStorage, grabarLocalStorage, eliminarLocalStorage } from '../utils/utils';

const OPTIONS_KEY = 'options'
const TEMA_LIGHT: ITema = {
  esOscuro: false,
  claseTema: ''
};
const TEMA_DARK: ITema = {
  esOscuro: true,
  claseTema: 'dark-theme'
};

@Injectable({
  providedIn: 'root'
})
export class OpcionesService {
  opciones: IOpciones = {
    tema: TEMA_LIGHT,
    baraja: EBaraja.deck1
  };

  public barajaActual: string;

  constructor() {
    if (localStorage.getItem(OPTIONS_KEY)) {
      let options = leerLocalStorage(OPTIONS_KEY)
      if (options) {
        this.opciones = JSON.parse(leerLocalStorage(OPTIONS_KEY));
      } else {
        eliminarLocalStorage(OPTIONS_KEY)
      }
    }
  }

  toggleModoOscuro() {
    if (this.opciones.tema.esOscuro) {
      this.opciones.tema = TEMA_LIGHT;
    } else {
      this.opciones.tema = TEMA_DARK;
    }
    grabarLocalStorage(OPTIONS_KEY, JSON.stringify(this.opciones));
  }

  setBaraja(baraja: EBaraja) {
    this.opciones.baraja = baraja;
    grabarLocalStorage(OPTIONS_KEY, JSON.stringify(this.opciones));
  }

}

export interface IOpciones {
  tema: ITema;
  baraja: EBaraja;
}

export interface ITema {
  esOscuro: boolean;
  claseTema: string;
}
