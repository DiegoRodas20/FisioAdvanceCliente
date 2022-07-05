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

  formPerfil: FormGroup
    formActualizar: FormGroup
    formEliminar: FormGroup

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
          u_idUsuario: [null,[]],
          u_correoElectronico: [null, []],
          u_nombre: [null, []],
          u_documentoIdentidad: [null, []],
          eU_idEstadoUsuario: [null, []],
          eU_nombreEstadoUsuario: [null, []],
          tD_idTipoDocumento: [null, []],
          tD_TipoDocumento: [null, []],
          u_telefono: [null, []],
          u_direccion: [null, []],
      }),
      this.formActualizar = this._formBuilder.group({
          u_idUsuario: [null,[]],
          u_correoElectronico: [null, [Validators.email, Validators.required]],
          u_telefono: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
          u_direccion: [null, [Validators.required, Validators.maxLength(50)]],
      })
      //Formulario para eliminar con el id del perfil y la contraseña
      this.formEliminar = this._formBuilder.group({
          u_idUsuario: [null,[]],
          u_contraseña: [null, [Validators.required, Validators.minLength(6)]],
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
          this.formActualizar.patchValue(data[0])
          console.log(data[0])
      }
      catch (error) {
          console.log("Error: ", error);
      }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Actualizar Perfil/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //Logica de Validaciones
  /*async*/ putPerfil(){
/*
    const { value: formActualizar} = await Swal.fire({
      title: 'Actualizar Perfil',
      html:
            '<div class="row pb-3">'+
              '<div class="col-sm-6 mb-4">'+
                '<label for="ac-fn" class="form-label-lg">Correo Electronico</label>'+
                '<input type="text" id="ac-fn" class="form-control form-control-lg" formControlName="u_correoElectronico">'+
              '</div>'+
              '<div class="col-sm-6 mb-4">'+
                '<label for="ac-email" class="form-label-lg">Telefono</label>'+
                '<input type="email" id="ac-ln" class="form-control form-control-lg" formControlName="u_telefono">'+
              '</div>'+
              '<div class="col-sm-6 mb-4">'+
                '<label for="ac-email" class="form-label-lg">Dirección</label>'+
                '<input type="text" id="ac-email" class="form-control form-control-lg" formControlName="u_direccion">'+
              '</div>'+
            '</div>',
      focusConfirm: false,
      preConfirm: () => {
          const email = (document.getElementById('correoPerfil') as HTMLInputElement).value;
          const telefono = (document.getElementById('telefonoPerfil') as HTMLInputElement).value;
          const direccion = (document.getElementById('direccionPerfil') as HTMLInputElement).value;
      }
    })
    /*if (formActualizar) {
      Swal.fire(JSON.stringify(formValues))
    }*/
    //Si se quiere usar modal para que habra la ventanita, se debe cambiar el formPerfil por formActualizar
      if (this.formPerfil.value.u_correoElectronico == '' || this.formPerfil.value.u_telefono == '' || this.formPerfil.value.u_direccion == '') {
          Swal.fire({
              text: 'Complete los datos correctamente',
              icon: 'warning',
              showCancelButton: false,
              customClass: {
                  confirmButton: 'btn btn-warning'
              },
              buttonsStyling: false
          });
      }  else {
          let cel: boolean
          let email: boolean
          if(this.soloNumeros(this.formPerfil.value.u_telefono) == true){
              cel = true;
          } else {
              Swal.fire({
                  text: 'El telefono solo puede contener numeros',
                  icon: 'warning',
                  showCancelButton: false,
                  customClass: {
                      confirmButton: 'btn btn-warning'
                  },
                  buttonsStyling: false
              });
          }
          if(this.validarEmail(this.formPerfil.value.u_correoElectronico) == true){
              email = true;
          } else {
              Swal.fire({
                  text: 'El correo electronico no es valido',
                  icon: 'warning',
                  showCancelButton: false,
                  customClass: {
                      confirmButton: 'btn btn-warning'
                  },
                  buttonsStyling: false
              });
          }
          if(cel == true && email == true){
              this.putCliente();
          }
      }
  }
  //Actualizar perfil
  putCliente(){
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
                  text: 'Actualizado correctamente',
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
                  text: 'Error al actualizar',
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
  //Validar solo numeros
  soloNumeros(cel){
      let numero = cel.match(/^[0-9]*$/);
      if(numero == null){
          return false;
      } else {
          return true;
      }
  }
  //Validar correo electronico
  validarEmail(email: any) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Eliminar Perfil///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Logica de Validaciones
  eliminarOdeshabilitar(){
    Swal.fire({
      title: 'Eliminar Cuenta',
      text: 'Ingrese su contraseña para eliminar su cuenta',
      input: 'text',
      icon: 'warning',
      inputAttributes: {
        autocapitalize: 'off'
      },
      customClass: {
        confirmButton: 'btn btn-warning',
        cancelButton: 'btn btn-danger'
      },
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: (contra) => {
        //logica de validacion
        contra == this.contra.Password
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
          //Preguntar si se desea eliminar o deshabilitar
          Swal.fire({
              title: '¿Desea eliminar o deshabilitar el perfil?',
              text: '¡Si elimina no podrá revertir esta acción!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Eliminar',
              cancelButtonText: 'Deshabilitar',
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
              text: 'Contraseña incorrecta',
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
      this._userService.deleteClienteXid(this.user.u_idUsuario).subscribe(
          res => {
              this.salir()
              Swal.fire({
                  text: 'Eliminado correctamente',
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
                  text: 'Error al eliminar',
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
  //Confirmar eliminacion
  confirmarEliminacion(){
      Swal.fire({
          title: '¿Estas seguro?',
          text: "No podras revertir esto!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, Eliminar!'
      }).then((result) => {
          if (result.value) {
              this.deleteCliente();
          }
      }
      )
  }
  //Desactivar Perfil
  desactivarPerfil(){
      this._userService.desactivarPerfil(this.formPerfil.value.u_idUsuario).subscribe(
          res => {
              this.salir()
              //Mensaje de desactivacion
              Swal.fire(
                  'Desactivado!',
                  'Tu perfil ha sido desactivado.',
                  'success'
              )
          }
      );
  }
  //Salida
  salir(){
      localStorage.removeItem('idCliente');
      localStorage.removeItem('idPerfil');
      localStorage.removeItem('nombre');
      localStorage.removeItem('token');
      this._router.navigate(['/login']);
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}
