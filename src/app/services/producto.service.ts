import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Producto, Categoria, Marca } from "../shared/models/producto.model";
import { URL_LISTAR_PRODUCTOS, URL_PRODUCTO_ID, URL_CATEGORIA, URL_MARCA } from "../../utils/app.constants";

@Injectable({
  providedIn: "root"
})

export class ProductoService {

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(URL_LISTAR_PRODUCTOS);
  }

  getProductosFilter(marca: any, categoria: any): Observable<Producto[]> {
    if (marca != null && categoria == null) {
      return this.http.get<Producto[]>(URL_LISTAR_PRODUCTOS + '/GetbyFilter?idMarca=' + marca);
    }
    if (categoria != null && marca == null) {
      return this.http.get<Producto[]>(URL_LISTAR_PRODUCTOS + '/GetbyFilter?idCategoria=' + categoria);
    }
    else  {
      return this.http.get<Producto[]>(URL_LISTAR_PRODUCTOS + `/GetbyFilter?idCategoria=${categoria}&idMarca=${marca}`);
    }
  }

  getMarcas(): Observable<Marca[]> {
    return this.http.get<Marca[]>(URL_MARCA);
  }

  getProductoxId(id: string): Observable<Producto> {
    return this.http.get<Producto>(URL_PRODUCTO_ID + id);
  }

  getCategoria(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(URL_CATEGORIA);
  }



}
