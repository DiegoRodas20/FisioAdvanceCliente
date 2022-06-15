import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

const COMPONENTS = [
    FooterComponent,
    HeaderComponent
]

@NgModule({
    declarations: [
        COMPONENTS
    ],
    exports: [
        COMPONENTS
    ],
    imports: [
        CommonModule
    ]
})

export class SharedModule { }
