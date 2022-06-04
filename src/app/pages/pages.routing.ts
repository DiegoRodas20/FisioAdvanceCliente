import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Components
import { PagesComponent } from "./pages.component";
import { HomeComponent } from "./home/home.component";
import { CatalogoComponent } from "./catalogo/catalogo.component";
import { ProductoComponent } from "./producto/producto.component";


const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'catalogo', component: CatalogoComponent },
            { path: 'producto', component: ProductoComponent },
            { path: '', redirectTo: '/home', pathMatch: 'full' },

        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PagesRoutingModule { }