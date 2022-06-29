import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { UsuarioCliente } from '../shared/models/usuario.model';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

    constructor(public router: Router) {
    }

    canActivate(): boolean {
        return this.verificarLogeo();
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.verificarLogeo();
    }

    verificarLogeo(): boolean {
        if (window.localStorage.getItem("user") != null) {
            let user = JSON.parse(window.localStorage.getItem("user")) as UsuarioCliente;
            if (user.cod=='200') {
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    }
}