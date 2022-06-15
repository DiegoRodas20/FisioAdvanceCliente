import { Component, OnInit } from '@angular/core';
import {ProductoService} from '../../services/producto.service'
import {Categoria, Producto} from '../../shared/models/producto.model'
import {Router} from '@angular/router'

@Component({
    selector: 'app-catalogo',
    templateUrl: './catalogo.component.html'
})

export class CatalogoComponent implements OnInit {

    productos : Producto[]
    categorias : Categoria[]
    input : string
    categoria:string

    constructor(private _productoService:ProductoService,private _router: Router,) { }

    ngOnInit() {

      this._productoService.getProductos().subscribe((res)=>{
        this.productos = res
      })

      this._productoService.getCategoria().subscribe((res)=>{
        this.categorias = res
      })
    }

    goProductoId(id:string){
      this._router.navigate(['/producto',id])
    }

}
