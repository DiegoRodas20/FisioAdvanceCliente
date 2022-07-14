import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Login, UsuarioCliente } from 'src/app/shared/models/usuario.model';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html'
})

export class PerfilComponent implements OnInit {

  @Input() idC: string;
  idCliente: string
  idPerfil: string
  nomPerfil: string
  user: UsuarioCliente;
  cod:string;
  contra: Login;
  validatecontra:string;

  formPerfil: FormGroup

    constructor(
      private _formBuilder: FormBuilder,
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService,
    ) { }


   ngOnInit() {
    this.crearFormPerfil()
    this._route.params.subscribe(params => {
        this.perfilLogueado()
        this.idCliente = params['id']
        this.getPCliente()
    })
    }
    crearFormPerfil() {
      this.formPerfil = this._formBuilder.group({
          u_idUsuario: ['',[]],
          u_correoElectronico: ['', []],
          u_nombre: ['', []],
          u_documentoIdentidad: ['', []],
          eU_idEstadoUsuario: ['', []],
          eU_nombreEstadoUsuario: ['', []],
          tD_idTipoDocumento: ['', []],
          tD_TipoDocumento: ['', []],
          u_telefono: ['', []],
          u_direccion: ['', []],
      })
  }

  //Loggearse con el correo electronico y la contraseña
  perfilLogueado(){
    if (localStorage.getItem("user") != null) {
        this.user = JSON.parse(localStorage.getItem("user")) as UsuarioCliente;
        this.contra = JSON.parse(localStorage.getItem("contra")) as Login;
        if (this.user.cod=='200') {
            this.idCliente = this.user.u_idUsuario;
            //this.nombreUsuario = this.user.ID;
            this.cod='200'
            console.log(this.idCliente)
        }
        else {
            this.cod='000';
        }
    }else{
    this.cod='000';
    }
}
  //Perfil x ID
  async getPCliente(){
      try {
          const data: any = await this._userService.getClienteXid(this.user.u_idUsuario).toPromise()
          console.log(data[0])
          this.idPerfil = data[0].u_idUsuario
          this.nomPerfil = data[0].u_nombre
          this.formPerfil.patchValue(data[0])
          console.log(data[0])
      }
      catch (error) {
          console.log("Error: ", error);
      }
  }

  //Logica de Validaciones
//     putPerfil(){

//     //Si se quiere usar modal para que habra la ventanita, se debe cambiar el formPerfil por formActualizar
//       if (this.formPerfil.value.u_correoElectronico == '' || this.formPerfil.value.u_telefono == '' || this.formPerfil.value.u_direccion == '') {
//           Swal.fire({
//               text: 'Complete los datos correctamente',
//               icon: 'warning',
//               showCancelButton: false,
//               customClass: {
//                   confirmButton: 'btn btn-warning'
//               },
//               buttonsStyling: false
//           });
//       }  else {
//           let cel: boolean
//           let email: boolean
//           if(this.soloNumeros(this.formPerfil.value.u_telefono) == true){
//               cel = true;
//           } else {
//               Swal.fire({
//                   text: 'El teléfono solo puede contener números',
//                   icon: 'warning',
//                   showCancelButton: false,
//                   customClass: {
//                       confirmButton: 'btn btn-warning'
//                   },
//                   buttonsStyling: false
//               });
//           }
//           if(this.validarEmail(this.formPerfil.value.u_correoElectronico) == true){
//               email = true;
//           } else {
//               Swal.fire({
//                   text: 'El correo electrónico no es válido',
//                   icon: 'warning',
//                   showCancelButton: false,
//                   customClass: {
//                       confirmButton: 'btn btn-warning'
//                   },
//                   buttonsStyling: false
//               });
//           }
//           if(cel == true && email == true){
//               this.putCliente();
//           }
//       }
//   }
  //Actualizar perfil
  telefono(){
     
     this.formPerfil.controls['u_telefono'].setValidators([Validators.required, Validators.maxLength(9), Validators.pattern('^[0-9]*$')]);
     
  }

  correo(){
    this.formPerfil.controls['u_correoElectronico'].setValidators([Validators.email, Validators.required]);
  }

  direccion(){
    this.formPerfil.controls['u_direccion'].setValidators([Validators.required, Validators.maxLength(60)]); 
  }

  putCliente(){
    if(this.formPerfil.valid){
        let data = {
            u_idUsuario: this.formPerfil.value.u_idUsuario,
            u_correoElectronico: this.formPerfil.value.u_correoElectronico,
            u_telefono: this.formPerfil.value.u_telefono,
            u_direccion: this.formPerfil.value.u_direccion
        }
        this._userService.putClienteXid(data).subscribe(
            res => {
                this.getPCliente();
                Swal.fire({
                    title: 'Actualizado correctamente',
                    icon: 'success',
                    showCancelButton: false,
                    customClass: {
                        confirmButton: 'btn btn-success'
                    },
                    buttonsStyling: false
                });
            },
            (err) => {
                console.log(err);
                Swal.fire({
                    title: 'Error al actualizar',
                    icon: 'error',
                    showCancelButton: false,
                    customClass: {
                        confirmButton: 'btn btn-danger'
                    },
                    buttonsStyling: false
                });
            }
        );
    }
      
  }
 
