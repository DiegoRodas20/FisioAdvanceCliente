import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_DETALLE_PEDIDO, URL_PEDIDO } from 'src/utils/app.constants';


@Injectable({
    providedIn: 'root'
})

export class PedidoService {

    constructor(private http: HttpClient) { }

    postPedido(data: any): Observable<any> {
        const url = `${URL_PEDIDO}`
        return this.http.post(url,data)
      }
      postDPedido(data: any): Observable<any> {
        const url = `${URL_DETALLE_PEDIDO}`
        return this.http.post(url,data)
      } 
}
