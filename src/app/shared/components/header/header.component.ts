import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

    constructor(
        private _router: Router,
    ) { }

    ngOnInit() { }


    home() {
        this._router.navigate(['/home'])
    }

    showCatalogo() {
        this._router.navigate(['/catalogo'])
    }

    showProducto() {
        this._router.navigate(['/producto'])
    }
}