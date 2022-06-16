import { StringifyOptions } from "querystring";

export class Usuario {
    constructor(
       
        public  u_idUsuario:String,
        public  u_contrasena:String,
        public  u_nombre:string,
        public  u_apellidoPaterno:string,
        public  u_apellidoMaterno:string,
        public  TD_idTipo:Number,
        public  u_documentoIdentidad:string,
        public  u_correoElectronico:string,
        public  u_telefono:Number,
        public  u_direccion:string,
        public  tD_idTipoDocumento : string,
        public  eU_idEstadoUsuario: string,
        public  pU_idPerfil:string,
        public  tD_TipoDocumento  : string,
       
         //public  CL_cliente:string,
        //public  tD_nombre  : '' ,
    ) {}
  }

  export class UsuarioListar {
    constructor(
        public  u_idUsuario:String,
        public  u_contrasena:String,
        public  u_nombre:string,
        public  u_apellidoPaterno:string,
        public  u_apellidoMaterno:string,
        public  u_documentoIdentidad:string,
        public  u_correoElectronico:string, 
        public  u_telefono:string,
        public  u_direccion:string, 
        public tD_TipoDocumento: string,
        public  pU_idPerfil:string,
        public  eU_idEstadoUsuario: string,
       

    ) {}
  }

  export class TipoDocumento {
    constructor(
      public  tD_idTipoDocumento : string,
      public  tD_TipoDocumento  : string,

    ) {}
  }

  export class Perfil {
    constructor(
      public  pU_idPerfil : string,
      public pU_nombrePerfil  :string,

    ) {}
  }

 
