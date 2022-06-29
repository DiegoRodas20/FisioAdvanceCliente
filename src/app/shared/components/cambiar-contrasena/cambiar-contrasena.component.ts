import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.scss']
})
export class CambiarContrasenaComponent implements OnInit {
  formContrasena: FormGroup;
  constructor(
    private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.crearFormContrasena();
    console.log("siestamoooos");
  }

  crearFormContrasena() {
    this.formContrasena = this._formBuilder.group({
      u_correoElectronico:['']
    });
  }
  cambiarContrasena(){}
}
