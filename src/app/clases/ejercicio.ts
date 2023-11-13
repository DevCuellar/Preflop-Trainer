import {
  EPosicion,
  EAccionPrevia,
  EOponente,
  ENumJugadores,
} from '../utils/enums';
import { Mano } from './mano';
import { dameAleatorio } from '../utils/utils';
import { ManejadorRango } from './manejadorRango';
import {
  ICombo,
  IBoton,
  IRango,
  IMesa,
  IEstrategia,
} from '../utils/interfaces';
import { Botones } from '../utils/presets/botones';
import { ConstructorMesa } from './constructorMesa';

export const NUM_MANOS = 4;

export class Ejercicio {
  id: number;
  numJugadores: ENumJugadores;
  hayAnte: boolean;
  imagen: string;
  posicionHero: EPosicion;
  accionPrevia: EAccionPrevia;
  stackEfectivo: number;
  tipoOponente: EOponente;
  manos: Mano[];
  botones: IBoton[];
  validado: boolean;
  manosCorrectas: number;
  mesa: IMesa;

  get todasOpcionesSeleccionadas() {
    let res = true;
    this.manos.forEach((mano) => {
      if (!mano.accionSeleccionada) {
        res = false;
      }
    });
    return res;
  }

  get titulo() {
    let titulo = '';
    titulo += this.numJugadores === ENumJugadores._3H ? '3-max' : 'HU';

    titulo += ' ' + this.posicionHero;
    switch (this.accionPrevia) {
      case EAccionPrevia.Ninguna:
        titulo += ' OR';
        break;
      case EAccionPrevia.vsLimp_BTN:
        titulo += ' vs BTN Limp';
        break;
      case EAccionPrevia.vsLimp_SB:
        titulo += ' vs SB Limp';
        break;
      case EAccionPrevia.vsMR_BTN:
        titulo += ' vs BTN MR';
        break;
      case EAccionPrevia.vsMR_SB:
        titulo += ' vs SB MR';
        break;
    }
    switch (this.tipoOponente) {
      case EOponente.Reg:
        titulo += ' (Reg)';
        break;
      case EOponente.Rec:
        titulo += ' (Fish)';
        break;
    }
    titulo += ' (' + this.stackEfectivo + 'bb)';

    return titulo;
  }

  get textoAccionPrevia() {
    switch (this.accionPrevia) {
      case EAccionPrevia.Ninguna:
        return 'Bote sin abrir';
      case EAccionPrevia.vsLimp_BTN:
        return 'vs Limp BTN';
      case EAccionPrevia.vsLimp_SB:
        return 'vs Limp SB';
      case EAccionPrevia.vsMR_BTN:
        return 'vs MR BTN';
      case EAccionPrevia.vsMR_SB:
        return 'vs MR SB';
    }
  }

  get manosIncorrectas() {
    if (this.validado) {
      return 4 - this.manosCorrectas;
    }
    return 0;
  }

  construirEjercicio(rango: IRango) {
    this.rellenarCampos(rango);
    this.rellenarManos(rango);
  }

  rellenarCampos(rango: IRango) {
    this.tipoOponente = rango.tipoOponente;
    this.hayAnte = rango.hayAnte;
    this.numJugadores = rango.numJugadores;
    this.imagen = rango.imagen;
    this.posicionHero = rango.posicionHero;
    this.accionPrevia = rango.accionPrevia;

    if ((rango.stack[1] - rango.stack[0]) <= 1) {
      // En los rangos con solo 1bb de diferencia me quedo con el menor
      this.stackEfectivo = rango.stack[0];
    } else {
      // Quito los numero de los extremos para que no se solapen rangos
      // pej: 6-8 8-11 no deberían solapar el 8 porque podría ser cualquier rango
      this.stackEfectivo = dameAleatorio(rango.stack[0] + 1, rango.stack[1] - 1);
    }
    this.manosCorrectas = 0;
    this.rellenarBotones();
    this.validado = false;
    this.mesa = ConstructorMesa.dameMesa(this);
  }

  private rellenarBotones() {
    // Somos los primeros en hablar
    if (this.accionPrevia === EAccionPrevia.Ninguna) {
      this.botones = Botones.OR;
      return;
    }
    // Nos llega el bote limpeado
    if (this.posicionHero === EPosicion.SB) {
      this.botones = Botones.vLimpEnSB;
    } else {
      this.botones = Botones.vLimpEnBB;
    }
    // Nos llega el bote subido
    if (
      this.accionPrevia === EAccionPrevia.vsMR_BTN ||
      this.accionPrevia === EAccionPrevia.vsMR_SB
    ) {
      this.botones = Botones.vMR;
      return;
    }
  }

  rellenarManos(rango: IRango) {
    this.manos = [];
    let mano: Mano;
    const manejadorRango: ManejadorRango = new ManejadorRango(
      rango.rangoLimpCall,
      rango.rangoRaise,
      rango.rangoShove,
      rango.rangoFold
    );
    manejadorRango.expandirRangos();
    const randoms: ICombo[] = manejadorRango.dameCombos(NUM_MANOS);

    for (let i = 0; i < NUM_MANOS; i++) {
      mano = new Mano();
      mano.construirMano(randoms[i].combo, randoms[i].acciones);
      this.manos.push(mano);
    }
  }

  validar() {
    this.manos.forEach((mano) => {
      mano.validar();
      if (mano.correcta) {
        this.manosCorrectas += 1;
      }
    });
    this.validado = true;
  }
}
