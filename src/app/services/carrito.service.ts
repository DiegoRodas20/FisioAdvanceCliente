import { Injectable } from '@angular/core';
import { Carrito } from '../shared/models/carrito.model';


@Injectable({
    providedIn: 'root'
})

export class CarritoService {

    lCarrito: Carrito[] = []

    constructor() { }

    getCarrito() {
        if (localStorage.getItem('Carrito') === null) {
            return this.lCarrito
        }
        else {
            this.lCarrito = JSON.parse(localStorage.getItem('Carrito'))
            return this.lCarrito
        }
    }

    addCarrito(carrito: Carrito) {
        let carritos: Carrito[] = []

        if (localStorage.getItem('Carrito') === null) {
            this.lCarrito.push(carrito)
            carritos.push(carrito)
            localStorage.setItem('Carrito', JSON.stringify(carritos))
            return 1
        }
        else {
            carritos = JSON.parse(localStorage.getItem('Carrito'))

            for (let element of carritos) {
                if (element.cA_idItem == carrito.cA_idItem) {
                    return 0
                }
            }

            this.lCarrito.push(carrito)
            carritos.push(carrito)
            localStorage.setItem('Carrito', JSON.stringify(carritos))
            return 1
        }

    }

    deleteCarrito(carrito: any) {

        for (let index = 0; index < this.lCarrito.length; index++) {
            if (carrito == this.lCarrito[index]) {
                this.lCarrito.splice(index, 1)
                localStorage.setItem('Carrito', JSON.stringify(this.lCarrito))
            }
        }

    }

}
