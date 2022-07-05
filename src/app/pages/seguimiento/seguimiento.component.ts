import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OcService } from 'src/app/services/oc.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Observable } from 'rxjs';
import { DetalleOc, Oc } from 'src/app/shared/models/oc.model';


@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
})
export class SeguimientoComponent implements OnInit {
  @ViewChild('oc') oc: ElementRef;

  lOC: Oc[] = [];
  lDOC: DetalleOc[] = [] ;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _ocService: OcService
  ) {}

  ngOnInit() {
  }

  async ordenID() {
    try {
      this._ocService
        .getOcById(this.oc.nativeElement.value).subscribe(data => {
          this.lOC = data as [];
          console.log(data);
        }
        );

    } catch (error) {
      console.log('Error: ', error);
    }
  }
  async ordenDetalleID() {
    try {
      this._ocService
        .getDetalleOcById(this.oc.nativeElement.value).subscribe(data => {
          this.lDOC = data as [];
          console.log(data);
        }
        );

    } catch (error) {
      console.log('Error: ', error);
    }
  }
}
