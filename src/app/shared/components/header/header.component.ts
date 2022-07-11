import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
import { UserService } from 'src/app/services/user.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import Swal from 'sweetalert2';
import { swalWithBootstrapButtons } from 'src/app/services/swal.service';
import { Login, UsuarioCliente } from '../../models/usuario.model';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers:[AuthGuardService]
})

export class HeaderComponent implements OnInit {

    lCarrito: any[] = [];
    user: UsuarioCliente;
    nombreUsuario: string;
    cod:string;
    modal:boolean = false;
    contra: Login;

    constructor(
        private _router: Router,
        private _carritoService: CarritoService,
        private _userService:UserService,
        private _auth: AuthGuardService
    ) { }

    ngOnInit() {
        this.getCarrito();
        
        this.perfilLogueado();
    }

    perfilLogueado(){
        if (localStorage.getItem("user") != null) {
            this.user = JSON.parse(localStorage.getItem("user")) as UsuarioCliente;
            if (this.user.cod=='200') {
                this.nombreUsuario = this.user.u_nombre;
                //this.nombreUsuario = this.user.ID;
                this.cod='200'
            }
            else {
                this.cod='000';
            }
        }else{
        this.cod='000';
        }
    }

    CerrarSesion(){
        
        this._userService.logout();
        this._router.navigate(['/catalogo']);
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

    home() {
        this._router.navigate(['/'])
    }

    showCatalogo() {
        this._router.navigate(['/catalogo'])
    }

    showProducto() {
        this._router.navigate(['/producto'])
    }

    realizarPedido() {
        let verificar = this._auth.verificarLogeo()
        if(verificar==true){
            this._router.navigate(['/checkout']);
        }
        else{
            // Swal.fire({
            //     title: '',
            //     text: "Debe iniciar sesion para continuar",
            //     icon: 'warning',
            //     // confirmButtonColor: '#3085d6',
            //     confirmButtonText:
            //     '<a _ngcontent-elo-c51="" href="#modal-signin" data-bs-toggle="modal" data-view="#modal-signin-view" class="topbar-link d-lg-inline-block d-none ms-4 ps-1 text-decoration-none text-nowrap"> <i _ngcontent-elo-c51="" class="ci-profile me-1 fs-base align-middle"></i>Iniciar Sesión</a>',
            //     confirmButtonAriaLabel: 'Thumbs up, great!',
            //   })

              swalWithBootstrapButtons.fire({
                // title: '¿Está seguro de eliminar el producto?',
                text: "Debe iniciar sesion para continuar",
                icon: 'info',
                // showCancelButton: true,
                confirmButtonText:
                '<a _ngcontent-elo-c51="" href="#modal-signin" data-bs-toggle="modal" data-view="#modal-signin-view" class="d-lg-inline-block d-none text-decoration-none text-nowrap"> <i _ngcontent-elo-c51="" class="ci-profile me-1 fs-base align-middle"></i>Iniciar Sesión</a>',
                // cancelButtonText: '¡No, cancelar!',
                // reverseButtons: true
              })


        }
        
    }

    calcularTotal(event, carrito) {
        // carrito.cA_precioVenta / Number(carrito.p_precio - carrito.cA_descuento)
        carrito.cA_precioVenta = Number(event.target.value) * Number(carrito.p_precio - carrito.cA_descuento);
    }
}
