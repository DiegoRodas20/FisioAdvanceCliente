import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages.routing';

// Components
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { ProductoComponent } from './producto/producto.component';
import { CheckoutComponent } from './checkout/checkout.component';



const COMPONENTS = [
    PagesComponent,
    HomeComponent,
    CatalogoComponent,
    ProductoComponent,
    CheckoutComponent
]

@NgModule({
    declarations: [
        COMPONENTS,
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