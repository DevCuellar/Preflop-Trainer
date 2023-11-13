import { IConfig, IRango, IStackMinMax } from '../utils/interfaces';
import {
  EOponente,
  ESituacion,
  EPosicion,
  ENumJugadores,
  EAccionPrevia
} from '../utils/enums';

export class FiltradorRango {
  private static rangoFiltrado: IRango[];

  static filtrarRangos(rangos: IRango[], config: IConfig): IRango[] {
    this.rangoFiltrado = [...rangos];
    this.filtrarEstrategia(config);
    this.filtrarOponente(config);
    this.filtrarStack(config);
    this.filtrarSituaciones(config);
    this.filtrarVacios();
    return this.rangoFiltrado;
  }

  private static filtrarEstrategia(config: IConfig) {
    this.rangoFiltrado = this.rangoFiltrado.filter(
      r => r.estrategia === config.estrategia
    );
  }

  private static filtrarOponente(config: IConfig) {
    switch (config.oponente) {
      case EOponente.Reg:
        this.rangoFiltrado = this.rangoFiltrado.filter(
          r => r.tipoOponente === EOponente.Reg
        );
        break;
      case EOponente.Rec:
        this.rangoFiltrado = this.rangoFiltrado.filter(
          r => r.tipoOponente === EOponente.Rec
        );
        break;
    }
  }

  private static filtrarStack(config: IConfig) {
    this.rangoFiltrado = this.rangoFiltrado.filter(r =>
      this.rangoCumpleTramosSeleccionados(r, config.stacks)
    );
  }

  private static rangoCumpleTramosSeleccionados(r: IRango, tramos: string[]) {
    let cumpleAlgunTramo = false;
    let stackMinMax: IStackMinMax;
    // Comprobamos si el rango encaja en alguno de los tramos seleccionados,, si no encaja con ninguno se queda fuera
    for (let tramo of tramos) {

      stackMinMax = this.desglosarStack(tramo);
      if (this.cumpleTramo(r, stackMinMax.minimo, stackMinMax.maximo)) {
        cumpleAlgunTramo = true;
      }
      
      if (cumpleAlgunTramo) {
        break;
      }
    }

    return cumpleAlgunTramo;
  }

  private static cumpleTramo(rango: IRango, min: number, max: number): boolean {
    if (rango.stack[0] >= max) {
      return false;
    }
    if (rango.stack[1] <= min) {
      return false;
    }
    return true;
  }

  private static filtrarSituaciones(config: IConfig) {
    // 3H BTN
    if (config.situaciones.indexOf(ESituacion._3H_BTN_OR) === -1) {
      this.rangoFiltrado = this.rangoFiltrado.filter(
        r => r.posicionHero !== EPosicion.BTN
      );
    }
    // 3H SB
    if (config.situaciones.indexOf(ESituacion._3H_SB_OR) === -1) {
      this.rangoFiltrado = this.rangoFiltrado.filter(
        r =>
          !(
            r.posicionHero === EPosicion.SB &&
            r.numJugadores === ENumJugadores._3H &&
            r.accionPrevia === EAccionPrevia.Ninguna
          )
      );
    }
    if (config.situaciones.indexOf(ESituacion._3H_SB_vLimp) === -1) {
      this.rangoFiltrado = this.rangoFiltrado.filter(
        r =>
          !(
            r.posicionHero === EPosicion.SB &&
            r.numJugadores === ENumJugadores._3H &&
            r.accionPrevia === EAccionPrevia.vsLimp_BTN
          )
      );
    }
    if (config.situaciones.indexOf(ESituacion._3H_SB_vMR) === -1) {
      this.rangoFiltrado = this.rangoFiltrado.filter(
        r =>
          !(
            r.posicionHero === EPosicion.SB &&
            r.numJugadores === ENumJugadores._3H &&
            r.accionPrevia === EAccionPrevia.vsMR_BTN
          )
      );
    }
    // 3H BB
    if (config.situaciones.indexOf(ESituacion._3H_BB_vBTNLimp) === -1) {
      this.rangoFiltrado = this.rangoFiltrado.filter(
        r =>
          !(
            r.posicionHero === EPosicion.BB &&
            r.numJugadores === ENumJugadores._3H &&
            r.accionPrevia === EAccionPrevia.vsLimp_BTN
          )
      );
    }
    if (config.situaciones.indexOf(ESituacion._3H_BB_vBTNMR) === -1) {
      this.rangoFiltrado = this.rangoFiltrado.filter(
        r =>
          !(
            r.posicionHero === EPosicion.BB &&
            r.numJugadores === ENumJugadores._3H &&
            r.accionPrevia === EAccionPrevia.vsMR_BTN
          )
      );
    }
    if (config.situaciones.indexOf(ESituacion._3H_BB_vSBLimp) === -1) {
      this.rangoFiltrado = this.rangoFiltrado.filter(
        r =>
          !(
            r.posicionHero === EPosicion.BB &&
            r.numJugadores === ENumJugadores._3H &&
            r.accionPrevia === EAccionPrevia.vsLimp_SB
          )
      );
    }
    if (config.situaciones.indexOf(ESituacion._3H_BB_vSBMR) === -1) {
      this.rangoFiltrado = this.rangoFiltrado.filter(
        r =>
          !(
            r.posicionHero === EPosicion.BB &&
            r.numJugadores === ENumJugadores._3H &&
            r.accionPrevia === EAccionPrevia.vsMR_SB
          )
      );
    }
    // HU SB
    if (config.situaciones.indexOf(ESituacion.HU_SB_OR) === -1) {
      this.rangoFiltrado = this.rangoFiltrado.filter(
        r =>
          !(
            r.posicionHero === EPosicion.SB &&
            r.numJugadores === ENumJugadores.HU
          )
      );
    }
    // HU BB
    if (config.situaciones.indexOf(ESituacion.HU_BB_vSBLimp) === -1) {
      this.rangoFiltrado = this.rangoFiltrado.filter(
        r =>
          !(
            r.posicionHero === EPosicion.BB &&
            r.numJugadores === ENumJugadores.HU &&
            r.accionPrevia === EAccionPrevia.vsLimp_SB
          )
      );
    }
    if (config.situaciones.indexOf(ESituacion.HU_BB_vSBMR) === -1) {
      this.rangoFiltrado = this.rangoFiltrado.filter(
        r =>
          !(
            r.posicionHero === EPosicion.BB &&
            r.numJugadores === ENumJugadores.HU &&
            r.accionPrevia === EAccionPrevia.vsMR_SB
          )
      );
    }
  }

  private static filtrarVacios() {
    // El rango tiene que tener algun rango de limp, shove o raise, si no está vacío...
    this.rangoFiltrado = this.rangoFiltrado.filter(
      r =>
        (
          r.rangoRaise ||
          r.rangoLimpCall ||
          r.rangoShove
        )
    );
  }

  private static desglosarStack(stack: string): IStackMinMax{
    let res = {
      minimo: 0,
      maximo: 25
    };

    if(stack.indexOf('-') > 0){
      res.minimo = Number(stack.split('-')[0]);
      res.maximo = Number(stack.split('-')[1]);
    }

    if(stack.indexOf('+') > 0){
      res.minimo = Number(stack.split('+')[0]);
      res.maximo = 25;
    }

    return res;
  }
}
