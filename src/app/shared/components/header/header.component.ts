import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
import { UserService } from 'src/app/services/user.service';
import { Login, UsuarioCliente } from '../../models/usuario.model';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

    lCarrito: any[] = [];
    user: UsuarioCliente;
    nombreUsuario: string;
    cod:string;
    contra: Login;

    constructor(
        private _router: Router,
        private _carritoService: CarritoService,
        private _userService:UserService
    ) { }

    ngOnInit() {
        this.getCarrito();
        this.perfilLogueado();
    }

    perfilLogueado(){
        if (localStorage.getItem("user") != null) {
            this.user = JSON.parse(localStorage.getItem("user")) as UsuarioCliente;
            if (this.user.cod=='200') {
                this.nombreUsuario = this.user.u_nombre;
                //this.nombreUsuario = this.user.ID;
                this.cod='200'
            }
            else {
                this.cod='000';
            }
        }else{
        this.cod='000';
        }
    }

    CerrarSesion(){
        this._userService.logout();
    }

    getCarrito() {
        this.lCarrito = this._carritoService.getCarrito()
        console.log(this.lCarrito)
    }

    deleteCarrito(carrito) {
        this._carritoService.deleteCarrito(carrito)
        this.getCarrito()
    }

    getSubTotal() {
        let subTotal = this._carritoService.getSubTotal(this.lCarrito)
        return subTotal
    }

    home() {
        this._router.navigate(['/'])
    }

    showCatalogo() {
        this._router.navigate(['/catalogo'])
    }

    showProducto() {
        this._router.navigate(['/producto'])
    }

    realizarPedido() {
        this._router.navigate(['/checkout'])
    }

    calcularTotal(event, carrito) {
        // carrito.cA_precioVenta / Number(carrito.p_precio - carrito.cA_descuento)
        carrito.cA_precioVenta = Number(event.target.value) * Number(carrito.p_precio - carrito.cA_descuento);
    }
}
