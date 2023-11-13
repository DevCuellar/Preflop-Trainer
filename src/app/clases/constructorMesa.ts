import { Ejercicio } from './ejercicio';
import { IMesa, IValoresMesa } from '../utils/interfaces';
import { dameAleatorio } from '../utils/utils';
import {
  EAccionJugador,
  EPosicion,
  EAccionPrevia,
  ENumJugadores,
  EOponente
} from '../utils/enums';

const NUEVA_MESA: IMesa = {
  stackEfectivo: null,
  posicionHero: null,
  tipoOponente: null,
  potSize: null,
  numJugadores: null,
  accionVil1: null,
  accionVil2: null,
  ante: null,
  stacks: null,
  apuestas: null
};
export class ConstructorMesa {
  static mesa: IMesa;

  static dameMesa(ejercicio: Ejercicio): IMesa {
    this.mesa = { ...NUEVA_MESA };
    this.mesa.numJugadores = ejercicio.numJugadores;
    this.mesa.tipoOponente = ejercicio.tipoOponente;
    this.mesa.stackEfectivo = ejercicio.stackEfectivo;
    this.mesa.posicionHero = ejercicio.posicionHero;
    this.mesa.ante = ejercicio.hayAnte ? 0.25 : 0;
    this.rellenarAcciones(ejercicio);
    this.rellenarPotSize(ejercicio);
    this.rellenarStacks(ejercicio);
    this.RellenarApuestasMesa(ejercicio);
    return this.mesa;
  }

  static rellenarAcciones(ejercicio: Ejercicio) {
    switch (ejercicio.posicionHero) {
      case EPosicion.BTN:
        this.mesa.accionVil1 = EAccionJugador.Ninguna;
        this.mesa.accionVil2 = EAccionJugador.Ninguna;
        break;
      case EPosicion.SB:
        switch (ejercicio.accionPrevia) {
          case EAccionPrevia.vsLimp_BTN:
            this.mesa.accionVil1 = EAccionJugador.Ninguna;
            this.mesa.accionVil2 = EAccionJugador.Limp;
            break;
          case EAccionPrevia.vsMR_BTN:
            this.mesa.accionVil1 = EAccionJugador.Ninguna;
            this.mesa.accionVil2 = EAccionJugador.MinRaise;
            break;
          default:
            this.mesa.accionVil1 = EAccionJugador.Ninguna;
            this.mesa.accionVil2 = EAccionJugador.Fold;
        }
        break;
      case EPosicion.BB:
        switch (ejercicio.accionPrevia) {
          case EAccionPrevia.vsLimp_BTN:
            this.mesa.accionVil1 = EAccionJugador.Limp;
            this.mesa.accionVil2 = EAccionJugador.Fold;
            break;
          case EAccionPrevia.vsMR_BTN:
            this.mesa.accionVil1 = EAccionJugador.MinRaise;
            this.mesa.accionVil2 = EAccionJugador.Fold;
            break;
          case EAccionPrevia.vsLimp_SB:
            if (ejercicio.numJugadores === ENumJugadores._3H) {
              this.mesa.accionVil1 = EAccionJugador.Fold;
              this.mesa.accionVil2 = EAccionJugador.Limp;
            } else {
              this.mesa.accionVil1 = EAccionJugador.Limp;
              this.mesa.accionVil2 = EAccionJugador.Ninguna;
            }
            break;
          case EAccionPrevia.vsMR_SB:
            if (ejercicio.numJugadores === ENumJugadores._3H) {
              this.mesa.accionVil1 = EAccionJugador.Fold;
              this.mesa.accionVil2 = EAccionJugador.MinRaise;
            } else {
              this.mesa.accionVil1 = EAccionJugador.MinRaise;
              this.mesa.accionVil2 = EAccionJugador.Ninguna;
            }
            break;
        }
        break;
    }
  }

  static rellenarPotSize(ejercicio: Ejercicio) {
    this.mesa.potSize = 1.5 + this.mesa.ante;
    switch (ejercicio.accionPrevia) {
      case EAccionPrevia.vsLimp_BTN:
        this.mesa.potSize += 1;
        break;
      case EAccionPrevia.vsLimp_SB:
        this.mesa.potSize += 0.5;
        break;
      case EAccionPrevia.vsMR_BTN:
        this.mesa.potSize += 2;
        break;
      case EAccionPrevia.vsMR_SB:
        this.mesa.potSize += 1.5;
        break;
    }
  }

