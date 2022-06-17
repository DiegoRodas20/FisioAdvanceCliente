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
        this._router.navigate(['/home'])
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