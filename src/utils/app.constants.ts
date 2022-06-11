import { environment } from "src/environments/environment";

const BASE_URL = environment.BASE_URL;

// PRODUCTOS

export const URL_LISTAR_PRODUCTOS = `${BASE_URL}Catalogo`;
export const URL_PRODUCTO_ID = `${BASE_URL}Catalogo/GetbyID/`;
export const URL_CATEGORIA = `${BASE_URL}Categoria`;
