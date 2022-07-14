import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { Categoria, Producto } from 'src/app/shared/models/producto.model';
declare var tns;


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})


export class HomeComponent implements OnInit {

    producto: Producto[]=[];
    categoria: Categoria[]=[];
    
    constructor(private _productoService:ProductoService,
        private _router: Router,) { }

    ngOnInit() {
        
        this.animationSlider();
        this.getProductos();;
        this.getCategorias();
    }

    animationSlider() {
        setTimeout(() => {

            // Hero Slider
            tns({
                container: '.tns-carousel-inner',
                controlsText: ['<i class="ci-arrow-left"></i>', '<i class="ci-arrow-right"></i>'],
                mode: 'gallery',
                navContainer: '#pager',
                responsive: {
                    0: { controls: false },
                    991: { controls: true }
                }
            });

            // Top categories
            tns({
                container: '.tns-carousel-inner-two',
                controls: false,
                responsive: {
                    "0": {
                        "gutter": 20
                    },
                    "400": {
                        "items": 2,
                        "gutter": 20
                    },
                    "520": {
                        "gutter": 30
                    },
                    "768": {
                        "items": 3,
                        "gutter": 30
                    }
                }
            });

            // New arrivals
            tns({
                container: '.tns-carousel-inner-three',
                controls: false,
                mouseDrag: !0,
                responsive: {
                    0: {
                        "items": 1,
                        "gutter": 20
                    },
                    420: {
                        "items": 2,
                        "gutter": 20
                    },
                    600: {
                        "items": 3,
                        "gutter": 20
                    },
                    700: {
                        "items": 3,
                        "gutter": 30
                    },
                    900: {
                        "items": 4,
                        "gutter": 30
                    },
                    1200: {
                        "items": 5,
                        "gutter": 30
                    },
                    1400: {
                        "items": 6,
                        "gutter": 30
                    }
                }
            });

            // Popular categories
            tns({
                container: '.tns-carousel-inner-four',
                controls: false,
                gutter: 30,
                responsive: {
                    0: { "items": 1 },
                    380: { "items": 2 },
                    550: { "items": 3 },
                    750: { "items": 4 },
                    1000: { "items": 5 },
                    1250: { "items": 6 }
                }
            });

            // Trending products
            // tns({
            //     container: '.tns-carousel-inner-five',
            //     nav: false,
            //     controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
            //     controlsContainer: '#custom-controls-trending',
            //     responsive: {
            //         0: {
            //             items: 1,
            //             gutter: 20
            //         },
            //         480: {
            //             items: 2,
            //             gutter: 24
            //         },
            //         700: {
            //             items: 3,
            //             gutter: 24
            //         },
            //         1100: {
            //             items: 4,
            //             gutter: 30
            //         }
            //     }

            // });

            // Sale Products
            tns({
                container: '.tns-carousel-inner-six',
                nav: false,
                controlsContainer: "#custom-controls-sale",
                responsive: {
                    0: {
                        "items": 1,
                        "gutter": 20
                    },
                    480: {
                        "items": 2,
                        "gutter": 24
                    },
                    700: {
                        "items": 3,
                        "gutter": 24
                    },
                    1100: {
                        "items": 4,
                        "gutter": 30
                    }
                }
            })

            // Instagram
            tns({
                container: '.tns-carousel-inner-seven',
                controls: false,
                gutter: 15,
                responsive: {
                    0: { items: 2 },
                    500: { items: 3 },
                    1200: { items: 3 }
                }

            });

            // Brands
            tns({
                container: '.tns-carousel-inner-eight',
                nav: false,
                controls: false,
                autoplay: true,
                autoplayTimeout: 4000,
                responsive: {
                    0: {
                        "items": 2
                    },
                    576: {
                        "items": 3
                    },
                    768: {
                        "items": 4
                    },
                    992: {
                        "items": 5
                    },
                    1200: {
                        "items": 6
                    }
                }

            });



        }, 500);
    }

    async getProductos(){
       await this._productoService.getProductos().subscribe(x=>{
            this.producto = x.slice(0,7);
        })
        return this.producto
    }

    async getCategorias(){
        await this._productoService.getCategoria().subscribe(x=>{
             this.categoria = x.slice(0,10);
         })
         return this.categoria
     }
     goCatalogoCategoria(idCategoria:string) {
        
        this._router.navigate(['/catalogo/categoria/' + idCategoria]);
        // /catalogo/categoria/6264dfe84b276b45bbc613b4
    }

}