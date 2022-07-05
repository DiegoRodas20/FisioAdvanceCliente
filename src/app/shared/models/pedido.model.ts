export interface Pedido {
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

export interface DetallePedido {
    dP_idDetallePedido: string,
    pE_idPedido: string,
    p_idProducto: string,
    p_nombreProducto: string,
    dP_cantidad: number,
    dP_precioUnitario: number,
    dP_subTotal: number
}
