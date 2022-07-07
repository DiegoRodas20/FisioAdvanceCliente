import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_AUTH_BASE, URL_CAMBIAR_CONTRASENA, URL_CLIENTE, URL_CLIENTE_ID, URL_CORREO_RECUPERA, URL_DESHABILITIAR_CLIENTE, URL_VALIDAR_CODIGO } from 'src/utils/app.constants';
import { Login } from '../shared/models/usuario.model';


@Injectable({ providedIn: 'root' })
export class UserService {
    SelectLogin: Login = {
        
        Username:'',
        Password:''
    };
  
    constructor(
        private router: Router,
        private http: HttpClient
    ) {
    }
    login(user: any) : Observable<any> {
            var oJSON = JSON.stringify(user);
            let items$ = this.http
                .post(URL_AUTH_BASE, user)
            return items$;
        
    }
    logout() {
        localStorage.removeItem('user');
        window.location.reload();   
    }
    public getClienteXid(id:string): Observable<any>{
        return this.http.get(URL_CLIENTE_ID+'?idCliente=' + `${id}`)
    }
    public putClienteXid(data: any): Observable<any>{
        return this.http.put(URL_CLIENTE, data);
    }
    public deleteClienteXid(id:string): Observable<any>{
        return this.http.delete(URL_CLIENTE_ID+'?idCliente=' + `${id}`);
    }    
    public desactivarPerfil(data): Observable<any>{
        return this.http.put(URL_DESHABILITIAR_CLIENTE, data);
    }
    public correoCodigo(correo:any): Observable<any>{
        return this.http.get(URL_CORREO_RECUPERA+`${correo}`);
    }
    public validarCodigo(correo:any, codigo:any): Observable<any>{
        return this.http.get(URL_VALIDAR_CODIGO+`${correo}`+"/"+`${codigo}`);
    }
    public actualizarContrasena(data:any): Observable<any>{
        return this.http.put(URL_CAMBIAR_CONTRASENA, data);
    }    
}