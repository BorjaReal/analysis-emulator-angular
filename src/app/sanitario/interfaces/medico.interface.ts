import { Usuario } from "../../usuario/interfaces/usuario.interface";


export interface Medico extends Usuario {

  actividadMedico: boolean;

  //peticionesMedicos?: Peticion[];
}
