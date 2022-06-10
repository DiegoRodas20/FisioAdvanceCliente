import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Producto } from "../shared/models/producto.model";
import {URL_LISTAR_PRODUCTOS,URL_PRODUCTO_ID} from "../../utils/app.constants";

@Injectable({
  providedIn: "root"
})

export class ProductoService {

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(URL_LISTAR_PRODUCTOS);
  }

  getProductoxId(id: string): Observable<Producto> {
    return this.http.get<Producto>(URL_PRODUCTO_ID+ id);
  }

}
