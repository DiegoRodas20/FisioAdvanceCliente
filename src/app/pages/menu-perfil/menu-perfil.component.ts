import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service'
import { Categoria, Producto } from '../../shared/models/producto.model'
import { Router } from '@angular/router'
import { CarritoService } from 'src/app/services/carrito.service';
import { Carrito } from 'src/app/shared/models/carrito.model';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { UsuarioCliente } from 'src/app/shared/models/usuario.model';

@Component({
    selector: 'app-menu-perfil',
    templateUrl: './menu-perfil.component.html'
})

export class MenuPerfilComponent implements OnInit {

perfil = false;
orden = false;
seguimiento = false;
nombreP:string;
emailP:string;
user: UsuarioCliente;
cod: string

    constructor(
        private _productoService: ProductoService,
        private _carritoService: CarritoService,
        private _router: Router,
    ) { }

    ngOnInit() {
        this.perfil = true;
        this.perfilLogueado();
    }
    perfilLogueado(){
      if (localStorage.getItem("user") != null) {
          this.user = JSON.parse(localStorage.getItem("user")) as UsuarioCliente;
          if (this.user.cod=='200') {
              this.nombreP = this.user.u_nombre;
              this.emailP = this.user.u_correoElectronico;
              this.cod='200'
          }
          else {
              this.cod='000';
          }
      }else{
      this.cod='000';
      }
    }

    open(opcion:string){
        
        switch(opcion) { 
            case opcion="perfil": { 
                this.perfil = true;
                this.orden = false;
                this.seguimiento = false;
               break; 
            } 
            case opcion="orden": { 
                this.orden = true;
                this.perfil = false; 
                this.seguimiento = false;
                break; 
             } 
             case opcion="seguimiento": { 
                this.orden = false;
                this.perfil = false; 
                this.seguimiento = true;
                break; 
             } 
         } 
    }
}