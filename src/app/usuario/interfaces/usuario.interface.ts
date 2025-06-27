export interface Usuario {
  usuarioId: number;
  dni: string;
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;
  sexo: 'M' | 'F';
  sip: string;
  rol?: ''
  direccion?: string;
  codigoPostal: string;
  email: string;
  telefono?: string;
  contrasenya: string;
  fechaRegistro?: Date;
  //peticiones?: Peticion[];
}



