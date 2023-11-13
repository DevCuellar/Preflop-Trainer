import { Component, OnInit, Input } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'dcm-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent implements OnInit {
  @Input() opcionesVisibles: boolean;

  constructor(public navService: NavbarService) {}

  ngOnInit(): void {}

  clickOpciones() {
    this.navService.abrirOpciones();
  }
}
