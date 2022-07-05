import { StringifyOptions } from "querystring";

export class Oc {
  constructor(
  public oC_idOC: string,
  public pV_idProveedor: string,
  public pV_razonSocial: string,
  public pV_nombre: string,
  public pV_correo: string,
  public eoC_idEstadoOC: string,
  public eoC_nombre: string,
  public oC_fechaCreacion: string,
  public pV_telefono: string,
  public oC_total: number
  ) {}
}

export class DetalleOc {
  constructor(
  public doC_idDetalleOC: string,
  public oC_idOC: string,
  public p_idProducto: string,
  public p_nombreproducto: string,
  public doC_cantidad: number,
  public doC_precio: number,
  public doC_subTotal: number,
  public doC_StockMax: number,
  ) {}
}
