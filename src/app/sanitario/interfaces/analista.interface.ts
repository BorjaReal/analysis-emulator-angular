import { Usuario } from "../../usuario/interfaces/usuario.interface";

export interface Analista extends Usuario {

  actividadAnalista: boolean;

  //peticionesMedicos?: Peticion[];
}
