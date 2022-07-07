export interface Pedido {
    pE_idPedido: string,
    pE_fechaEmision: string,
    pE_total: number,
    c_idCliente: string,
    epE_idEstadoPedido:string,
    pE_metodoPago: string,
    pE_codigoTransaccion: string,
    pE_numSeguimiento:string,
    pE_fechaEnvio: string,
    pE_direccionEnvio: string,
    pE_metodoEnvio: string,
    pE_adicional: number,
    pE_referenciaEnvio: string,
    pE_fechaEntrega: string,
}


export interface DetallePedido {
    dP_idDetallePedido: string,
    pE_idPedido: string,
    p_idProducto: string,
    dP_cantidad: number,
    dP_precioUnitario: number,
    dP_subTotal: number
}

export interface PedidoListar {
    pE_idPedido: string,
    pE_fechaEmision: string,
    pE_total: number,
    cL_cliente: string,
    cL_correo: string,
    cL_telefono: string,
    epE_nombreEstado: string,
    pE_metodoPago: string,
    pE_codigoTransaccion: string,
    pE_numSeguimiento: string,
    pE_fechaEnvio: string,
    pE_direccionEnvio: string,
    pE_referenciaEnvio: string,
    pE_fechaEntrega: string
}

export interface PedidoCListar {
    pE_idPedido: string,
    pE_fechaEmision: string,
    pE_total: number,
    cL_cliente: string,
    cL_correo: string,
    epE_nombreEstado: string,    
    pE_direccionEnvio: string,
    pE_metodoEnvio: string,
    pE_metodoPago: string,
    pE_adicional: string
}

export interface DetallePedidoListar {
    dP_idDetallePedido: string,
    pE_idPedido: string,
    p_idProducto: string,
    p_nombreProducto: string,
    dP_cantidad: number,
    dP_precioUnitario: number,
    dP_subTotal: number
}

export interface DetallePJson {
    pE_idPedido: string,
    p_nombreProducto: string,
    p_imagen: string,
    dP_cantidad: number,
    dP_precioUnitario: number,
    dP_subTotal: number
}




