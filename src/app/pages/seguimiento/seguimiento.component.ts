import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Observable } from 'rxjs';
import { DetallePedido, Pedido } from 'src/app/shared/models/pedido.model';
import { PedidoService } from 'src/app/services/pedido.service';



@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
})
export class SeguimientoComponent implements OnInit {
  @ViewChild('numPedido') p: ElementRef;

  lP: Pedido[] = [];
  lDP: DetallePedido[] = [] ;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _pService: PedidoService
  ) {}

  ngOnInit() {
  }

  async pedidoById() {
    try {
      this._pService
        .obtenerPedidoById(this.p.nativeElement.value).subscribe(data => {
          this.lP = data as [];
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
        .obtenerDetallePedidoById(this.p.nativeElement.value).subscribe(data => {
          this.lDP = data as [];
          console.log(data);
        }
        );

    } catch (error) {
      console.log('Error: ', error);
    }
  }
}
