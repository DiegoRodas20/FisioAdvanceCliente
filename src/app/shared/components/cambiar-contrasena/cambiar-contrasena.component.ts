import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.scss']
})
export class CambiarContrasenaComponent implements OnInit {
  formContrasena: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private _userService:UserService) { }

  ngOnInit(): void {
    this.crearFormContrasena();
  }

  crearFormContrasena() {
    this.formContrasena = this._formBuilder.group({
      u_correoElectronico:['']
    });
  }
  cambiarContrasena(){
      this._userService.correoCodigo(this.formContrasena.value.u_correoElectronico).subscribe(data => {
        console.log("se envio");
        console.log(data);
      });
  }
}
