import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ManoComponent } from './mano/mano.component';
import { MesaComponent } from './mesa/mesa.component';
import { JugadorComponent } from './mesa/jugador/jugador.component';
import { ApuestaComponent } from './mesa/apuesta/apuesta.component';
import { CajonopcionesComponent } from './cajonopciones/cajonopciones.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { AlertaComponent } from './alerta/alerta.component';
import { SpinnerResultadosComponent } from './spinner-resultados/spinner-resultados.component';
import { MedidorAciertosComponent } from './medidor-aciertos/medidor-aciertos.component';

@NgModule({
  declarations: [
    NavbarComponent,
    ManoComponent,
    MesaComponent,
    JugadorComponent,
    ApuestaComponent,
    CajonopcionesComponent,
    AlertaComponent,
    SpinnerResultadosComponent,
    MedidorAciertosComponent,
  ],
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [
    NavbarComponent,
    ManoComponent,
    MesaComponent,
    CajonopcionesComponent,
    AlertaComponent,
    SpinnerResultadosComponent,
    MedidorAciertosComponent,
  ]
})
export class ComponentsModule {}
