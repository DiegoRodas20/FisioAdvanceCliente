import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { Usuario,TipoDocumento,Perfil } from 'src/app/shared/models/cliente.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioCliente } from '../../models/usuario.model';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html'
    // styleUrls: ['login.component.scss']
})

export class LoginComponent implements OnInit {

    newUser: Usuario = {} as Usuario;
    formUser: FormGroup;
    tipoDocumentos : TipoDocumento[]=[];
    errorCaracteres : number;
    register = false;
    login = false;
    contrasena = false;
    formLogin: FormGroup;
    nomComponent: string;
    
    constructor(
      private _clienteService: ClienteService,
      private _router: Router,
      private _formBuilder: FormBuilder,
      private _loginService: LoginService
    ) {}

    ngOnInit() {
        this._clienteService.ListarTipoDocumento().subscribe((data) => this.tipoDocumentos = data);
        this.crearFormCliente();
        this.login=true;
        this.crearFormLogin();
        
        this.nomComponent = "Iniciar sesión";
      }
  
      crearFormLogin() {
        this.formLogin = this._formBuilder.group({
          u_correoElectronico:['', [Validators.required,Validators.maxLength(30),Validators.email]],
          u_contrasena: ['', [Validators.required,Validators.maxLength(10)]]
        });
      }
      crearFormCliente() {
        this.formUser = this._formBuilder.group({
          u_correoElectronico:['', [Validators.required,Validators.maxLength(30),Validators.email]],
          u_contrasena: ['', [Validators.required,Validators.maxLength(8)]],
          u_nombre: ['', [Validators.required,Validators.maxLength(50),Validators.pattern('[a-z,A-Z]*')]],
          u_apellidoPaterno: ['', [Validators.required,Validators.maxLength(50),Validators.pattern('[a-z,A-Z]*')]],
          u_apellidoMaterno: ['', [Validators.required,Validators.maxLength(50),Validators.pattern('[a-z,A-Z]*')]],
          u_telefono:[''],
          u_direccion:[''],
          u_documentoIdentidad: [''],
          pU_idPerfil: ['6268395e4579943794c6df50', [Validators.required]],
          tD_idTipoDocumento: ['626b55fe1b529d8148b615e3'],
          eU_idEstadoUsuario: ['6268339afa3714a01d9ea2d7', [Validators.required]],
        });
      }
    
      LogIn(formLogin: FormGroup) {
        console.log(formLogin.value);
        this._loginService.login(formLogin.value).subscribe((res) => {
          console.log(res);
            if (res[0].cod == "200") {
                let user = res[0] as UsuarioCliente;
               console.log(user);
                localStorage.setItem('user', JSON.stringify(user));
                
                if (res[0].pU_nombrePerfil=="Cliente") {
                    // var nav = ["/"]
                    // this._router.navigate(nav);
                    window.location.reload();                
                }else{console.log(user);}
            }
            else {
                Swal.fire({
                    text: res[0].mensaje,
                    icon: 'warning',
                    showCancelButton: false,
                    customClass: {
                        confirmButton: 'btn btn-warning',
                        cancelButton: 'btn btn-danger',
                    },
                    buttonsStyling: false
                });
                return;
            }
        });
    }
     
      registrarCliente() {
        console.log(this.formUser.value);
        if (this.formUser.status == 'VALID') {
          console.log("valido");
          this._clienteService
            .RegistrarCliente(this.formUser.value)
            .subscribe((data) => {
              console.log(data);
              Swal.fire({
                title: 'Usuario Registrado !',
                icon: 'success',
                timer: 3000,
                showConfirmButton: false,
              }).then(() => this.cerrarVentana());
            });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Error al registrar el usuario',
            toast: true,
            position: 'top-end',
            icon: 'error',
            timer: 3000,
            showConfirmButton: false,
          });
        }
      }
  
      validacionTipoDocumento(){
        const inputValue = this.formUser.controls['tD_idTipoDocumento'].value;
        if(inputValue == '626b55fe1b529d8148b615e3'){
          this.errorCaracteres = 8;
          this.formUser.controls['u_documentoIdentidad'].setValidators([
           Validators.required, Validators.maxLength(8),Validators.minLength(8),Validators.pattern('[0-9]*'),
          ])
        }
        else if (inputValue == '62996902590791d021713db8' ){
          this.errorCaracteres = 9;
          this.formUser.controls['u_documentoIdentidad'].setValidators([
            Validators.required, Validators.maxLength(9),Validators.minLength(9),Validators.pattern('[0-9]*')
          ])}
      }
        
      cerrarVentana() {
        this._router.navigate(['gestionarcliente']);
      }

    OpenModal(opcion:string){
      console.log(opcion)
      switch(opcion) { 
          case opcion="register": { 
              this.register = true;
              this.login = false;
              this.contrasena = false;
              this.nomComponent = "Regístrate";
             break; 
          } 
          case opcion="login": { 
              this.login = true;
              this.register = false;
              this.contrasena = false;
              this.nomComponent = "Iniciar sesión";
              break; 
          }
          case opcion="contrasena": { 
            this.login = false;
            this.register = false;
            this.contrasena = true;
            this.nomComponent = "Recupera tu contraseña";
            break; 
        }
        ;
       }
    }
}