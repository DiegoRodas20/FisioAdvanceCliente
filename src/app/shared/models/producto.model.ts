export interface Producto {
  cA_idItem: string,
  p_nombre: string,
  p_precio: number,
  p_stock: number,
  p_stockMin: number,
  p_stockMax: number,
  p_marca: string,
  cA_precioVenta: number,
  cA_descuento: number,
  cP_categoria: string,
  eP_idEstadoProducto: string,
  p_Descripcion: string,
  p_imagen: string,
}

export interface Categoria {
  cP_idCategoria: string,
  cP_categoria: string,
  cP_countProducto: number
}

export interface Marca {
  mP_idMarca: string,
  mP_marca: string,
  mP_countProducto: number,
  mP_descripcion: string
}
