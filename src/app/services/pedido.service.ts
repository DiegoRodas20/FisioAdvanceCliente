import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  URL_DETALLE_PEDIDO,
  URL_PEDIDO,
  URL_PEDIDO_ID,
} from 'src/utils/app.constants';
import { DetallePedido, Pedido } from '../shared/models/pedido.model';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  constructor(private http: HttpClient) {}

  // Registrar Pedido
  registrarPedido(pedido: Pedido): Promise<any> {
    const url = `${URL_PEDIDO}`;
    return this.http.post<any>(url, pedido).toPromise();
  }

  // Registrar detalle pedido
  registrarDetallePedido(detallePedido: DetallePedido): Promise<any> {
    const url = `${URL_DETALLE_PEDIDO}`;
    return this.http.post<any>(url, detallePedido).toPromise();
  }

  // Obtener pedido por id
  obtenerPedidoById(id: string): Observable<any> {
    return this.http.get<any>(URL_PEDIDO_ID + id);
  }
  // Obtener detalle pedido por id
  obtenerDetallePedidoById(id: string): Observable<any> {
    return this.http.get<any>(URL_DETALLE_PEDIDO + id);
  }
}
