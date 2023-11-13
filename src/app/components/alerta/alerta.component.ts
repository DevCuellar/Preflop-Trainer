import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'dcm-alerta',
  templateUrl: './alerta.component.html',
  styles: []
})
export class AlertaComponent {
  titulo: string;
  mensaje: string;

  constructor(
    public dialogRef: MatDialogRef<AlertaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.titulo = data.titulo;
    this.mensaje = data.mensaje;
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
