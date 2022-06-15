import { Component, OnInit } from '@angular/core';
import { Producto } from '../../shared/models/producto.model';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
    selector: 'app-producto',
    templateUrl: './producto.component.html'
})

export class ProductoComponent implements OnInit {

    producto: Producto

    constructor(
        private _route: ActivatedRoute,
        private _productoService: ProductoService,
        private _carritoService: CarritoService,
    ) { }

    ngOnInit() {
        this._route.params.subscribe(params => {
            this._productoService.getProductoxId(params.id).subscribe((res) => { this.producto = res[0] })
        })

    }

    agregarCarrito(producto) {
        console.log(producto)
        var estado = this._carritoService.addCarrito(producto)

        if (estado == 0) {
            console.log('NO SE PUEDE REPETIR EL PRODUCTO')
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No puedes añadir un producto que ya se encuentra en el carrito'
            })
        }
        else {
            Swal.fire({
                icon: 'success',
                title: 'Exito',
                text: 'Se añadio el producto en el carrito',
                timer: 3000,
                timerProgressBar: true,
            })

            console.log('REGISTRADO EN EL CARRITO')
        }
    }

}
