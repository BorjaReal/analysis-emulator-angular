
import { AnalitoTipo } from '../../analito-tipo/interfaces/analito-tipo.interface';
import { Medico } from '../../sanitario/interfaces/medico.interface';
import { Usuario } from '../../usuario/interfaces/usuario.interface';

export interface Peticion {
  peticionId?: number;

  fechaPeticion: string;

  descripcion?: string;

  finalizado?: boolean;

  visible?: boolean;

  usuario: Usuario;

  medico: Medico;

  analitosTipos: AnalitoTipo[];
}
