import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service'
import { Categoria, Producto } from '../../shared/models/producto.model'
import { Router } from '@angular/router'
import { CarritoService } from 'src/app/services/carrito.service';
import { Carrito } from 'src/app/shared/models/carrito.model';
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html'
})

export class CheckoutComponent implements OnInit {

    lCarrito: Carrito[] = []

    constructor(
        private _productoService: ProductoService,
        private _carritoService: CarritoService,
        private _router: Router,
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

}