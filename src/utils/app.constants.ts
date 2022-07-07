import { environment } from "src/environments/environment";

const BASE_URL = environment.BASE_URL;

/*******LOGIN******* */
export const URL_AUTH_BASE = BASE_URL + 'Usuario/Cliente/Login';

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
export const URL_CORREO_RECUPERA= URL_USUARIO+ 'CorreoRecuperar/';
export const URL_VALIDAR_CODIGO= URL_USUARIO+ 'validarCod/';
export const URL_CAMBIAR_CONTRASENA= URL_USUARIO+ 'CambiarContrasena/';

// PRODUCTOS

export const URL_LISTAR_PRODUCTOS = `${BASE_URL}Catalogo`;
export const URL_PRODUCTO_ID = `${BASE_URL}Catalogo/GetbyID/`;
export const URL_CATEGORIA = `${BASE_URL}Categoria`;

/*******PEDIDO******* */
export const URL_PEDIDO = BASE_URL + 'Pedido/';
export const URL_PEDIDO_ID = URL_PEDIDO + 'GetbyID/';
export const URL_CORREO_PEDIDO = URL_PEDIDO + 'Correo/';

/*******DETALLE PEDIDO******* */
export const URL_DETALLE_PEDIDO = URL_PEDIDO + 'DetallePedido/';
export const URL_MARCA = `${BASE_URL}Marca`;


/*******ORDEN DE COMPRA******* */
export const URL_ORDEN_COMPRA = BASE_URL + 'OrdenCompra/';
export const URL_ORDEN_COMPRA_ID = URL_ORDEN_COMPRA + 'GetbyID/';
export const URL_ORDEN_COMPRA_DETALLE = URL_ORDEN_COMPRA + 'DetalleOc/';
