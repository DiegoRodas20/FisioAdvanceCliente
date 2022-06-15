import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Components
import { PagesComponent } from "./pages.component";
import { HomeComponent } from "./home/home.component";
import { CatalogoComponent } from "./catalogo/catalogo.component";
import { ProductoComponent } from "./producto/producto.component";
import { CheckoutComponent } from "./checkout/checkout.component";


const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            // { path: 'home', component: HomeComponent },
            {
                path: 'catalogo',
                component: CatalogoComponent,
                data: { titulo: 'Catálogo' }
            },
            {
                path: 'producto/:id',
                component: ProductoComponent,
                data: { titulo: 'Producto' }
            },
            {
                path: 'checkout',
                component: CheckoutComponent,
                data: { titulo: 'Checkout' }
            },
            { path: '', redirectTo: '/catalogo', pathMatch: 'full' },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PagesRoutingModule { }
