import { Component, Input } from '@angular/core';
import { EOponente, EAccionJugador } from '../../../utils/enums';
import { DatosJugador } from '../../../utils/interfaces';

@Component({
  selector: 'dcm-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.scss']
})
export class JugadorComponent {
  nombre = '';
  stack: string | number = 0;
  accion: EAccionJugador;

  @Input() avatarDerecha = false;
  @Input()
  set datosJugador(datosJugador: DatosJugador) {
    switch (datosJugador.tipo) {
      case EOponente.Rec:
        this.rutaImagen = 'assets/img/avatars/avatar-rec.png';
        break;
      case EOponente.Reg:
        this.rutaImagen = 'assets/img/avatars/avatar-reg.png';
        break;
      default:
        this.rutaImagen = 'assets/img/avatars/avatar-hero.png';
    }
    this.nombre = datosJugador.nombre;
    this.stack = datosJugador.stack;
    this.accion = datosJugador.accion;
  }

  rutaImagen = 'assets/img/avatars/avatar-hero.png';
}