 //Logica de Validaciones
  eliminarOdeshabilitar(){
    Swal.fire({
      title: 'Eliminar Cuenta',
      text: 'Ingrese su contraseña para eliminar su cuenta',
      input: 'password',
      icon: 'warning',
      inputAttributes: {
        autocapitalize: 'off'
      },
      customClass: {
        confirmButton: 'btn btn-warning',
        cancelButton: 'btn btn-danger'
      },
      showCancelButton: true,
      confirmButtonColor: '#6BC362',
      cancelButtonColor: '#dc3545',
      confirmButtonText: '<i _ngcontent-elo-c51="" class="ci-checkmark me-1 align-middle"></i>Confirmar',
      cancelButtonText: '<i _ngcontent-elo-c51="" class="ci-cross me-1 align-middle"></i>Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: (contra) => {
        //logica de validacion
        this.validatecontra=contra;

      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        console.log(result)
      if (result.isConfirmed && (String)(result.value) == this.contra.u_contrasena) {
          //Preguntar si se desea eliminar o deshabilitar
          Swal.fire({
              title: '¿Desea eliminar o deshabilitar su cuenta?',
              text: '¡Si elimina no podrá revertir esta acción!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#dc3545',
              cancelButtonColor: '#9d9d9d',
              confirmButtonText: '<i _ngcontent-elo-c51="" class="ci-cross me-1 align-middle"></i>Eliminar',
              cancelButtonText: '<i _ngcontent-elo-c51="" class="ci-minus-round me-1 align-middle"></i>Deshabilitar',
              customClass: {
                  confirmButton: 'btn btn-warning',
                  cancelButton: 'btn btn-danger'
              }
          }).then((result) => {
              if (result.value) {
                  this.confirmarEliminacion();
              }
              else {
                  this.desactivarPerfil();
              }
          })
      } else {
          Swal.fire({
              text: 'La contraseña ingresada es incorrecta',
              icon: 'warning',
              showCancelButton: false,
              customClass: {
                  confirmButton: 'btn btn-warning'
              },
              buttonsStyling: false
          });
      }
      }
    )
  }
  //Eliminar perfil
  deleteCliente(){
    let data={
        u_correoElectronico: this.formPerfil.value.u_correoElectronico,
        u_idUsuario: this.formPerfil.value.u_idUsuario,
        u_contrasena: this.contra.u_contrasena
    }
    console.log(this.formPerfil.value.u_idUsuario)
      this._userService.deleteClienteXid(data).subscribe(
          res => {
            console.log(res)
            //   this.salir()
              Swal.fire({
                  text: 'cuenta eliminada correctamente',
                  icon: 'success',
                  showCancelButton: false,
                  customClass: {
                      confirmButton: 'btn btn-success'
                  },
                  buttonsStyling: false
              });
          },
          (err) => {
              console.log(err);
              Swal.fire({
                  text: 'Error al eliminar cuenta',
                  icon: 'error',
                  showCancelButton: false,
                  customClass: {
                      confirmButton: 'btn btn-danger'
                  },
                  buttonsStyling: false
              });
          }
      );
  }
 
  confirmarEliminacion(){
      Swal.fire({
          title: '¿Estás seguro?',
          text: "No podrás revertir esto!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#dc3545',
          cancelButtonColor: '#9d9d9d',
          confirmButtonText: '<i _ngcontent-elo-c51="" class="ci-checkmark me-1 align-middle"></i>Sí, eliminar mi cuenta!',
          cancelButtonText: '<i _ngcontent-elo-c51="" class="ci-cross me-1 align-middle"></i>Cancelar',
      }).then((result) => {
          if (result.value) {
              this.deleteCliente();
          }
      }
      )
  }

  desactivarPerfil(){
    let data={
        u_idUsuario: this.formPerfil.value.u_idUsuario,
        eU_idEstadoUsuario: "6268342cfa3714a01d9ea2d8",
        u_contrasena: this.contra.u_contrasena
    }
    console.log(data)
      this._userService.desactivarPerfil(data).subscribe(
          res => {
            if(res.mensaje=='La cuenta fue deshabilitada correctamente, esperamos verte pronto'){

                Swal.fire({
                    icon: 'success',
                    title: res.mensaje + " !!!",
                    timer: 3000,
                    timerProgressBar: true,
                  }).then(() => this.salir());

            }else{
                Swal.fire({
                    icon: 'error',
                    title: res.mensaje,
                    timer: 3000,
                    showConfirmButton: false,
                }
                )
            } 
          }
      );
  }
  //Salida
  salir(){
    this._userService.logout();
    window.location.replace('/')
  }
}
