import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service'
import { Categoria, Producto } from '../../shared/models/producto.model'
import { Router } from '@angular/router'
import { CarritoService } from 'src/app/services/carrito.service';
import { Carrito } from 'src/app/shared/models/carrito.model';
import { Pedido, DetallePedido, PedidoCListar, DetallePJson } from 'src/app/shared/models/pedido.model';
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
    correo: string;
    nomCliente: string;
    departamento:Ubigeo[]=[];
    provincia:Ubigeo[]=[];
    distrito:Ubigeo[]=[];
    user: UsuarioCliente;
    cuentaMetodo:string;
    lDetalle: DetallePJson[] = [];
    detalleString: string;
    latest_date:any;
    xEstacion=false;
    referencia:string;
    direccion:string;
    puntos=[
        {value: "Plaza norte"},
        {value: "Mega Plaza"},
        {value: "Tottus Canta"},
        {value: "Estación del metropolitano"},
        {value: "Estación del metro"}
    ]
    horario={
        0:["Lunes de 4:00 pm a 6:00  pm"],
        1:["Lunes de 6:30 pm a 8:00 pm"],
        2:["Todos los dias de 8:00 am a 6 pm"],
        3:["Sabado 9:00 am a 11:30 am"],
        4:["Domingo 9:00 am a 11:30 am"]
        }
       
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
            this.nomCliente =this.user.u_nombre;
            this.correo =this.user.u_correoElectronico;
            this.hoy = Date.now();
            this.latest_date = this.datepipe.transform(this.hoy, 'yyyy-MM-dd');
            this.perfilLogueado();
            this.updatevalidartors();
        }
        this.getCarrito();
        this.getDepartamento();
        
        this.puntos;
        this.horario;
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
            direccionEnvio: [''],
            referenciaEnvio: [''],
            metodoenvio: ['', [Validators.required]],
            adicional: [0, [Validators.required]],
            metodoPago: ['', [Validators.required]],
            dep: [''],
            prov: [''],
            dist: [''],
            estacion:['']
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

        if(this.formPedido.value.dep==''){
            this.formPedido.value.referenciaEnvio=  this.referencia;

            this.direccion=this.formPedido.value.direccionEnvio= this.formPedido.value.direccionEnvio + ' ' + 
            this.formPedido.value.estacion 
        }
        else{

            this.direccion=this.formPedido.value.direccionEnvio = this.formPedido.value.direccionEnvio + ', ' + 
            this.formPedido.value.dist + ', ' + 
            this.formPedido.value.prov + ', ' + 
            this.formPedido.value.dep
        }
        
        let form = this.formPedido.value
        let Pedido: Pedido = {
            pE_idPedido: '',
            pE_fechaEmision: this.latest_date,
            pE_total: this.getSubTotal(),
            c_idCliente: this.idCliente,
            epE_idEstadoPedido: '626797e0d62f92af437425b5',
            pE_metodoPago: form.metodoPago,
            pE_codigoTransaccion: '',
            pE_numSeguimiento: '',
            pE_fechaEnvio: this.latest_date,
            pE_direccionEnvio: form.direccionEnvio,
            pE_referenciaEnvio: form.referenciaEnvio,
            pE_fechaEntrega: '',
            pE_adicional: form.adicional,            
            pE_metodoEnvio: form.metodoenvio
        }
            console.log(Pedido.pE_referenciaEnvio);
            console.log(Pedido.pE_direccionEnvio)

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
                let responseDetallePedido = await this._pedidoService.registrarDetallePedido(DetallePedido)
                let DetallePedidoC: DetallePJson = {
                    pE_idPedido: data.idPedido,
                    p_nombreProducto: element.p_nombre,
                    dP_cantidad: element.cantidad,
                    dP_precioUnitario: element.p_precio - element.cA_descuento,
                    dP_subTotal: element.cA_precioVenta,
                    p_imagen: element.p_imagen
                }
                this.lDetalle.push(DetallePedidoC);
            }

            let form = this.formPedido.value
            let Pedido: PedidoCListar = {
                pE_idPedido: '',
                pE_fechaEmision: this.latest_date,
                pE_total: this.getSubTotal(),
                cL_cliente: this.nomCliente,
                pE_metodoPago: form.metodoPago,
                pE_direccionEnvio: this.direccion,
                pE_adicional: form.adicional,            
                pE_metodoEnvio: form.metodoenvio,
                cL_correo:this.correo,
                epE_nombreEstado:'Recibido'

            }
            this.enviarCorreo(Pedido,this.lDetalle);

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

    metodoPago(opcion:any):string{
        switch(opcion) { 
            case opcion="Transferencia bancaria": { 
                this.cuentaMetodo="Mi número de cuenta BCP Soles es 19193041287096."+
                "  Mi número de cuenta interbancaria es 00219119304128709653."
               break; 
            } 
            case opcion="Yape": { 
                this.cuentaMetodo="Yape: 965847792"
                break; 
             } 
             case opcion="Plin": { 
                this.cuentaMetodo="Plin: 965847792"
                break; 
             } 
         } 
         return this.cuentaMetodo;
    }

    adicionalPago(opcion:any):number{
        switch(opcion) { 
            case opcion="Recoge en tienda": { 
                this.formPedido.value.adicional=0;
                this.formPedido.value.referenciaEnvio="Recoge en tienda";
                this.direccion=this.formPedido.value.direccionEnvio="Recoge en tienda";
               break; 
            } 
            case opcion="Contra entrega": { 
                this.formPedido.value.adicional=8
                break; 
             } 
             case opcion="Olva courier": { 
                this.formPedido.value.adicional=15
                break; 
             } 
         } 
         return this.formPedido.value.adicional;
    }

    async enviarCorreo(correo: PedidoCListar, dPedidoC:DetallePJson[]) {

        try {
            this.lDetalle = dPedidoC;
            this.detalleString = JSON.stringify(this.lDetalle);
            
            let pe = {
                pE_idPedido:correo.pE_idPedido,
                pE_fechaEmision:correo.pE_fechaEmision ,
                pE_total: correo.pE_total,
                cL_cliente: correo.cL_cliente,
                cL_correo:correo.cL_correo ,
                epE_nombreEstado:correo.epE_nombreEstado,
                pE_direccionEnvio:correo.pE_direccionEnvio ,
                pE_metodoEnvio:correo.pE_metodoEnvio,
                pE_metodoPago:correo.pE_metodoPago,
                pE_adicional: correo.pE_adicional,
                jsonDetalle: this.detalleString
            }
            this._pedidoService.postCorreo(pe).subscribe();
        }
        catch (error) {
            console.log("Error: ", error)
        }

        finally { }
    }

    onChange(){
        let metodoenvio = this.formPedido.value.direccionEnvio;
        this.formPedido.reset;
        switch(metodoenvio) { 
            case metodoenvio="Plaza norte": { 
               this.referencia = this.horario[0][0];
               this.xEstacion=false;
               break; 
            } 
            case metodoenvio="Mega Plaza": { 
                this.referencia = this.horario[1][0];
                this.xEstacion=false;
                break; 
             } 
             case metodoenvio="Tottus Canta": { 
                this.referencia = this.horario[2][0];
                this.xEstacion=false;
                break; 
             } 
             case metodoenvio="Estación del metropolitano": { 
                this.referencia = this.horario[3][0];
                this.xEstacion=true;
                break; 
             } 
             case metodoenvio="Estación del metro": { 
                this.referencia = this.horario[4][0];
                this.xEstacion=true;
                break; 
             }
         } 
    }
}
