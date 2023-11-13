import { Component, OnInit, Input } from '@angular/core';
import { Mano } from 'src/app/clases/mano';
import { EAccionBoton } from 'src/app/utils/enums';
import { IBoton } from 'src/app/utils/interfaces';
import { OpcionesService } from '../../services/theme.service';

@Component({
  selector: 'dcm-mano',
  templateUrl: './mano.component.html',
  styleUrls: ['./mano.component.scss']
})
export class ManoComponent implements OnInit {
  public accion = EAccionBoton;

  @Input() mano: Mano;
  @Input() botones: IBoton[];

  constructor(public opcionesService: OpcionesService) {}

  ngOnInit(): void {}

  seleccionarAccion(accion: EAccionBoton) {
    if (this.mano.validada) {
      return;
    }
    this.mano.accionSeleccionada = accion;
  }

  buttonClass(accion: EAccionBoton) {
    if (this.mano.validada) {
      if (this.mano.accionSeleccionada === accion) {
        if (this.mano.accionesCorrectas.indexOf(this.mano.accionSeleccionada) >= 0) {
          return 'respuestaAcertada';
        } else {
          return 'respuestaFallada';
        }
      } else {
        if (this.mano.accionesCorrectas.indexOf(accion) >= 0 && this.mano.accionesCorrectas.indexOf(this.mano.accionSeleccionada) === -1) {
          return 'respuestaCorrecta';
        } else {
          return 'btn-secondary';
        }
      }
    } else {
      if (this.mano.accionSeleccionada === accion) {
        return 'primary';
      } else {
        return 'secondary';
      }
    }
  }

  buttonColor(accion: EAccionBoton) {
    if (this.mano.validada) {
      if (this.mano.accionSeleccionada === accion) {
        if (this.mano.accionesCorrectas.indexOf(this.mano.accionSeleccionada) >= 0) {
          return '';
        } else {
          return '';
        }
      } else {
        if (this.mano.accionesCorrectas.indexOf(accion) >= 0) {
          return 'accent';
        } else {
          return 'accent';
        }
      }
    } else {
      if (this.mano.accionSeleccionada === accion) {
        return 'primary';
      } else {
        return 'accent';
      }
    }
  }
}
