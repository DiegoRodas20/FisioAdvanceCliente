import { Component, OnInit } from '@angular/core';
import { Producto } from '../../shared/models/producto.model';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { CarritoService } from 'src/app/services/carrito.service';
import { Carrito } from 'src/app/shared/models/carrito.model';
declare var tns;
declare var lightGallery;

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html'
})

export class ProductoComponent implements OnInit {

  producto: Producto;
  carrito:Carrito;
  lentgh : any;
  precioxcantidad:number;
  constructor(private _productoService: ProductoService, private _route: ActivatedRoute, private _carritoService: CarritoService,) { }

  ngOnInit() {
    this.animationSlider();
    this._route.params.subscribe(params => {
      this._productoService.getProductoxId(params.id).subscribe((res) => { this.producto = res[0];
        this.lentgh = res.length;
    })    
    });

  }
 
  agregarCarrito(producto) {
    if(producto.cantidad==undefined){this.precioxcantidad = Number(1) * Number(producto.cA_precioVenta);
      producto.cantidad = Number(1)}
      producto.cA_precioVenta= this.precioxcantidad;
    var estado = this._carritoService.addCarrito(producto)

    if (estado == 0 ) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No puedes añadir un producto que ya se encuentra en el carrito',
            timer: 3000,
            timerProgressBar: true,
            confirmButtonColor: '#9d9d9d',
            confirmButtonText: 'Ok',
            showCancelButton: false,
        })
    }
    else {
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Se añadió el producto en el carrito',
            timer: 3000,
            timerProgressBar: true,
            confirmButtonColor: '#9d9d9d',
            confirmButtonText: 'Ok',
            showCancelButton: false,
        })
    }
}
  animationSlider() {

    setTimeout(() => {

      // Product gallery
      tns({
        container: '.tns-carousel-inner',
        controlsText: ['<i class="ci-arrow-left"></i>', '<i class="ci-arrow-right"></i>'],
        gutter: 15,
        navContainer: '#tns-thumbnails',
        navAsThumbnails: true,
        navPosition: "top",
        controlsPosition: "top",
        mouseDrag: !0,
        speed: 600,
        autoplayHoverPause: !0,
        autoplayButtonOutput: !1,
      })

      var e = document.querySelectorAll(".gallery");
      if (e.length) {
        for (var t = 0; t < e.length; t++) {
          lightGallery(e[t], { selector: ".gallery-item", download: !1, videojs: !0, youtubePlayerParams: { modestbranding: 1, showinfo: 0, rel: 0 }, vimeoPlayerParams: { byline: 0, portrait: 0 } });
        }
      }

      
      // Product card carousel
      // tns({
      //     container: '.tns-carousel-inner-two',
      //     nav: false,
      //     controlsText: ['<i class="ci-angle-left"></i>', '<i class="ci-angle-right"></i>'],
      // })

      // Product card carousel
      // tns({
      //     container: '.tns-carousel-inner-three',
      //     nav: false,
      //     controlsText: ['<i class="ci-angle-left"></i>', '<i class="ci-angle-right"></i>'],
      // })

      // Look
      // tns({
      //   container: '.tns-carousel-inner-four',
      //   controlsContainer: "#tns-look-controls",
      //   mouseDrag: !0,
      //   responsive: {
      //     0: {
      //       items: 1,
      //       gutter: 20
      //     },
      //     480: {
      //       items: 2,
      //       gutter: 24
      //     },
      //     767: {
      //       items: 1
      //     },
      //     991: {
      //       items: 2,
      //       gutter: 30
      //     }
      //   },
      // })

      // Related products
      // tns({
      //   container: '.tns-carousel-inner-five',
      //   nav: false,
      //   controlsContainer: "#custom-controls-related",
      //   mouseDrag: !0,
      //   responsive: {
      //     0: {
      //       items: 1,
      //       gutter: 20
      //     },
      //     480: {
      //       items: 2,
      //       gutter: 24
      //     },
      //     700: {
      //       items: 3,
      //       gutter: 24
      //     },
      //     1100: {
      //       items: 4,
      //       gutter: 30
      //     }
      //   }

      // });

      // Recently viewed products
      // tns({
      //   container: '.tns-carousel-inner-six',
      //   nav: false,
      //   mouseDrag: !0,
      //   controlsContainer: "#custom-controls-recent",
      //   responsive: {
      //     0: {
      //       items: 1,
      //       gutter: 20
      //     },
      //     480: {
      //       items: 2,
      //       gutter: 24
      //     },
      //     700: {
      //       items: 3,
      //       gutter: 24
      //     },
      //     1100: {
      //       items: 4,
      //       gutter: 30
      //     }
      //   }

      // });

    }, 500)

  }
  calcularPrecioCantidad(event, producto) {
    if(Number(event.target.value)==0){}
    else{
      this.precioxcantidad = Number(event.target.value) * Number(producto.cA_precioVenta);
      producto.cantidad = Number(event.target.value)
      console.log(producto.cantidad)
    }
    
  }
}
