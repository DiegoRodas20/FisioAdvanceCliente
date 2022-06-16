import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_LISTAR_CLIENTE, URL_CLIENTE,URL_USUARIO, URL_TIPO_DOCUMENTO,URL_LISTAR_CLIENTE_DNI,URL_REGISTRAR_CLIENTE, URL_TIPO_DOCUMENTO2 } from 'src/utils/app.constants';
import {Usuario} from '../shared/models/cliente.model';


@Injectable({
    providedIn: 'root'
  })

  export class ClienteService {

    constructor(private http: HttpClient) { }
  
    getClientes(): Observable<any> {
      
      const url = `${URL_CLIENTE}`
      return this.http.get<any>(url)
    }
  
    // ------------------------------------------------------------
  public ListarClientes(): Observable<any> {
    return this.http.get(URL_CLIENTE)
  }
 
  public RegistrarCliente(data: Usuario): Observable<any> {
    return this.http.post(URL_USUARIO, data);
  }
  public ListarTipoDocumento(): Observable<any> {
    return this.http.get(URL_TIPO_DOCUMENTO2)
  }
  
}