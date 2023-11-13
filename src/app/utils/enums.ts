export enum EOponente {
  Todos = 'Todos',
  Reg = 'Reg',
  Rec = 'Rec'
}

export enum ENumJugadores {
  Todos = 'Todos',
  _3H = '3H',
  HU = 'HU'
}

export enum EPosicion {
  BTN = 'BTN',
  SB = 'SB',
  BB = 'BB'
}

export enum EAccionJugador {
  Ninguna = 'Ninguna',
  Fold = 'Fold',
  Limp = 'Limp',
  MinRaise = 'MinRaise'
}

export enum EAccionPrevia {
  Ninguna = 'Ninguna',
  vsLimp_BTN = 'vsLimp_BTN',
  vsLimp_SB = 'vsLimp_SB',
  vsMR_BTN = 'vsMR_BTN',
  vsMR_SB = 'vsMR_SB'
}

export enum ESituacion {
  _3H_BTN_OR = '3H_BTN_OR',
  _3H_SB_OR = '3H_SB_OR',
  _3H_SB_vLimp = '3H_SB_vLimp',
  _3H_SB_vMR = '3H_SB_vMR',
  _3H_BB_vBTNLimp = '3H_BB_vBTNLimp',
  _3H_BB_vBTNMR = '3H_BB_vBTNMR',
  _3H_BB_vSBLimp = '3H_BB_vSBLimp',
  _3H_BB_vSBMR = '3H_BB_vSBMR',
  HU_SB_OR = 'HU_SB_OR',
  HU_BB_vSBLimp = 'HU_BB_vSBLimp',
  HU_BB_vSBMR = 'HU_BB_vSBMR',
}

export enum EAccionBoton {
  Float = 'FL',
  Raise = 'RA',
  Shove = 'SH',
  Fold = 'FO'
}

export enum EBaraja {
  deck1 = 'deck1',
  deck2 = 'deck2',
}

export enum EError{
  noEstrategias = 'noEstrategias',
  noSpinProject = 'noSpinProject'
}