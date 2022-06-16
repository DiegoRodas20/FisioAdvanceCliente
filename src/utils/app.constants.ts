import { environment } from "src/environments/environment";

const BASE_URL = environment.BASE_URL;

/*******LOGIN******* */
export const URL_AUTH_BASE = BASE_URL + 'login/authenticate';

/*******CLIENTE******* */
export const URL_CLIENTE = BASE_URL + 'Usuario/Cliente/';
export const URL_CLIENTE_ID= URL_CLIENTE + 'GetByID';
export const URL_DESHABILITIAR_CLIENTE = BASE_URL + 'Usuario/Deshabilitar';
export const URL_TIPO_DOCUMENTO= URL_CLIENTE + 'get_tipo_documento/';
export const URL_LISTAR_CLIENTE_DNI = URL_CLIENTE + 'get_cliente_dni?CL_documentoIdentidad=';
export const URL_REGISTRAR_CLIENTE= URL_CLIENTE + 'post_cliente/';
export const URL_ACTUALIZAR_CLIENTE= URL_CLIENTE + 'put_cliente/';
export const URL_USUARIO = BASE_URL + 'Usuario/';
export const URL_LISTAR_CLIENTE= URL_CLIENTE+  'GetByID/';
export const URL_TIPO_DOCUMENTO2= URL_USUARIO+ 'TipoDocumento';

// PRODUCTOS

export const URL_LISTAR_PRODUCTOS = `${BASE_URL}Catalogo`;
export const URL_PRODUCTO_ID = `${BASE_URL}Catalogo/GetbyID/`;
export const URL_CATEGORIA = `${BASE_URL}Categoria`;
