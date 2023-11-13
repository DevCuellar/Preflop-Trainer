import { Component, OnInit, ViewChild } from '@angular/core';
import { OpcionesService } from '../services/theme.service';
import {
  AplicacionService,
  EPaginasAplicacion
} from '../services/aplicacion.service';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'dcm-aplicacion',
  templateUrl: './aplicacion.component.html',
  styles: []
})
export class AplicacionComponent implements OnInit {
  public paginas = EPaginasAplicacion;
  @ViewChild('sidenav') sidenav;

  constructor(
    public opcionesService: OpcionesService,
    public as: AplicacionService,
    navService: NavbarService
  ) {
    as.iniciarAplicacion();
    navService.toggleOpciones.subscribe(event => {
      if (event) {
        this.sidenav.toggle();
      }
    });
  }

  ngOnInit(): void {}
}