  // Esta funcion en jodida, pero intento que me de situaciones lo mas
  // al azar posible para que de la sensación de "realismo".
  static rellenarStacks(ejercicio: Ejercicio) {
    switch (true) {
      // ------------------------------------------------------------
      // ------------------------------------------------------------
      // SB OR
      case ejercicio.posicionHero === EPosicion.SB &&
        ejercicio.accionPrevia === EAccionPrevia.Ninguna:
      // BB vs Limp BTN
      case ejercicio.posicionHero === EPosicion.BB &&
        ejercicio.accionPrevia === EAccionPrevia.vsLimp_BTN:
      // BB vs MR BTN
      case ejercicio.posicionHero === EPosicion.BB &&
        ejercicio.accionPrevia === EAccionPrevia.vsMR_BTN:
        this.mesa.stacks = this.dameStacksSBOR_BBvsLimpBTN_BBvsMRBTN(
          ejercicio.stackEfectivo
        );
        break;
      // ------------------------------------------------------------
      // ------------------------------------------------------------
      // BTN OR
      case ejercicio.posicionHero === EPosicion.BTN &&
        ejercicio.accionPrevia === EAccionPrevia.Ninguna:
      // SB vs Limp BTN
      case ejercicio.posicionHero === EPosicion.SB &&
        ejercicio.accionPrevia === EAccionPrevia.vsLimp_BTN:
      // SB vs MR BTN
      case ejercicio.posicionHero === EPosicion.SB &&
        ejercicio.accionPrevia === EAccionPrevia.vsMR_BTN:
        this.mesa.stacks = this.dameStacksBTNOR_SBLIMP_SBMR(
          ejercicio.stackEfectivo
        );
        break;
      // ------------------------------------------------------------
      // ------------------------------------------------------------
      // BB vs LIMP SB
      case ejercicio.posicionHero === EPosicion.BB &&
        ejercicio.accionPrevia === EAccionPrevia.vsLimp_SB:
      // BB vs MR SB
      case ejercicio.posicionHero === EPosicion.BB &&
        ejercicio.accionPrevia === EAccionPrevia.vsMR_SB:
        const es3H = ejercicio.numJugadores === ENumJugadores._3H;
        this.mesa.stacks = this.dameStacksBBvsLimpSB_BBvsMRSB(
          ejercicio.stackEfectivo,
          es3H
        );
        break;
      // ------------------------------------------------------------
      // ------------------------------------------------------------
      default:
        this.mesa.stacks = {
          hero: 0,
          vil1: 0,
          vil2: 0
        };
    }
  }

  // --------------------------------------------------------------------
  // -- SB OR // BB vs Limp BTN // BB vs MR BTN
  // -- caso 1: (Mi stack = SE y stack villano 1 superior)
  // -- caso 2: (Stack de villano 1 = SE y mi stack superior)
  // --------------------------------------------------------------------
  static dameStacksSBOR_BBvsLimpBTN_BBvsMRBTN(
    stackEfectivo: number
  ): IValoresMesa {
    let caso = dameAleatorio(1, 2);
    let stackAux = {
      hero: 0,
      vil1: 0,
      vil2: 0
    };

    switch (caso) {
      case 1:
        stackAux.hero = stackEfectivo;
        stackAux.vil1 = stackEfectivo + dameAleatorio(0, 10);
        stackAux.vil2 = dameAleatorio(5, 12); // Este da igual, ha foldeado o no está
        break;
      case 2:
        stackAux.hero = stackEfectivo + dameAleatorio(0, 10);
        stackAux.vil1 = stackEfectivo;
        stackAux.vil2 = dameAleatorio(5, 12); // Este da igual, ha foldeado o no está
        break;
    }
    return stackAux;
  }

  // --------------------------------------------------------------------
  // -- BTN OR // SB vs Limp BTN // SB MR
  // -- caso 1: (Mi stack = SE y stack villanos superiores)
  // -- caso 2: (Mi stack es el mayor, uno de los otros dos es SE y el otro tiene menos stack)
  // -- Este caso es especial y tras hablarlo con Garu, los stack serán parecidos
  // --------------------------------------------------------------------
  static dameStacksBTNOR_SBLIMP_SBMR(stackEfectivo: number): IValoresMesa {
    let caso = dameAleatorio(1, 2);
    let stackAux = {
      hero: 0,
      vil1: 0,
      vil2: 0
    };

    switch (caso) {
      case 1:
        stackAux.hero = stackEfectivo;
        stackAux.vil1 =
          stackEfectivo + dameAleatorio(1, 2);
        stackAux.vil2 =
          stackEfectivo + dameAleatorio(1, 2);
        break;
      case 2:
        let random = dameAleatorio(1, 10); // Del 1 al 5 el stack efectivo se lo lleva vil1, si no vil 2
        let mayorStack = 0;
        stackAux.vil1 =
          random < 6 ? stackEfectivo : stackEfectivo - dameAleatorio(1, 2);
        stackAux.vil2 =
          random < 6 ? stackEfectivo - dameAleatorio(1, 2) : stackEfectivo;
        mayorStack =
          stackAux.vil1 > stackAux.vil2 ? stackAux.vil1 : stackAux.vil2;
        stackAux.hero = mayorStack + dameAleatorio(1, 2);
        // Esto para intentar no pasar de 75 con la suma de los stacks
        if (stackAux.hero > 25) {
          stackAux.hero = 25;
        }
        break;
    }
    return stackAux;
  }

