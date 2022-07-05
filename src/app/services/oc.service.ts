import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_ORDEN_COMPRA_DETALLE, URL_ORDEN_COMPRA_ID } from 'src/utils/app.constants';




@Injectable({
  providedIn: 'root'
})

export class OcService {

  constructor(private http: HttpClient) { }

  //OC x ID
  getOcById(id: string): Observable<any> {
    return this.http.get<any>(URL_ORDEN_COMPRA_ID+id);
  }
  //Detalle OC x ID
  getDetalleOcById(id: string): Observable<any> {
    return this.http.get<any>(URL_ORDEN_COMPRA_DETALLE+id);
  }
}
