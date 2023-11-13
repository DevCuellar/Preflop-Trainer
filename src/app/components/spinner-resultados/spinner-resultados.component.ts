import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dcm-spinner-resultados',
  templateUrl: './spinner-resultados.component.html',
  styleUrls: ['./spinner-resultados.component.css'],
})
export class SpinnerResultadosComponent implements OnInit {
  @Input() porcAciertos = '75';

  constructor() {}

  ngOnInit() {}
}
