import { Injectable } from '@angular/core';
import { IConfig, IEstrategia } from '../utils/interfaces';
import { CONFIGURACION_INICIAL } from '../utils/consts';
import {
  leerLocalStorage,
  grabarLocalStorage,
  eliminarLocalStorage,
} from '../utils/utils';
import { HttpClient } from '@angular/common/http';

const CONFIG_KEY = 'config';

@Injectable({
  providedIn: 'root',
})
export class ConfiguracionService {
  public config: IConfig = CONFIGURACION_INICIAL;
  public estrategias: IEstrategia[];

  constructor(private http: HttpClient) {
    if (localStorage.getItem(CONFIG_KEY)) {
      let cnf = leerLocalStorage(CONFIG_KEY);
      if (cnf) {
        this.config = JSON.parse(leerLocalStorage(CONFIG_KEY));
      } else {
        eliminarLocalStorage(CONFIG_KEY);
      }
    }
    this.http
      .get('estrategias/estrategias.json')
      .subscribe((res: IEstrategia[]) => {
        this.estrategias = res;
        if (!this.config.estrategia) {
          this.config.estrategia = this.estrategias[0].carpeta;
        } else {
          let index = this.estrategias.findIndex(
            (e) => e.texto === this.config.estrategia
          );
          if (index < 0) {
            this.config.estrategia = this.estrategias[0].carpeta;
          }
        }
      });
  }

  estrategiaConAnte(carpeta: string) {
    let idx = this.estrategias.findIndex(
      (e: IEstrategia) => e.carpeta === carpeta
    );
    if (idx > -1) {
      return this.estrategias[idx].hayAnte;
    }

    return false;
  }

  guardarConfig() {
    grabarLocalStorage(CONFIG_KEY, JSON.stringify(this.config));
  }
}
