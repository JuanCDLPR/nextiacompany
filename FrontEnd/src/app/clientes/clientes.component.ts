import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ClientesServiceService } from '../services/clientes-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  NombreUsuario = '';
  public page: number | undefined = 1;
  filterpost = '';
  clientes: any[] = [];
  vistaDetalladaCliente: any = {};
  manejadorInfoCliente: any = {};
  editarClienteData: any = {};
  nuevoCliente: any = {
    empresa: '',
    direccion: '',
    cp: '',
    telefono: '',
    rfc: '',
    contacto: {
      nombre: '',
      apellidos: '',
      telefono: '',
      correo: '',
      fax: '',
      cargo: '',
      area: '',
    },
  };
  constructor(
    private router: Router,
    private loginService: LoginService,
    private clienteService: ClientesServiceService
  ) {}

  ngOnInit(): void {
    this.vistaDetalladaCliente = JSON.parse(JSON.stringify(this.nuevoCliente));
    this.editarClienteData = JSON.parse(JSON.stringify(this.nuevoCliente));
    this.getAllClientes();
    this.NombreUsuario = this.loginService.getUserName();
  }
  rolEmpleado() {
    return this.loginService.getUser();
  }

  getAllClientes() {
    this.clienteService.getAllClientes().subscribe(
      (data) => {
        console.log('GetClientesService', data);
        this.clientes = data.DatosClienteFind;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  crearCliente: any = {
    guardar: () => {
      if (
        this.nuevoCliente.empresa === '' ||
        this.nuevoCliente.direccion === '' ||
        this.nuevoCliente.cp === '' ||
        this.nuevoCliente.telefono === '' ||
        this.nuevoCliente.rfc === '' ||
        this.nuevoCliente.contacto.nombre === '' ||
        this.nuevoCliente.contacto.apellidos === '' ||
        this.nuevoCliente.contacto.telefono === '' ||
        this.nuevoCliente.contacto.correo === '' ||
        this.nuevoCliente.contacto.fax === '' ||
        this.nuevoCliente.contacto.cargo === '' ||
        this.nuevoCliente.contacto.area === ''
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
      this.clienteService.crearCliente(this.nuevoCliente).subscribe(
        (data) => {
          console.log('CrearClientesService', data);
          this.nuevoCliente = {
            empresa: '',
            direccion: '',
            cp: '',
            telefono: '',
            rfc: '',
            contacto: {
              nombre: '',
              apellidos: '',
              telefono: '',
              correo: '',
              fax: '',
              cargo: '',
              area: '',
            },
          };
          document
            .getElementById('_crearCLT')
            ?.setAttribute('data-bs-dismiss', 'modal');
          //window.location.reload();
          this.getAllClientes();
        },
        (error) => {
          console.log(error.error.msg);
        }
      );
    },
    cancelar: () => {
      console.log('cancelar');
      this.nuevoCliente = {
        empresa: '',
        direccion: '',
        cp: '',
        telefono: '',
        rfc: '',
        contacto: {
          nombre: '',
          apellidos: '',
          telefono: '',
          correo: '',
          fax: '',
          cargo: '',
          area: '',
        },
      };
      console.log(this.nuevoCliente);
    },
  };

  vistaDetallada(id: any) {
    ///console.log(clk);
    this.vistaDetalladaCliente = this.clientes[id];
    ///console.log(this.vistaDetalladaCliente);
  }

  manejadorInfoClienteFunc(id: any) {
    ///console.log('id', id);
    //console.log(this.clientes[id]);
    this.manejadorInfoCliente = this.clientes[id];
    ///console.log(this.manejadorInfoCliente);
    this.editarClienteData = JSON.parse(
      JSON.stringify(this.manejadorInfoCliente)
    );
    ///console.log(this.editarClienteData);
  }

  confirmarEliminar(confirm: boolean) {
    if (confirm) {
      /*  console.log('confirm', confirm);
      console.log('info a eliminar', this.manejadorInfoEmpleado);
      this.manejadorInfoEmpleado = {};
      console.log('info a eliminar', this.manejadorInfoEmpleado); */
      //console.log(this.manejadorInfoCliente.rfc);

      this.clienteService
        .eliminarCliente(this.manejadorInfoCliente.rfc)
        .subscribe((data) => {
          console.log('EliminarClientesService: ', data);
          this.manejadorInfoCliente = {};
          this.getAllClientes();
        });
    } else {
      console.log('Peticion de eliminar cancelada');
      /* console.log('confirm: ', 'cancelado'); */
    }
  }

  editarCliente: any = {
    guardar: () => {
      ///console.log('guardar');
      ///console.log(this.editarClienteData);
      if (
        this.editarClienteData.empresa === '' ||
        this.editarClienteData.direccion === '' ||
        this.editarClienteData.cp === '' ||
        this.editarClienteData.telefono === '' ||
        this.editarClienteData.rfc === '' ||
        this.editarClienteData.contacto.nombre === '' ||
        this.editarClienteData.contacto.apellidos === '' ||
        this.editarClienteData.contacto.telefono === '' ||
        this.editarClienteData.contacto.correo === '' ||
        this.editarClienteData.contacto.fax === '' ||
        this.editarClienteData.contacto.cargo === '' ||
        this.editarClienteData.contacto.area === ''
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

      this.clienteService
        .editarCliente(this.editarClienteData._id, this.editarClienteData)
        .subscribe(
          (data) => {
            console.log('EditarClientesService', data);
            this.getAllClientes();
          },
          (error) => {
            console.log(error.error.msg);
          }
        );
      document
        .getElementById('btn_edit')
        ?.setAttribute('data-bs-dismiss', 'modal');
      window.location.reload();

      this.editarClienteData = JSON.parse(JSON.stringify(this.nuevoCliente));
    },
    cancelar: () => {
      console.log('cancelar');
      this.editarClienteData = JSON.parse(JSON.stringify(this.nuevoCliente));
      console.log(this.editarClienteData);
    },
  };

  cerrar() {
    this.loginService.cerrarSesion();
  }
}
