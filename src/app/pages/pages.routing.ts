import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Components
import { PagesComponent } from "./pages.component";
import { HomeComponent } from "./home/home.component";
import { CatalogoComponent } from "./catalogo/catalogo.component";
import { ProductoComponent } from "./producto/producto.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { MenuPerfilComponent } from "./menu-perfil/menu-perfil.component";
import { SeguimientoComponent } from "./seguimiento/seguimiento.component";


const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: '', component: HomeComponent,
            data: { titulo: 'Inicio' } },
            {
                path: 'catalogo',
                component: CatalogoComponent,
                data: { titulo: 'Catálogo' }
            },
            {
                path: 'producto/:id',
                component: ProductoComponent,
                data: { titulo: 'Detalle de producto' }
            },
            {
                path: 'checkout',
                component: CheckoutComponent,
                data: { titulo: 'Pedido' }
            },
            {
                path: 'perfil',
                component: MenuPerfilComponent,
                data: { titulo: 'Perfil' }
            },
            {
                path: 'seguimiento',
                component: SeguimientoComponent,
                data: { titulo: 'Seguimiento' }
            },
            { path: '', redirectTo: '/', pathMatch: 'full' },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PagesRoutingModule { }
