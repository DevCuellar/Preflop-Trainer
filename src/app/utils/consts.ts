import { ESituacion, EOponente } from './enums';

export const RUTA_ESTRATEGIAS = 'estrategias';

export const TODAS_SITUACIONES = [
  ESituacion._3H_BTN_OR,
  ESituacion._3H_SB_OR,
  ESituacion._3H_SB_vLimp,
  ESituacion._3H_SB_vMR,
  // ESituacion._3H_SB_vOR,
  // ESituacion._3H_SB_vPush,
  ESituacion._3H_BB_vBTNLimp,
  ESituacion._3H_BB_vBTNMR,
  // ESituacion._3H_BB_vBTNOR,
  // ESituacion._3H_BB_vBTNPush,
  ESituacion._3H_BB_vSBLimp,
  ESituacion._3H_BB_vSBMR,
  // ESituacion._3H_BB_vSBOR,
  // ESituacion._3H_BB_vSBPush,
  ESituacion.HU_SB_OR,
  ESituacion.HU_BB_vSBLimp,
  ESituacion.HU_BB_vSBMR
  // ESituacion.HU_BB_vSBOR,
  // ESituacion.HU_BB_vSBPush
];

export const CONFIGURACION_INICIAL = {
  numEjercicios: 30,
  estrategia: null,
  oponente: EOponente.Todos,
  stacks: [],
  situaciones: TODAS_SITUACIONES
};

export const RUTAS_RANGOS = {
  BTN: ['OR'],
  SB3H: ['OR', 'vsLimp_BTN', 'vsMR_BTN'],
  BB3H: ['vsLimp_BTN', 'vsMR_BTN', 'vsLimp_SB', 'vsMR_SB'],
  SBHU: ['OR'],
  BBHU: ['vsLimp_SB', 'vsMR_SB']
};
