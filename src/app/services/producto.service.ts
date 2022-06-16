import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Producto,Categoria} from "../shared/models/producto.model";
import {URL_LISTAR_PRODUCTOS,URL_PRODUCTO_ID,URL_CATEGORIA} from "../../utils/app.constants";

@Injectable({
  providedIn: "root"
})

export class ProductoService {

  constructor(private http: HttpClient) {}

  getProductos(): Observable<any> {
    return this.http.get<any>(URL_LISTAR_PRODUCTOS);
  }

  getProductoxId(id: string): Observable<any> {
    return this.http.get<any>(URL_PRODUCTO_ID+ id);
  }

  getCategoria():Observable<any>{
    return this.http.get<any>(URL_CATEGORIA);
  }

}
