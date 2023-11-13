import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dcm-medidor-aciertos',
  templateUrl: './medidor-aciertos.component.html',
  styleUrls: ['./medidor-aciertos.component.css']
})
export class MedidorAciertosComponent implements OnInit {

  @Input() aciertos: number;
  @Input() errores: number;

  get porcAciertos() {
    let porcAux = this.aciertos ? this.aciertos / (this.aciertos + this.errores) * 100 : 0;
    return `(${porcAux.toFixed(1)}%)`;
  }
  get porcErrores() {
    let porcAux = this.errores ? this.errores / (this.aciertos + this.errores) * 100 : 0;
    return `(${porcAux.toFixed(1)}%)`;
  }

  get valueProgressBar(){
    return this.aciertos ? this.aciertos / (this.aciertos + this.errores) * 100 : 0;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
