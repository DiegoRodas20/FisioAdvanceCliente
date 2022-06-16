export interface Carrito {
    cA_idItem: string,
    dP_idDetallePedido:string
    pE_idPedido: string,
    p_idProducto:string,
    dP_cantidad:number,
    p_nombre: string,
    p_precio: number,
    p_stock: number,
    mP_marca: string,
    p_Descripcion: string,
    cP_categoria: string,
    cA_precioVenta: number,
    cA_descuento: number,
    p_imagen: string,
    dP_subTotal:number,
    dP_precioUnitario:number
}

// {
//     "dP_idDetallePedido": "string",
//     "pE_idPedido": "string",
//     "p_idProducto": "string",
//     "dP_cantidad": 0,
//     "dP_precioUnitario": 0,
//     "dP_subTotal": 0
//   }