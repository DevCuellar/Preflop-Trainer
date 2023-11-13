import { EAccionBoton } from '../enums';
import { IBoton } from '../interfaces';

// tslint:disable-next-line: no-namespace
export namespace Botones {
  export const OR: IBoton[] = [
    {
      texto: 'Limp',
      accion: EAccionBoton.Float
    },
    {
      texto: 'MinRaise',
      accion: EAccionBoton.Raise
    },
    {
      texto: 'OpenShove',
      accion: EAccionBoton.Shove
    },
    {
      texto: 'Fold',
      accion: EAccionBoton.Fold
    }
  ];

  export const vLimpEnSB: IBoton[] = [
    {
      texto: 'Call',
      accion: EAccionBoton.Float
    },
    {
      texto: 'ROL',
      accion: EAccionBoton.Raise
    },
    {
      texto: 'Shove',
      accion: EAccionBoton.Shove
    },
    {
      texto: 'Fold',
      accion: EAccionBoton.Fold
    }
  ];

  export const vLimpEnBB: IBoton[] = [
    {
      texto: 'Check',
      accion: EAccionBoton.Float
    },
    {
      texto: 'ROL',
      accion: EAccionBoton.Raise
    },
    {
      texto: 'Shove',
      accion: EAccionBoton.Shove
    }
  ];

  export const vMR: IBoton[] = [
    {
      texto: 'Call',
      accion: EAccionBoton.Float
    },
    {
      texto: 'Raise',
      accion: EAccionBoton.Raise
    },
    {
      texto: 'Shove',
      accion: EAccionBoton.Shove
    },
    {
      texto: 'Fold',
      accion: EAccionBoton.Fold
    }
  ];
}
