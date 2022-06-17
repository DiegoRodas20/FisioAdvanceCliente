import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service'
import { Categoria, Producto } from '../../shared/models/producto.model'
import { Router } from '@angular/router'
import { CarritoService } from 'src/app/services/carrito.service';
import { Carrito } from 'src/app/shared/models/carrito.model';
import { Pedido, DetallePedido } from 'src/app/shared/models/pedido.model';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { PedidoService } from 'src/app/services/pedido.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    providers: [DatePipe]
})

export class CheckoutComponent implements OnInit {

    lCarrito: Carrito[] = [];
    formPedido: FormGroup;
    hoy = Date.now();

    // Lista Metodo Pago
    lMetodoPago: any[] = [
        { value: 'Seleccionar una opción' },
        { value: 'Transferencia Bancaria' },
        { value: 'Yape' },
        { value: 'Plin' },
    ]

    constructor(
        private _productoService: ProductoService,
        private _carritoService: CarritoService,
        private _router: Router,
        private _pedidoService: PedidoService,
        private _formBuilder: FormBuilder,
        public datepipe: DatePipe
    ) { }

    ngOnInit() {
        this.getCarrito();
        this.crearFormPedido();
    }

    getCarrito() {
        this.lCarrito = this._carritoService.getCarrito();
    }

    deleteCarrito(carrito) {
        this._carritoService.deleteCarrito(carrito)
        this.getCarrito()
    }

    getSubTotal() {
        let subTotal = this._carritoService.getSubTotal(this.lCarrito)
        return subTotal
    }

    crearFormPedido() {

        this.formPedido = this._formBuilder.group({
            direccionEnvio: [null, [Validators.required]],
            referenciaEnvio: [null, [Validators.required]],
            metodoPago: [null, [Validators.required]]
        })
    }


    // async postPedido(formPedido: FormGroup) {
    //     try {
    //         this.formPedido.get('pE_total').setValue(this.getSubTotal());
    //         // this.formPedido.get('cL_cliente').setValue(POR IMPLEMENTAR);
    //         console.log(formPedido.value);
    //         if (this.formPedido.status == 'VALID') {
    //             await this._pedidoService.postPedido(formPedido.value).subscribe(
    //                 (res) => {
    //                     console.log(res.idPedido);
    //                     for (let i = 0; i < this.lCarrito.length; i++) {
    //                         this.lCarrito[i].pE_idPedido = res.idPedido;
    //                         this._pedidoService.postDPedido(this.lCarrito[i]).subscribe(
    //                             (res) => {
    //                                 console.log(res);
    //                             })
    //                     }

    //                     Swal.fire({
    //                         title: 'Pedido realizado con exito!',
    //                         icon: 'success',
    //                         timer: 3000,
    //                         showConfirmButton: false
    //                     })
    //                     //   .then(()=>
    //                     // //   this.cerrarVentana()
    //                     //   );

    //                     // this.formPedido.patchValue(res);
    //                 });
    //         } else {
    //             Swal.fire({
    //                 title: 'Error',
    //                 text: 'Completar los campos requeridos',
    //                 toast: true,
    //                 position: 'top-end',
    //                 icon: 'error',
    //                 timer: 3000,
    //                 showConfirmButton: false
    //             });
    //         }
    //     }
    //     catch (error) {
    //         console.log("Error: ", error);
    //         Swal.fire({
    //             title: 'Error',
    //             text: error,
    //             toast: true,
    //             position: 'top-end',
    //             icon: 'warning',
    //             timer: 3000,
    //             showConfirmButton: false
    //         });
    //     }
    // }

    async registrarPedido() {

        if (this.formPedido.invalid) {
            Swal.fire({
                title: 'Error',
                text: 'Completar los campos requeridos',
                toast: true,
                position: 'top-end',
                icon: 'error',
                timer: 3000,
                showConfirmButton: false
            });
            return
        }

        let hoy = Date.now();
        let latest_date = this.datepipe.transform(hoy, 'yyyy-MM-dd');

        let form = this.formPedido.value
        let Pedido: Pedido = {
            pE_idPedido: null,
            pE_fechaEmision: latest_date,
            pE_total: this.getSubTotal(),
            c_idCliente: '629963cc4f5cb36f90be996f',
            epE_idEstadoPedido: '626797e0d62f92af437425b5',
            pE_metodoPago: form.metodoPago,
            pE_codigoTransaccion: null,
            pE_numSeguimiento: null,
            pE_fechaEnvio: latest_date,
            pE_direccionEnvio: form.direccionEnvio,
            pE_referenciaEnvio: form.referenciaEnvio,
            pE_fechaEntrega: null
        }

        try {
            let data = await this._pedidoService.registrarPedido(Pedido)
            this.registrarDetallePedido(data)
        }
        catch (error) {
            console.error(error)
            Swal.fire({
                title: 'Error',
                text: error,
                toast: true,
                position: 'top-end',
                icon: 'warning',
                timer: 3000,
                showConfirmButton: false
            });
        }

        console.log(Pedido)
    }

    async registrarDetallePedido(data: any) {

        try {
            for (let element of this.lCarrito) {

                let DetallePedido: DetallePedido = {
                    dP_idDetallePedido: null,
                    pE_idPedido: data.idPedido,
                    p_idProducto: element.cA_idItem,
                    dP_cantidad: element.cantidad,
                    dP_precioUnitario: element.p_precio - element.cA_descuento,
                    dP_subTotal: element.cA_precioVenta
                }
                console.log(DetallePedido)
                let responseDetallePedido = await this._pedidoService.registrarDetallePedido(DetallePedido)
                console.log(responseDetallePedido)
            }

            localStorage.removeItem('Carrito')

            Swal.fire({
                icon: 'success',
                title: 'Exito',
                text: 'Se registro completamente el pedido'
            }).then(
                (result) =>
                    this.goCatalogo()
            )
        }
        catch (error) {
            console.error(error)
            Swal.fire({
                title: 'Error',
                text: error,
                toast: true,
                position: 'top-end',
                icon: 'warning',
                timer: 3000,
                showConfirmButton: false
            });
        }

    }

    goCatalogo() {
        this._router.navigate(['/catalogo'])
    }

}