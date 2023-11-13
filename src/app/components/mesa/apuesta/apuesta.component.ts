import { Component, Input } from '@angular/core';

@Component({
  selector: 'dcm-apuesta',
  templateUrl: './apuesta.component.html',
  styleUrls: ['./apuesta.component.scss']
})
export class ApuestaComponent {
  @Input()
  set apuesta(apuesta: string | number) {
    switch (apuesta.toString()) {
      case '0.25':
        this.rutaImagen = 'assets/img/chips/0-25.png';
        break;
      case '0.5':
        this.rutaImagen = 'assets/img/chips/0-5.png';
        break;
      case '1':
        this.rutaImagen = 'assets/img/chips/1.png';
        break;
      case '1.5':
        this.rutaImagen = 'assets/img/chips/1-5.png';
        break;
      case '2':
        this.rutaImagen = 'assets/img/chips/2.png';
        break;
    }
    this.chips = apuesta.toString() + 'bb';
  }
  chips = '';
  rutaImagen = 'assets/img/chips/1.png';
}