  // --------------------------------------------------------------------
  // -- BB vs Limp SB // BB vs MR SB
  // -- caso 1: (Mi stack = SE y stack villano 2 superior)
  // -- caso 2: (Stack de villano 2 = SE y mi stack superior)
  // --------------------------------------------------------------------
  static dameStacksBBvsLimpSB_BBvsMRSB(
    stackEfectivo: number,
    es3Handed: boolean
  ): IValoresMesa {
    let caso = dameAleatorio(1, 2);
    let stackAux = {
      hero: 0,
      vil1: 0,
      vil2: 0
    };

    switch (caso) {
      case 1:
        stackAux.hero = stackEfectivo;
        if (es3Handed) {
          stackAux.vil1 = dameAleatorio(5, 12); // Este da igual, ha foldeado o no está
          stackAux.vil2 = stackEfectivo + dameAleatorio(0, 10);
        } else {
          // en HU nunca hay villano 2
          stackAux.vil1 = stackEfectivo + dameAleatorio(0, 10);
          stackAux.vil2 = dameAleatorio(5, 12); // Este da igual, ha foldeado o no está
        }
        break;
      case 2:
        stackAux.hero = stackEfectivo + dameAleatorio(0, 10);
        if (es3Handed) {
          stackAux.vil1 = dameAleatorio(5, 12); // Este da igual, ha foldeado o no está
          stackAux.vil2 = stackEfectivo;
        } else {
          // en HU nunca hay villano 2
          stackAux.vil1 = stackEfectivo;
          stackAux.vil2 = dameAleatorio(5, 12); // Este da igual, ha foldeado o no está
        }
        break;
    }
    return stackAux;
  }

  static RellenarApuestasMesa(ejercicio: Ejercicio) {
    this.mesa.apuestas = {
      hero: 0,
      vil1: 0,
      vil2: 0
    };
    const es3H = ejercicio.numJugadores === ENumJugadores._3H;

    // Rellenamos SB y BB
    switch (ejercicio.posicionHero) {
      case EPosicion.BTN: // Vil1 SB, Vil2 BB
        this.mesa.apuestas.vil1 += 0.5;
        this.mesa.stacks.vil1 -= 0.5;
        this.mesa.apuestas.vil2 += 1;
        this.mesa.stacks.vil2 -= 1;
        break;
      case EPosicion.SB: // Hero SB, Vil1 BB tanto en HU como en 3H
        this.mesa.apuestas.hero += 0.5;
        this.mesa.stacks.hero -= 0.5;
        this.mesa.apuestas.vil1 += 1;
        this.mesa.stacks.vil1 -= 1;
        // Tenemos que ver que ha hecho el villano 2
        switch (this.mesa.accionVil2) {
          case EAccionJugador.Limp:
            this.mesa.apuestas.vil2 += 1;
            this.mesa.stacks.vil2 -= 1;
            break;
          case EAccionJugador.MinRaise:
            this.mesa.apuestas.vil2 += 2;
            this.mesa.stacks.vil2 -= 2;
        }
        break;
      case EPosicion.BB: // Hero BB, Vil2 SB en 3H o Vil1 SB en HU
        this.mesa.apuestas.hero += 1;
        this.mesa.stacks.hero -= 1;
        if (ejercicio.numJugadores === ENumJugadores._3H) {
          this.mesa.apuestas.vil2 += 0.5;
          this.mesa.stacks.vil2 -= 0.5;
          // Si el villano 2 ha limpeado o subido sólo lo puede hacer en 3H, además ya tiene 0,5bbs puestas
          switch (this.mesa.accionVil2) {
            case EAccionJugador.Limp:
              this.mesa.apuestas.vil2 += 0.5;
              this.mesa.stacks.vil2 -= 0.5;
              break;
            case EAccionJugador.MinRaise:
              this.mesa.apuestas.vil2 += 1.5;
              this.mesa.stacks.vil2 -= 1.5;
          }
        } else {
          this.mesa.apuestas.vil1 += 0.5;
          this.mesa.stacks.vil1 -= 0.5;
        }
        // El villano 1 lo puede hacer en ambos casos, pero en 3H es BTN y en HU es SB
        switch (this.mesa.accionVil1) {
          case EAccionJugador.Limp:
            this.mesa.apuestas.vil1 += es3H ? 1 : 0.5;
            this.mesa.stacks.vil1 -= es3H ? 1 : 0.5;
            break;
          case EAccionJugador.MinRaise:
            this.mesa.apuestas.vil1 += es3H ? 2 : 1.5;
            this.mesa.stacks.vil1 -= es3H ? 2 : 1.5;
        }
        break;
    }
  }
}
