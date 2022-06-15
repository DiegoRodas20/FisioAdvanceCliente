import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service'
import { Categoria, Producto } from '../../shared/models/producto.model'
import { Router } from '@angular/router'
import { CarritoService } from 'src/app/services/carrito.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
    selector: 'app-catalogo',
    templateUrl: './catalogo.component.html'
})

export class CatalogoComponent implements OnInit {

    productos: Producto[]
    categorias: Categoria[]
    // productos : Producto[]
    // categorias : Categoria[]
    input : string
    categoria:string

    constructor(
        private _productoService: ProductoService,
        private _carritoService: CarritoService,
        private _router: Router,
    ) { }

    ngOnInit() {

        this._productoService.getProductos().subscribe((res) => {
            this.productos = res
        })

        this._productoService.getCategoria().subscribe((res) => {
            this.categorias = res
        })
    }

    goProductoId(id: string) {
        this._router.navigate(['/producto', id])
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