import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.scss']
})
export class CambiarContrasenaComponent implements OnInit {
  formCorreo: FormGroup;
  formContrasena: FormGroup;
  formValidar: FormGroup;
  enviar:boolean;
  validar:boolean;
  cambiar:boolean;
  cbool:boolean;
  constructor(
    private _formBuilder: FormBuilder,
    private _userService:UserService,
    private _router: Router) { }

  ngOnInit(): void {    
    this.crearFormCorreo();
    this.crearFormValidar();
    this.crearFormContrasena();
    this.enviar=true;
  }

  crearFormCorreo() {
    this.formCorreo = this._formBuilder.group({
      u_correoElectronico:['']
    });
  }
  crearFormValidar() {
    this.formValidar = this._formBuilder.group({
      codigo:['']
    });
  }

  crearFormContrasena() {
    this.formContrasena = this._formBuilder.group({
      newContrasena:['',[Validators.required]],
      repeat_newContrasena:['']
    }
    );
  }

  enviarCorreo(){
    try{
      this._userService.correoCodigo(this.formCorreo.value.u_correoElectronico).subscribe(data => {
        this.enviar=false;
        this.validar=true;
        this.cambiar=false;
      });
    }
    catch(error){
      console.log(error);
    } 
  }
  validacion(){
    try{
      this._userService.validarCodigo(this.formCorreo.value.u_correoElectronico,this.formValidar.value.codigo).subscribe(data => {    
        if(data.result==true){
          this.enviar=false;
          this.validar=false;
          this.cambiar=true;
          
        }else{}
      });
    }
    catch(error){
      console.log(error);
    } 
  }

  repeat():boolean{
    var contrasena =this.formContrasena.value.newContrasena;
    var rcontrasena =this.formContrasena.value.repeat_newContrasena;
    if(rcontrasena==contrasena){
      return this.cbool=true;
    }
    else{return this.cbool=false;}
  }

  cambiarContrasena(){
      try{
        let update={
          u_correoElectronico: this.formCorreo.value.u_correoElectronico,
          u_contrasena: this.formContrasena.value.newContrasena
        }
        this._userService.actualizarContrasena(update).subscribe(data => {
          console.log(data);
          Swal.fire({
            title: data.mensaje,
            icon: 'success',
            timer: 3000,
            timerProgressBar: true,
            confirmButtonColor: '#6bc362',
            confirmButtonText: 'Ok',
            showCancelButton: false,
          }).then(() => this.cerrarVentana());
        });
      }
      catch(error){
        console.log(error);
      }
  }
  cerrarVentana() {
    this._router.navigate(['']);
  }
}
