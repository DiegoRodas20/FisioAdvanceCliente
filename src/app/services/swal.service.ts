import Swal from "sweetalert2";

export const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-successS',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })