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
    formLogin: FormGroup;
    

    constructor(
      private _clienteService: ClienteService,
      private _router: Router,
      private _formBuilder: FormBuilder,
      private _loginService: LoginService
    ) {}

    ngOnInit() {
        this._clienteService.ListarTipoDocumento().subscribe((data) => this.tipoDocumentos = data);
        this.crearFormCliente();
        this.crearFormLogin();
      }

      crearFormLogin() {
        this.formLogin = this._formBuilder.group({
          u_correoElectronico:['', [Validators.required,Validators.maxLength(30),Validators.email]],
          u_contrasena: ['', [Validators.required,Validators.maxLength(10)]]
        });
      }
      crearFormCliente() {
        this.formUser = this._formBuilder.group({
          u_correoElectronico:[null, [Validators.required,Validators.maxLength(30),Validators.email]],
          u_contrasena: [null, [Validators.required,Validators.maxLength(10)]],
          u_nombre: [null, [Validators.required,Validators.maxLength(50),Validators.pattern('[a-z,A-Z]*')]],
          u_apellidoPaterno: [null, [Validators.required,Validators.maxLength(50),Validators.pattern('[a-z,A-Z]*')]],
          u_apellidoMaterno: [null, [Validators.required,Validators.maxLength(50),Validators.pattern('[a-z,A-Z]*')]],
          u_telefono:[''],
          u_direccion:[''],
          u_documentoIdentidad: [null, [Validators.required,Validators.maxLength(20)]],
          pU_idPerfil: ['6268395e4579943794c6df50'],
          tD_idTipoDocumento: [null, [Validators.required]],
          eU_idEstadoUsuario: ['6268339afa3714a01d9ea2d7'],
        });
      }

      LogIn(formLogin: FormGroup) {
        (formLogin.value);
        this._loginService.login(formLogin.value).subscribe((res) => {
          (res);
            if (res[0].cod == "200") {
                let user = res[0] as UsuarioCliente;
               (user);
                localStorage.setItem('user', JSON.stringify(user));

                if (res[0].pU_nombrePerfil=="Cliente") {
                    window.location.reload();                
                }
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
          ("valido");
          this._clienteService
            .RegistrarCliente(this.formUser.value)
            .subscribe((data) => {
              (data);
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

    OpenContrasena(){
      this._router.navigate(['/cambia-contrasena']);
    }
}
