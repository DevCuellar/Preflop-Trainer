import { Component, OnInit } from '@angular/core';
import { ConfiguracionService } from '../../services/configuracion.service';
import { IConfig } from '../../utils/interfaces';
import { ESituacion, EOponente } from '../../utils/enums';
import { NavbarService } from '../../services/navbar.service';
import { EjerciciosService } from '../../services/ejercicios.service';
import {
  AplicacionService,
  EPaginasAplicacion,
} from 'src/app/services/aplicacion.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertaComponent } from '../../components/alerta/alerta.component';
import { delay } from '../../utils/utils';
import { FocusTrap } from '@angular/cdk/a11y';

@Component({
  selector: 'dcm-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss'],
})
export class ConfiguracionComponent {
  public config: IConfig;
  public eSit = ESituacion;
  public bloquearJuegoVsRegs: boolean;

  public animacion = 'slideInRight';

  constructor(
    public cs: ConfiguracionService,
    public as: AplicacionService,
    private navService: NavbarService,
    public es: EjerciciosService,
    public dialog: MatDialog
  ) {
    this.config = this.cs.config;
    this.navService.setTitulo('Configura el ejercicio');
    this.config.oponente = EOponente.Todos;
  }

  situacionSeleccionada(situacion: ESituacion) {
    return this.config.situaciones.indexOf(situacion) > -1;
  }

  cambioEstrategia(event) {
    this.config.estrategia = event.value;
    this.limpiarStacks();
  }

  limpiarStacks() {
    this.config.stacks = [];
  }

  seleccionarSituacion(situacion: ESituacion, event: any) {
    const idx: number = this.config.situaciones.indexOf(situacion);

    if (event.checked) {
      if (idx === -1) {
        this.config.situaciones.push(situacion);
      }
    } else {
      if (idx > -1) {
        this.config.situaciones.splice(idx, 1);
      }
    }
  }

  configuracionValida() {
    if (this.config.situaciones.length === 0) {
      return false;
    }
    if (this.config.stacks.length === 0) {
      return false;
    }
    return true;
  }

  async comenzar() {
    this.cs.guardarConfig();
    if (this.configuracionValida()) {
      this.es.iniciarEjercicios();
      if (this.es.ejercicios.length > 0) {
        this.animacion = 'slideOutLeft';
        await delay(250);
        this.as.irAPagina(EPaginasAplicacion.Ejercicio);
      } else {
        this.mostrarModal(
          '¡Vaya!',
          'Parece que no hay ejercicios que cumplan las condiciones seleccionadas. Por favor, prueba con otras.'
        );
      }
    }
  }

  mostrarModal(title: string, msg: string): void {
    const dialogRef = this.dialog.open(AlertaComponent, {
      width: '400px',
      data: { titulo: title, mensaje: msg },
    });
  }

  dameBotonesStacks() {
    if (!this.cs.estrategias) {
      return [];
    }
    for (let i: number = 0; i < this.cs.estrategias.length; i++) {
      if (this.cs.estrategias[i].carpeta === this.config.estrategia) {
        return this.cs.estrategias[i].stack.split(',').map((s) => s.trim());
      }
    }
    return [];
  }
}
