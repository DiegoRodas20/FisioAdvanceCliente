import { Component, OnInit } from '@angular/core';
import {ProductoService} from '../../services/producto.service'
import {Producto} from '../../shared/models/producto.model'
import {Router} from '@angular/router'

@Component({
    selector: 'app-catalogo',
    templateUrl: './catalogo.component.html'
})

export class CatalogoComponent implements OnInit {

    productos : Producto[]

    constructor(private _productoService:ProductoService,private _router: Router,) { }

    ngOnInit() {

      this._productoService.getProductos().subscribe((res)=>{
        this.productos = res
      })
    }

    goProductoId(id:string){
      this._router.navigate(['/producto',id])
    }

}
