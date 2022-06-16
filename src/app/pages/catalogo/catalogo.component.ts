import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service'
import { Producto, Marca } from '../../shared/models/producto.model'
import { Router } from '@angular/router'
import { CarritoService } from 'src/app/services/carrito.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'

interface Categorias {
  id: string
  nombre: string;
  cuenta: number;
  selected: boolean;
}

interface Marcas {
  id: string
  nombre: string;
  cuenta: number;
  selected: boolean;
}

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html'
})

export class CatalogoComponent implements OnInit {



  productos: Producto[]
  categorias: Categorias[] = []
  marcas: Marcas[] =[]
  input: string
  categoria: string
  categoriaSeleccionada: string = null
  marcaSeleccionada: string = null


  constructor(
    private _productoService: ProductoService,
    private _carritoService: CarritoService,
    private _router: Router,
  ) { }

  ngOnInit() {

    this._productoService.getProductos().subscribe((res) => {
      this.productos = res
    })

    this._productoService.getCategoria().subscribe((res) => {
      res.map((categoria) => this.categorias.push({ id: categoria.cP_idCategoria, nombre: categoria.cP_categoria, cuenta: categoria.cP_countProducto, selected: false }))
    })

    this._productoService.getMarcas().subscribe((res) => {
      res.map((categoria) => this.marcas.push({ id: categoria.mP_idMarca, nombre: categoria.mP_marca, cuenta: categoria.mP_countProducto, selected: false }))
    })
  }

  goProductoId(id: string) {
    this._router.navigate(['/producto', id])
  }

  agregarCarrito(producto) {
    var estado = this._carritoService.addCarrito(producto)

    if (estado == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No puedes añadir un producto que ya se encuentra en el carrito'
      })
    }
    else {
      Swal.fire({
        icon: 'success',
        title: 'Exito',
        text: 'Se añadio el producto en el carrito',
        timer: 3000,
        timerProgressBar: true,
      })

    }
  }

  filterProductos() {
    this._productoService.getProductosFilter(this.marcaSeleccionada, this.categoriaSeleccionada).subscribe((res) => { this.productos = res })
  }

  async selectCategoria(categoria: string) {
    await this.categorias.map((categoriaSeleccionada) => {
      if (categoriaSeleccionada.selected == false) {
        if (categoriaSeleccionada.id == categoria) {
          categoriaSeleccionada.selected = true
          this.categoriaSeleccionada = categoria
        }
        // this.categoriaSeleccionada = categoria
        // if(categoriaSeleccionada.selected ) {
        //   this.categoriaSeleccionada = null
        // }
      }
      else {
        categoriaSeleccionada.selected = false
      }
    })
  }

  async selectMarcas(marca: string) {
    await this.marcas.map((marcaSeleccionada) => {
      if (marcaSeleccionada.selected == false) {
        if (marcaSeleccionada.id == marca) {
          marcaSeleccionada.selected = true
          this.marcaSeleccionada = marca
        }
        // this.categoriaSeleccionada = categoria
        // if(categoriaSeleccionada.selected ) {
        //   this.categoriaSeleccionada = null
        // }
      }
      else {
        marcaSeleccionada.selected = false
      }
    })
  }

  filtradoPorCategorias(categoria: string) {
    this.selectCategoria(categoria).then(() => this.filterProductos())
  }

}
