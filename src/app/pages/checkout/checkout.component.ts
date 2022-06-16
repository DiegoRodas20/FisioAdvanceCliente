import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service'
import { Categoria, Producto } from '../../shared/models/producto.model'
import { Router } from '@angular/router'
import { CarritoService } from 'src/app/services/carrito.service';
import { Carrito } from 'src/app/shared/models/carrito.model';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { PedidoService } from 'src/app/services/pedido.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    providers:[DatePipe]
})

export class CheckoutComponent implements OnInit {

    lCarrito: Carrito[] = [];
    formPedido: FormGroup;
    hoy = Date.now();

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
        let latest_date =this.datepipe.transform(this.hoy, 'yyyy-MM-dd');
        this.formPedido.get('pE_fechaEmision').setValue(latest_date);
        console.log(this.lCarrito);
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
            pE_fechaEmision: ['', []],
            pE_total: ['', []],
            c_idCliente:['629963cc4f5cb36f90be996f', [Validators.required]],
            // cL_cliente: ['629963cc4f5cb36f90be996f', []],
            // cL_correo: ['', []],
            epE_idEstadoPedido: ['626797e0d62f92af437425b5', []],
            pE_referenciaEnvio: ['', [Validators.required]],
            // cL_telefono: ['', []],
            pE_codigoTransaccion: ['', []],
            pE_direccionEnvio: ['', [Validators.required]],
            pE_fechaEntrega: ['', []],
            pE_fechaEnvio: ['', []],
            pE_metodoPago: ['Yape', []],
            pE_numSeguimiento: ['', []],
        })
    }


    async postPedido(formPedido:FormGroup) {   
        try {
            this.formPedido.get('pE_total').setValue(this.getSubTotal());
            // this.formPedido.get('cL_cliente').setValue(POR IMPLEMENTAR);
            console.log(formPedido.value);
            if (this.formPedido.status == 'VALID') {
             await this._pedidoService.postPedido(formPedido.value).subscribe(
                (res) => {
                    console.log(res.idPedido);
                for(let i = 0; i < this.lCarrito.length; i++){
                this.lCarrito[i].pE_idPedido=res.idPedido;
                this._pedidoService.postDPedido(this.lCarrito[i]).subscribe(
                    (res) => {
                        console.log(res);
                        
                    })}

                    Swal.fire({
                        title: 'Pedido realizado con exito!',
                        icon: 'success',
                        timer: 3000,
                        showConfirmButton: false
                      })
                    //   .then(()=>
                    // //   this.cerrarVentana()
                    //   );

                    // this.formPedido.patchValue(res);
                });
            }else {
                Swal.fire({
                  title: 'Error',
                  text: 'Completar los campos requeridos',
                  toast: true,
                  position: 'top-end',
                  icon: 'error',
                  timer: 3000,
                  showConfirmButton: false
                });
              }
        }
        catch (error) {
            console.log("Error: ", error);
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
    
    postDetallePedido(){
        // {
        //     "dP_idDetallePedido": "string",
        //     "pE_idPedido": "string",
        //     "p_idProducto": "string",
        //     "dP_cantidad": 0,
        //     "dP_precioUnitario": 0,
        //     "dP_subTotal": 0
        //   }
    }

}