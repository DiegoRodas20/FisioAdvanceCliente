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
import { CambiarContrasenaComponent } from "./cambiar-contrasena/cambiar-contrasena.component";
import { AuthGuardService } from "../services/auth-guard.service";


const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: '', component: HomeComponent},
            {
                path: 'catalogo',  children : [ 
                    {path: '', component: CatalogoComponent },
                    {path: 'categoria/:id', component: CatalogoComponent}
                    ],
                data: { titulo: 'Catálogo' }
            },
            {
                path: 'producto/:categoria/:marca/:id',
                component: ProductoComponent,
                data: { titulo: 'Catálogo' }
            },
            {
                path: 'checkout',
                component: CheckoutComponent,
                data: { titulo: 'Pedido' },
                canActivate: [AuthGuardService] 
            },
            {
                path: 'perfil',
                component: MenuPerfilComponent,
                data: { titulo: 'Perfil' },
                canActivate: [AuthGuardService] 
            },
            {
                path: 'seguimiento',
                component: SeguimientoComponent,
                data: { titulo: 'Seguimiento' }
            },
            {
                path: 'cambia-contrasena',
                component: CambiarContrasenaComponent,
                data: { titulo: 'Cambiar contraseña' }
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
