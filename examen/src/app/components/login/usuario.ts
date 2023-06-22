export class Usuario {
  Id!: number;
  UserName!: string;
  Password!: string;
  Rol!: string;
  Cliente!: Cliente;
}

export interface Cliente {
  Id: number;
  Nombre: string;
  Apellidos: string;
  Direccion: string;
}

export interface UsuarioToken {
  user: Usuario,
  token: string
}