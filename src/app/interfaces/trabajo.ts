import { Evento } from './evento';
import { Usuario } from './usuario';
import { Rol } from './rol';

export class Trabajo {
    evento: Evento;
    usuario: Usuario;
    horas: number;
    rol: Rol;
}
