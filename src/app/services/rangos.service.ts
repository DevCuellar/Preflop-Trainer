import { Injectable } from '@angular/core';
import { IRango, IEstrategia } from '../utils/interfaces';
import {
  EOponente,
  ENumJugadores,
  EPosicion,
  EAccionPrevia,
} from '../utils/enums';
import { RUTAS_RANGOS, RUTA_ESTRATEGIAS } from '../utils/consts';
import { HttpClient } from '@angular/common/http';
import {
  leerLocalStorage,
  grabarLocalStorage,
  eliminarLocalStorage,
} from '../utils/utils';
import { ConfiguracionService } from './configuracion.service';

const RANGES_KEY = 'ranges';
const RANGO_INICAL: IRango = {
  estrategia: null,
  tipoOponente: null,
  numJugadores: null,
  posicionHero: null,
  hayAnte: null,
  stack: null,
  accionPrevia: null,
  imagen: null,
};

@Injectable({
  providedIn: 'root',
})
export class RangosService {
  private _rango: IRango;
  private _segmentosRutas: string[] = [];
  private _todosRangos: IRango[] = [];
  private _rangosAux: IRango[] = [];
  private _rangosCargados: boolean;

  get rangosCargados(): boolean {
    return this._rangosCargados;
  }
  get rangos(): IRango[] {
    return this._todosRangos;
  }
  get rangosAux(): IRango[] {
    return this._rangosAux;
  }

  constructor(private http: HttpClient, private cs: ConfiguracionService) {}

  public async construirRangos() {
    this._rangosCargados = false;

    this._rango = RANGO_INICAL;
    this._segmentosRutas = [];
    this._todosRangos = [];
    this._rangosAux = [];

    // Primero intentamos cargar los datos del local storege (algo como una cache)
    // this.comprobarLocalStorage();

    // -------------------------------------
    // ESTO RELLENA LA VARIABLE _rangosAux, así si ya había rangos en el localStorage
    // ya les tenemos cargados, pero esto los vuelve a generar por si haya habido cambios,
    // aunque que no debería de ser habitual.
    let estrategias: any = await this.http
      .get('estrategias/estrategias.json')
      .toPromise();
    for (let estrategia of estrategias) {
      await this.construirRango(estrategia);
    }
    // -------------------------------------

    // Actualizamos los rangos con los nuevos cargados
    this._todosRangos = this._rangosAux;

    // Y grabamos la última versión en el localStorage
    this.grabarLocalStorage();

    this._rangosCargados = true;
  }

  private comprobarLocalStorage() {
    if (localStorage.getItem(RANGES_KEY)) {
      let rangs = leerLocalStorage(RANGES_KEY);
      if (rangs) {
        this._todosRangos = JSON.parse(rangs);
        this._rangosCargados = true;
      } else {
        eliminarLocalStorage(RANGES_KEY);
      }
    }
  }
  private grabarLocalStorage() {
    grabarLocalStorage(RANGES_KEY, JSON.stringify(this._todosRangos));
  }

  private async construirRango(estrategia: IEstrategia) {
    this._rango.estrategia = estrategia.carpeta;
    this._segmentosRutas[0] = estrategia.carpeta;
    this._rango.hayAnte = this.cs.estrategiaConAnte(estrategia.carpeta);

    await this.construirRangovsFish();
    await this.construirRangovsReg();
  }

  private async construirRangovsFish() {
    this._rango.tipoOponente = EOponente.Rec;
    this._segmentosRutas[1] = 'vsFish';

    await this.construirRango3H();
    await this.construirRangoHU();
  }

  private async construirRangovsReg() {
    this._rango.tipoOponente = EOponente.Reg;
    this._segmentosRutas[1] = 'vsReg';

    await this.construirRango3H();
    await this.construirRangoHU();
  }

  private async construirRango3H() {
    this._rango.numJugadores = ENumJugadores._3H;
    this._segmentosRutas[2] = '3H';

    await this.construirRangoBTN();
    await this.construirRangoSB3H();
    await this.construirRangoBB3H();
  }

  private async construirRangoHU() {
    this._rango.numJugadores = ENumJugadores.HU;
    this._segmentosRutas[2] = 'HU';

    await this.construirRangoSBHU();
    await this.construirRangoBBHU();
  }

