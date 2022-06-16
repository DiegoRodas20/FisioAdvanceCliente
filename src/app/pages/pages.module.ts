import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages.routing';
import {CustomFilter} from './catalogo/catalogo.pipe'
import {categoriaFilter} from './catalogo/categorias.pipe'

// Components
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { ProductoComponent } from './producto/producto.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MenuPerfilComponent } from './menu-perfil/menu-perfil.component';
import { PerfilComponent } from './menu-perfil/perfil/perfil.component';
import { ComprasComponent } from './menu-perfil/compras/compras.component';
import { SeguimientoComponent } from './menu-perfil/seguimiento/seguimiento.component';




const COMPONENTS = [
    PagesComponent,
    HomeComponent,
    CatalogoComponent,
    ProductoComponent,
    CheckoutComponent,
    MenuPerfilComponent,
    PerfilComponent,
    ComprasComponent,
    SeguimientoComponent
]

@NgModule({
    declarations: [
        COMPONENTS,
        CustomFilter,
        categoriaFilter
    ],
    exports: [
        COMPONENTS
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,

        PagesRoutingModule,
        SharedModule,
    ]
})
export class PagesModule { }
