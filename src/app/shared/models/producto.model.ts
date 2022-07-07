export interface Producto {
  p_idProducto:string,
  cA_idItem: string,
  p_nombre: string,
  p_precio: number,
  p_stock: number,
  p_stockMin: number,
  p_stockMax: number,
  mP_marca: string,
  cA_precioVenta: number,
  cA_descuento: number,
  cP_categoria: string,
  eP_idEstadoProducto: string,
  p_Descripcion: string,
  p_imagen: string,
  cantidad:number
}

export interface Categoria {
  cP_idCategoria: string,
  cP_categoria: string,
  cP_countProducto: number,
  cP_imagen:string
}

export interface Marca {
  mP_idMarca: string,
  mP_marca: string,
  mP_countProducto: number,
  mP_descripcion: string
}