  // Rangos 3Handed
  private async construirRangoBTN() {
    this._segmentosRutas[3] = 'BTN';
    this._rango.posicionHero = EPosicion.BTN;

    for (let r of RUTAS_RANGOS.BTN) {
      let ruta = this.construyeRuta(r);
      await this.addRango(ruta);
    }
  }
  private async construirRangoSB3H() {
    this._segmentosRutas[3] = 'SB';
    this._rango.posicionHero = EPosicion.SB;

    for (let r of RUTAS_RANGOS.SB3H) {
      let ruta = this.construyeRuta(r);
      await this.addRango(ruta);
    }
  }
  private async construirRangoBB3H() {
    this._segmentosRutas[3] = 'BB';
    this._rango.posicionHero = EPosicion.BB;

    for (let r of RUTAS_RANGOS.BB3H) {
      let ruta = this.construyeRuta(r);
      await this.addRango(ruta);
    }
  }

  // Rangos HU
  private async construirRangoSBHU() {
    this._segmentosRutas[3] = 'SB';
    this._rango.posicionHero = EPosicion.SB;

    for (let r of RUTAS_RANGOS.SBHU) {
      let ruta = this.construyeRuta(r);
      await this.addRango(ruta);
    }
  }
  private async construirRangoBBHU() {
    this._segmentosRutas[3] = 'BB';
    this._rango.posicionHero = EPosicion.BB;

    for (let r of RUTAS_RANGOS.BBHU) {
      let ruta = this.construyeRuta(r);
      await this.addRango(ruta);
    }
  }

  private async addRango(ruta) {
    try {
      const data: any = await this.http.get(ruta).toPromise();
      if (data && data.length > 0) {
        for (let r of data) {
          const rangoAux = { ...this._rango };
          rangoAux.stack = this.dameStack(r.SE);
          rangoAux.imagen = this.dameRutaImagen(ruta, r.SE);
          rangoAux.accionPrevia = this.dameAccionPrevia(ruta);
          if (r.LC) {
            rangoAux.rangoLimpCall = r.LC;
          }
          if (r.RA) {
            rangoAux.rangoRaise = r.RA;
          }
          if (r.SH) {
            rangoAux.rangoShove = r.SH;
          }
          if (r.FO) {
            rangoAux.rangoFold = r.FO;
          }
          this._rangosAux.push(rangoAux);
        }
      }
    } catch (err) {
      
    }
  }

  private dameStack(stackTexto: string): number[] {
    let min = 0;
    let max = 25;

    if (stackTexto.indexOf('-') > 0) {
      min = Number(stackTexto.split('-')[0]);
      max = Number(stackTexto.split('-')[1]);
    } else {
      min = Number(stackTexto.replace('+', ''));
    }

    return [min, max];
  }

  private dameRutaImagen(ruta, stackTexto: string): string {
    return ruta.replace('rangos.json', `${stackTexto}.png`);
  }

  private dameAccionPrevia(ruta): EAccionPrevia {
    if (ruta.indexOf('/OR/') > 0) {
      return EAccionPrevia.Ninguna;
    }
    if (ruta.indexOf('/vsLimp_BTN/') > 0) {
      return EAccionPrevia.vsLimp_BTN;
    }
    if (ruta.indexOf('/vsLimp_SB/') > 0) {
      return EAccionPrevia.vsLimp_SB;
    }
    if (ruta.indexOf('/vsMR_BTN/') > 0) {
      return EAccionPrevia.vsMR_BTN;
    }
    if (ruta.indexOf('/vsMR_SB/') > 0) {
      return EAccionPrevia.vsMR_SB;
    }
    return EAccionPrevia.Ninguna;
  }

  private construyeRuta(ruta: string): string {
    return (
      RUTA_ESTRATEGIAS +
      '/' +
      this._segmentosRutas[0] +
      '/' +
      this._segmentosRutas[1] +
      '/' +
      this._segmentosRutas[2] +
      '/' +
      this._segmentosRutas[3] +
      '/' +
      ruta +
      '/rangos.json'
    );
  }
}
