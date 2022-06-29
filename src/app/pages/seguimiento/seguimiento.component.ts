import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { CarritoService } from 'src/app/services/carrito.service';
import { Carrito } from 'src/app/shared/models/carrito.model';
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
    selector: 'app-seguimiento',
    templateUrl: './seguimiento.component.html'
})

export class SeguimientoComponent implements OnInit {

    constructor(
        private _router: Router,
    ) { }

    ngOnInit() {
    }

   

}