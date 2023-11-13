import { Injectable, EventEmitter, Output } from '@angular/core';
import { AplicacionService } from './aplicacion.service';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  @Output() toggleOpciones = new EventEmitter();

  get titulo() {
    return this._titulo;
  }

  private _titulo: string = 'SpinTrainer';

  get verConfiguracion() {
    return this._verConfiguracion;
  }

  private _verConfiguracion: boolean = false;

  setTitulo(titulo: string) {
    this._titulo = titulo;
  }

  abrirOpciones() {
    this.toggleOpciones.emit(true);
  }
}
