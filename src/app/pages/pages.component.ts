import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html'
})

export class PagesComponent implements OnInit {

    estado: string = 'active'

    constructor(
        private _router: Router
    ) {
        this.preloader()
    }

    ngOnInit() { }

    preloader() {

        this._router.events.subscribe(
            events => {

                this.estado = 'active'

                setTimeout(() => {
                    this.estado = ''
                }, 2000)

            });

    }
}