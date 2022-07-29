import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
/* import { FormControl, FormGroup } from '@angular/forms'; */
import { LoginService } from '../services/login.service';
import { EmpleadosServiceService } from '../services/empleados-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
})
export class EmpleadosComponent implements OnInit {
  empleados: any[] = [];
  vistaDetalladaEmpleado: any = {};
  manejadorInfoEmpleado: any = {};
  editarEmpleadoData: any = {};
  nuevoEmpleado: any = {
    nombre: '',
    apellidos: '',
    telefono: '',
    correo: '',
    puesto: '',
    usuario: '',
    contrasenia: '',
    rol: 'empleado',
  };

  /*  createFormGroup() {
    return new FormGroup({
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      usuario: new FormControl(''),
      contrasena: new FormControl(''),
      email: new FormControl(''),
      telefono: new FormControl(''),
      direccion: new FormControl(''),
      rol: new FormControl(''),
    });
  }
  employeeForm: FormGroup; */

  constructor(
    private loginService: LoginService,
    private router: Router,
    private empleadosService: EmpleadosServiceService
  ) {
    /*     this.employeeForm = this.createFormGroup();
     */
  }

  /*  onResetForm() {
    this.createFormGroup();
  }
  onSaveForm() {
    console.log('formulario guardado: ', this.employeeForm.value);
  } */

  ngOnInit(): void {
    this.getAllEmpleados();
  }

  rolEmpleado() {
    return this.loginService.getUser();
  }

  getAllEmpleados() {
    this.empleadosService.getAllEmpleados().subscribe(
      (data) => {
        //console.log(data.prestacionServicio);
        this.empleados = data.prestacionServicio;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  crearEmpleado: any = {
    guardar: () => {
      ///console.log('guardar');
      ///console.log(this.nuevoEmpleado);
      if (
        this.nuevoEmpleado.nombre === '' ||
        this.nuevoEmpleado.apellido === '' ||
        this.nuevoEmpleado.telefono === '' ||
        this.nuevoEmpleado.correo === '' ||
        this.nuevoEmpleado.puesto === '' ||
        this.nuevoEmpleado.usuario === '' ||
        this.nuevoEmpleado.contrasenia === ''
      ) {
        Swal.fire({
          title: 'Atención!!',
          text: 'Se requiere llenar todos los campos',
          toast: true,
          position: 'bottom-right',
          timer: 2000,
          showConfirmButton: false,
        });
        return;
      }

      this.empleadosService.crearEmpleado(this.nuevoEmpleado).subscribe(
        (data) => {
          ///console.log(""data.data);
          this.nuevoEmpleado = {};
          document
            .getElementById('btn-crear-empleado')
            ?.setAttribute('data-bs-dismiss', 'modal');
          //window.location.reload();
          this.getAllEmpleados();
        },
        (error) => {
          console.log(error.error.msg);
        }
      );
    },
    cancelar: () => {
      console.log('cancelar');
      this.nuevoEmpleado = {};
      console.log(this.nuevoEmpleado);
    },
  };

  vistaDetallada(clk: any) {
    ///console.log(clk);
    this.vistaDetalladaEmpleado = this.empleados[clk];
    ///console.log(this.vistaDetalladaEmpleado);
  }

  manejadorInfoEmpleadoFunc(id: any) {
    this.manejadorInfoEmpleado = this.empleados[id];
    this.editarEmpleadoData = JSON.parse(
      JSON.stringify(this.manejadorInfoEmpleado)
    );
  }

  confirmarEliminar(confirm: boolean) {
    if (confirm) {
      /*  console.log('confirm', confirm);
      console.log('info a eliminar', this.manejadorInfoEmpleado);
      this.manejadorInfoEmpleado = {};
      console.log('info a eliminar', this.manejadorInfoEmpleado); */
      // console.log(this.manejadorInfoEmpleado.usuario);
      this.empleadosService
        .eliminarEmpleado(this.manejadorInfoEmpleado.usuario)
        .subscribe((data) => {
          //console.log('data: ', data);
          this.manejadorInfoEmpleado = {};
          this.getAllEmpleados();
        });
    } else {
      console.log('Peticion de eliminar cancelada');
      /* console.log('confirm: ', 'cancelado'); */
    }
  }

  editarEmpleado: any = {
    guardar: () => {
      ///console.log('guardar');
      ///console.log(this.manejadorInfoEmpleado);
      if (
        this.editarEmpleadoData.nombre === '' ||
        this.editarEmpleadoData.apellidos === '' ||
        this.editarEmpleadoData.telefono === '' ||
        this.editarEmpleadoData.correo === '' ||
        this.editarEmpleadoData.puesto === '' ||
        this.editarEmpleadoData.usuario === '' ||
        this.editarEmpleadoData.contrasenia === ''
      ) {
        Swal.fire({
          title: 'Atención!!',
          text: 'Se requiere llenar todos los campos',
          toast: true,
          position: 'bottom-right',
          timer: 2000,
          showConfirmButton: false,
        });
        return;
      }

      this.empleadosService
        .editarEmpleado(
          this.editarEmpleadoData.usuario,
          this.editarEmpleadoData
        )
        .subscribe((data) => {
          ///console.log(data);
          this.getAllEmpleados();
        });
      document
        .getElementById('btn-editar')
        ?.setAttribute('data-bs-dismiss', 'modal');
      window.location.reload();

      this.editarEmpleadoData = {};
    },
    cancelar: () => {
      console.log('cancelar');
      this.editarEmpleadoData = {};
      console.log(this.editarEmpleadoData);
    },
  };

  cerrar() {
    this.loginService.cerrarSesion();
  }
}
