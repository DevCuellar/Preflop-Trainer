import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AplicacionComponent } from './aplicacion.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { EjercicioComponent } from './ejercicio/ejercicio.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { ComponentsModule } from '../components/components.module';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StrategyPipe } from '../pipes/strategy.pipe';

@NgModule({
  declarations: [
    AplicacionComponent,
    ConfiguracionComponent,
    EjercicioComponent,
    ResultadosComponent,
    StrategyPipe
  ],
  imports: [CommonModule, ComponentsModule, MaterialModule, FormsModule, ReactiveFormsModule ],
  exports: [
    AplicacionComponent,
    ConfiguracionComponent,
    EjercicioComponent,
    ResultadosComponent
  ]
})
export class PagesModule {}
