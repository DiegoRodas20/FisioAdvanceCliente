export class Cliente {
    constructor(
      public U_idUsuario: string,
      public u_correoElectronico: string,
      public u_nombre: string,
      public u_documentoIdentidad: string,
      public eU_idEstadoUsuario: string,
      public eU_nombreEstadoUsuario: string,
      public tD_idTipoDocumento: string,
      public tD_TipoDocumento: string,
      public u_telefono: string,
      public u_direccion: string,
    ) {}
  }

export class Usuario {
  constructor(
    public u_idUsuario: string,
    public u_correoElectronico: string,
    public u_contrasena: string,
    public u_nombre: string,
    public u_apellidoPaterno: string,
    public u_apellidoMaterno: string,
    public u_telefono: string,
    public u_direccion: string,
    public u_documentoIdentidad: string,
    public pU_idPerfil: string,
    public eU_idEstadoUsuario: string,
    public tD_idTipoDocumento: string,
  ) { }
}

  export class Login {

    
    constructor(
      public Username: string,
      public Password: string

    ) {
    }
}