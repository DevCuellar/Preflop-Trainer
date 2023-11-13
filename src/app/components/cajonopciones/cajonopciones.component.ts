import { Component, OnInit } from '@angular/core';
import { OpcionesService } from '../../services/theme.service';
import { EBaraja } from '../../utils/enums';
import { Globals } from '../../globals';

@Component({
  selector: 'dcm-cajonopciones',
  templateUrl: './cajonopciones.component.html',
  styleUrls: ['./cajonopciones.component.css']
})
export class CajonopcionesComponent {
  esTemaOscuro = false;
  baraja = EBaraja.deck1;

  constructor(
    public opcionesService: OpcionesService,
    public globals: Globals
  ) {
    this.esTemaOscuro = opcionesService.opciones.tema.esOscuro;
    this.baraja = opcionesService.opciones.baraja;
  }

  cambiarTema() {
    this.opcionesService.toggleModoOscuro();
    this.esTemaOscuro = !this.esTemaOscuro;
  }
  cambiarBaraja(event) {
    this.opcionesService.setBaraja(event.value);
  }
}
