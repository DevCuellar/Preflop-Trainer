import { EAccionBoton } from '../utils/enums';
import { ICombo } from '../utils/interfaces';
import { dameAleatorio } from '../utils/utils';
const VALUES = 'AKQJT98765432';
const RANGOTOTALCOMPRIMIDO =
  '22+,A2s+,K2s+,Q2s+,J2s+,T2s+,92s+,82s+,72s+,62s+,52s+,42s+,32s,A2o+,K2o+,Q2o+,J2o+,T2o+,92o+,82o+,72o+,62o+,52o+,42o+,32o';
export class ManejadorRango {
  private rangoLimp: string;
  private rangoFold: string;
  private rangoRaise: string;
  private rangoShove: string;
  private rangosExpandidos: ICombo[];

  constructor(rangoLimp, rangoRaise, rangoShove, rangoFold) {
    this.rangoLimp = rangoLimp;
    this.rangoRaise = rangoRaise;
    this.rangoShove = rangoShove;
    this.rangoFold = rangoFold;

    this.rangosExpandidos = [];
  }

  expandirRangos() {
    this.expandirRango(
      this.rangoFold,
      EAccionBoton.Fold
    );
    this.expandirRango(
      this.rangoLimp,
      EAccionBoton.Float
    );
    this.expandirRango(
      this.rangoRaise,
      EAccionBoton.Raise
    );
    this.expandirRango(
      this.rangoShove,
      EAccionBoton.Shove
    );
  }

  dameCombos(cuantos: number) {
    const combos: ICombo[] = [];
    const arrayCombos: ICombo[] = this.dameArrayTotalCombos();

    for (let i = 0; i < cuantos; i++) {
      const rnd = dameAleatorio(0, arrayCombos.length - 1);
      combos.push(arrayCombos[rnd]);
      arrayCombos.splice(rnd, 1);
    }

    return combos;
  }

  private expandirRango(rango: string, accion: EAccionBoton) {
    if (!rango) {
      return [];
    }

    const rangoSplitted = rango.split(',');
    for (const manoRango of rangoSplitted) {
      const elemento = manoRango.trim();
      if (elemento.indexOf('-') === -1) {
        if (elemento[elemento.length - 1] === '+') {
          this.expandirMas(elemento, accion);
        } else {
          this.addCombo(elemento, accion);
        }
      } else {
        const grupoSplit = elemento.split('-');
        if (grupoSplit[0][0] === grupoSplit[0][1]) {
            this.expandirParejas(grupoSplit[0], grupoSplit[1], accion);
        } else {
            this.expandirNoParejas(grupoSplit[0], grupoSplit[1], accion);
        }
      }
    }

  }

  private expandirMas(comboInicial: string, accion: EAccionBoton) {
    // Validaciones
    if (comboInicial.length < 3) {
      return;
    }

    let bandera = false;
    let combo: string;

    if (comboInicial.length === 3) {
      // Pareja
      bandera = true;

      for (const value of VALUES) {
        if (bandera) {
          combo = value + value;
          this.addCombo(combo, accion);
        }
        if (value === comboInicial[0]) {
          bandera = false;
          return;
        }
      }
    } else {
      // No pareja
      for (const value of VALUES) {
        if (bandera) {
          combo = comboInicial[0] + value + comboInicial[2];
          this.addCombo(combo, accion);
        }
        if (value === comboInicial[0]) {
          bandera = true;
        }

        if (value === comboInicial[1]) {
          bandera = false;
          return;
        }
      }
    }
  }

  private expandirParejas(
    comboInicial: string,
    comboFinal: string,
    accion: EAccionBoton
  ) {
    // Validaciones
    if (comboInicial.length < 2) {
      return;
    }
    if (comboInicial[0] !== comboInicial[1]) {
      return;
    }

    let bandera = false;
    let combo: string;
    for (const value of VALUES) {
      if (value === comboInicial[0]) {
        bandera = true;
      }
      if (bandera) {
        combo = value + value;
        this.addCombo(combo, accion);
      }
      if (value === comboFinal[0]) {
        bandera = false;
        return;
      }
    }
  }

  private expandirNoParejas(
    comboInicial: string,
    comboFinal: string,
    accion: EAccionBoton
  ) {
    // Validaciones
    if (comboInicial.length < 3) {
      return;
    }
    if (comboInicial[0] !== comboFinal[0]) {
      return;
    }

    let bandera = false;
    let combo: string;
    for (const value of VALUES) {
      if (value === comboInicial[1]) {
        bandera = true;
      }
      if (bandera) {
        combo = comboInicial[0] + value + comboInicial[2];
        this.addCombo(combo, accion);
      }
      if (value === comboFinal[1]) {
        bandera = false;
        return;
      }
    }
  }

  addCombo(combo: string, accion: EAccionBoton) {
    let idx = this.rangosExpandidos.findIndex((c) => c.combo === combo);
    if (idx >= 0) {
      this.rangosExpandidos[idx].acciones.push(accion);
    } else {
      this.rangosExpandidos.push({
        combo,
        acciones: [accion],
      });
    }
  }

  private dameArrayTotalCombos() {
    return this.rangosExpandidos;
  }
}
