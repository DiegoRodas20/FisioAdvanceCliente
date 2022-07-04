import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, ParamMap, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: 'breadcrumb.component.html',
})

export class BreadcrumbComponent implements OnDestroy {

    titulo: string
    tituloSubscripcion: Subscription
    subTitulo: string;
    sub2titulo:string;
    sub3titulo:string;
    ruta:string[]=[]

    constructor(private _route: ActivatedRoute,
        private router: Router
    ) {
        this.tituloSubscripcion = this.getArgumentosRuta().subscribe(({ titulo }) => {
            this.titulo = titulo
            let url = this.router.url;
            this.ruta = url.split('/');
            this.subTitulo= this.ruta[2];
            this.sub2titulo= this.ruta[3];
            this.sub3titulo=this.ruta[4];
        });
        
    }

    ngOnDestroy() {
        this.tituloSubscripcion.unsubscribe();
    }

    getArgumentosRuta() {
        return this.router.events
            .pipe(
                filter(event => event instanceof ActivationEnd),
                filter((event: ActivationEnd) => event.snapshot.firstChild === null),
                map((event: ActivationEnd) => event.snapshot.data)
            )
    }
}