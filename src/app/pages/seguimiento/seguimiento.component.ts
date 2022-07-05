import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {  FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from 'src/app/services/pedido.service';
import { DetallePedidoListar, PedidoListar } from 'src/app/shared/models/pedido.model';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
})
export class SeguimientoComponent implements OnInit {
  @ViewChild('numPedido') p: ElementRef;

  lP: PedidoListar[] = [];
  lDP: DetallePedidoListar[] = [] ;
  formPedido: FormGroup;
  fechaEmision: string;
  estado:string;
  total:number;
  id:string;
  constructor(private _pService: PedidoService, private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.crearFormPedido();
  }

  crearFormPedido() {

    this.formPedido = this._formBuilder.group({
        idPedido: ['', [Validators.required]]
    })
}
  async pedidoById() {
    try {
      console.log(this.formPedido.value.idPedido)
      this._pService
        .obtenerPedidoById(this.formPedido.value.idPedido).subscribe(data => {
          this.lP = data as [];
          this.fechaEmision = this.lP[0].pE_fechaEmision;
          this.estado = this.lP[0].epE_nombreEstado;
          this.total = this.lP[0].pE_total;
          this.id=this.lP[0].pE_idPedido;
          console.log(data);
        }
        );

    } catch (error) {
      console.log('Error: ', error);
    }
  }
  async detallePedidoById() {
    try {
      this._pService
        .obtenerDetallePedidoById(this.formPedido.value.idPedido).subscribe(data => {
          this.lDP = data as [];
          console.log(data);
        }
        );

    } catch (error) {
      console.log('Error: ', error);
    }
  }
}
