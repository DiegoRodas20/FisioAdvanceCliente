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
import { UsuarioCliente } from 'src/app/shared/models/usuario.model';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import { Ubigeo } from 'src/app/shared/models/ubigeo.model';


@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    providers: [DatePipe]
})

export class CheckoutComponent implements OnInit {

    lCarrito: Carrito[] = [];
    formPedido: FormGroup;
    hoy = Date.now();
    direccioningreso:boolean;
    idCliente: string;
    departamento:Ubigeo[]=[];
    provincia:Ubigeo[]=[];
    distrito:Ubigeo[]=[];

    lMetodoPago: any[] = [
        { value: 'Seleccionar una opción' },
        { value: 'Transferencia Bancaria' },
        { value: 'Yape' },
        { value: 'Plin' },
    ]
    user: UsuarioCliente;

    constructor(
        private _ubigeoService: UbigeoService,
        private _carritoService: CarritoService,
        private _router: Router,
        private _pedidoService: PedidoService,
        private _formBuilder: FormBuilder,
        public datepipe: DatePipe
    ) { }

    ngOnInit() {
        this.crearFormPedido();
        if (localStorage.getItem("user") != null) {
            this.user = JSON.parse(localStorage.getItem("user")) as UsuarioCliente;
            this.idCliente = this.user.u_idUsuario;
            this.perfilLogueado();
            this.updatevalidartors()
        }
        this.getCarrito();
        this.getDepartamento();
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
            metodoenvio: [null],
            adicional: [''],
            metodoPago: ['', [Validators.required]],
            dep: [''],
            prov: [''],
            dist: [''],
        })
    }

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
            c_idCliente: this.idCliente,
            epE_idEstadoPedido: '626797e0d62f92af437425b5',
            pE_metodoPago: form.metodoPago,
            pE_codigoTransaccion: null,
            pE_numSeguimiento: null,
            pE_fechaEnvio: latest_date,
            pE_direccionEnvio: form.direccionEnvio + ', ' + form.dist + ', ' + form.prov + ', ' + form.dep,
            pE_referenciaEnvio: form.referenciaEnvio,
            pE_fechaEntrega: null,
            pE_adicional: 0,            
            pE_metodoEnvio: 'fdgrdg'
            
        }
        // form.metodoenvio
            // form.adicional,

        try {
            let data = await this._pedidoService.registrarPedido(Pedido)
            console.log(data)
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
    }

    async registrarDetallePedido(data: any) {
        try {
            for (let element of this.lCarrito) {

                let DetallePedido: DetallePedido = {
                    dP_idDetallePedido: '',
                    pE_idPedido: data.idPedido,
                    p_idProducto: element.p_idProducto,
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

    perfilLogueado():Boolean{
        
            if (this.user.cod=='200') {
                if(this.user.u_direccion == ''){
                    return this.direccioningreso = true;
                }else {return this.direccioningreso = false;}

            }
            else {
                return this.direccioningreso = false;
            }   
    }

    updatevalidartors(){
        if(this.direccioningreso==true){
            this.formPedido.controls['dep'].setValidators([Validators.required]);
            this.formPedido.controls['prov'].setValidators([Validators.required]);
            this.formPedido.controls['dist'].setValidators([Validators.required]);
        }
    }

    getDepartamento(){
        this._ubigeoService.getDepartamento().subscribe((res) => { 
            this.departamento=res.facet_groups[0].facets;
        }) ;
    }
    
    getProvincia(){
        this.formPedido.value.prov='';
        this._ubigeoService.getProvincia(this.formPedido.value.dep,this.formPedido.value.prov).subscribe((res) => { 
            this.provincia=res.facet_groups[1].facets;
        }) ; 
    }

    getDistrito(){
        this.distrito=[];
        this._ubigeoService.getProvincia(this.formPedido.value.dep,this.formPedido.value.prov).subscribe((res) => { 
            this.distrito=res.facet_groups[2].facets;
        }) ; 
    }
}