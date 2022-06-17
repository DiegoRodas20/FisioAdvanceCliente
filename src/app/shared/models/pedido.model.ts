export interface Pedido {
    pE_idPedido: string,
    pE_fechaEmision: string,
    pE_total: number,
    c_idCliente: string,
    epE_idEstadoPedido: string,
    pE_metodoPago: string,
    pE_codigoTransaccion: string,
    pE_numSeguimiento: string,
    pE_fechaEnvio: string,
    pE_direccionEnvio: string,
    pE_referenciaEnvio: string,
    pE_fechaEntrega: string
}

export interface DetallePedido {
    dP_idDetallePedido: string,
    pE_idPedido: string,
    p_idProducto: string,
    dP_cantidad: number,
    dP_precioUnitario: number,
    dP_subTotal: number
}