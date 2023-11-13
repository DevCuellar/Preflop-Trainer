export class Usuario {
  nombre: string;
  avanzado: string;
  fechaLogin: Date;

  constructor() {}

  cargar(data) {
    this.nombre = data.nombre;
    this.avanzado = data.avanzado;
    this.fechaLogin = data.fechaLogin;
  }

  caducado(): boolean {
    const milisegundos = new Date().getTime() - new Date(this.fechaLogin).getTime();
    return milisegundos > 24 * 60 * 60 * 1000; // 24 horas
  }
}
