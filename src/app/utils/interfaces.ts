import {
  EOponente,
  EPosicion,
  ESituacion,
  ENumJugadores,
  EAccionPrevia,
  EAccionBoton,
  EAccionJugador
} from './enums';

export interface IEstrategia{
  carpeta: string;
  texto: string;
  hayAnte: boolean;
  nivel: string;
  stack: string;
}

export interface IConfig {
  numEjercicios: number;
  estrategia: string;
  oponente: EOponente;
  stacks: string[];
  situaciones: ESituacion[];
}

export interface IStackMinMax {
  minimo: number;
  maximo: number;
}

export interface IRango {
  estrategia: string;
  tipoOponente: EOponente;
  numJugadores: ENumJugadores;
  posicionHero: EPosicion;
  stack: number[];
  accionPrevia: EAccionPrevia;
  imagen: string;
  hayAnte: boolean;
  rangoLimpCall?: string;
  rangoRaise?: string;
  rangoShove?: string;
  rangoFold?: string;
}

export interface ICombo {
  combo: string;
  acciones?: EAccionBoton[];
}

export interface IBoton {
  texto: string;
  accion: EAccionBoton;
}

export interface IMesa {
  stackEfectivo: number;
  potSize: number;
  tipoOponente: EOponente;
  posicionHero: EPosicion;
  numJugadores: ENumJugadores;
  accionVil1: EAccionJugador;
  accionVil2: EAccionJugador;
  ante: number;
  stacks: IValoresMesa;
  apuestas: IValoresMesa;
}

export interface IValoresMesa {
  hero: number;
  vil1: number;
  vil2: number;
}

export interface DatosJugador {
  nombre: string;
  stack: number;
  tipo: EOponente;
  accion: EAccionJugador;
  apuestas: number;
}

export interface IUsuario {
  nombre: string;
  avanzado: boolean;
}