import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

    lCarrito: any[] = []

    constructor(
        private _router: Router,
        private _carritoService: CarritoService,
    ) { }

    ngOnInit() {
        this.getCarrito()
    }

    getCarrito() {
        this.lCarrito = this._carritoService.getCarrito()
    }

    deleteCarrito(carrito) {
        this._carritoService.deleteCarrito(carrito)
        this.getCarrito()
    }

    get subTotal() {

        let montoCarrito = 0

        if (this.lCarrito.length > 0) {
            for (let i of this.lCarrito) {
                montoCarrito = montoCarrito + i.cA_precioVenta
            }
        }

        return montoCarrito
    }

    home() {
        this._router.navigate(['/home'])
    }

    showCatalogo() {
        this._router.navigate(['/catalogo'])
    }

    showProducto() {
        this._router.navigate(['/producto'])
    }

    realizarPedido(){
        this._router.navigate(['/checkout'])
    }
}