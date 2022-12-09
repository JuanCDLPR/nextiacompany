import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ReportesService } from '../services/reportes.service';
import Swal from 'sweetalert2';

import pdfMake from 'pdfmake/build/pdfMake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
})
export class ReportesComponent implements OnInit {
  NombreUsuario = '';
  public page: number | undefined = 1;
  filterpost = '';
  reportes: any[] = [];
  vistaDetalladaReporte: any = {};
  manejadorInfoReporte: any = {};
  editarReporteData: any = {};
  nuevoReporte: any = {
    folio: '',
    status: '',
    tenicoAsignado: '',
    tipoDeServicio: '',
    head: {
      horaSalida: '',
      horaInicio: '',
      horaFin: '',
      horaLlegada: '',
      vehiculo: '',
      kilometraje: {
        inicio: '',
        fin: '',
      },
      fecha: '',
      cliente: '',
      solicitante: '',
      ubicacion: '',
    },
    body: {
      maquina_equipo: '',
      requerimientos: '',
      diagnostico: '',
      solucion: '',
      refacciones: '',
    },
    footer: {
      vigilancia: '',
      solicitante: '',
      ingServicio1: '',
      ingServicio2: '',
      ingServicio3: '',
    },
  };
  constructor(
    private loginService: LoginService,
    private reporteService: ReportesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.vistaDetalladaReporte = JSON.parse(JSON.stringify(this.nuevoReporte));
    this.editarReporteData = JSON.parse(JSON.stringify(this.nuevoReporte));
    this.NombreUsuario = this.loginService.getUserName();
    ///console.log('NombreUsuario', this.NombreUsuario);
    this.getAllReportes();
  }

  rolEmpleado() {
    return this.loginService.getUser();
  }

  getAllReportes() {
    let rep = [];
    this.reporteService.getAllPrestaciones().subscribe(
      (data) => {
        console.log('GetReportesService', data);

        if (localStorage.getItem('userType') != 'Administrador') {
          data.prestacionServicio.map((element: any) => {
            console.log('USER: ', localStorage.getItem('name').toLowerCase());
            console.log('DB: ', element.tenicoAsignado.toLowerCase());
            if (
              localStorage.getItem('name').toLowerCase() ===
              element.tenicoAsignado.toLowerCase()
            ) {
              //console.log(element.tenicoAsignado);
              rep.push(element);
            }
          });
          this.reportes = rep;
        } else {
          this.reportes = data.prestacionServicio;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  crearReporte: any = {
    guardar: () => {
      if (
        this.nuevoReporte.folio === '' ||
        this.nuevoReporte.status === '' ||
        this.nuevoReporte.tenicoAsignado === '' ||
        this.nuevoReporte.tipoDeServicio === '' ||
        this.nuevoReporte.head.horaSalida === '' ||
        this.nuevoReporte.head.horaInicio === '' ||
        this.nuevoReporte.head.horaFin === '' ||
        this.nuevoReporte.head.horaLlegada === '' ||
        this.nuevoReporte.head.vehiculo === '' ||
        this.nuevoReporte.head.kilometraje.inicio === '' ||
        this.nuevoReporte.head.kilometraje.fin === '' ||
        this.nuevoReporte.head.fecha === '' ||
        this.nuevoReporte.head.cliente === '' ||
        this.nuevoReporte.head.solicitante === '' ||
        this.nuevoReporte.head.ubicacion === '' ||
        this.nuevoReporte.body.maquina_equipo === '' ||
        this.nuevoReporte.body.requerimientos === '' ||
        this.nuevoReporte.body.diagnostico === '' ||
        this.nuevoReporte.body.solucion === '' ||
        this.nuevoReporte.body.refacciones === ''
        /* this.nuevoReporte.footer.vigilancia === '' ||
        this.nuevoReporte.footer.solicitante === '' ||
        this.nuevoReporte.footer.ingServicio1 === '' ||
        this.nuevoReporte.footer.ingServicio2 === '' ||
        this.nuevoReporte.footer.ingServicio3 === '' */
      ) {
        console.log(this.nuevoReporte);
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
      this.reporteService.crearPrestacion(this.nuevoReporte).subscribe(
        (data) => {
          console.log('CrearReporteService', data);
          this.getAllReportes();
          this.nuevoReporte = {
            folio: '',
            status: '',
            tenicoAsignado: '',
            tipoDeServicio: '',
            head: {
              horaSalida: '',
              horaInicio: '',
              horaFin: '',
              horaLlegada: '',
              vehiculo: '',
              kilometraje: {
                inicio: '',
                fin: '',
              },
              fecha: '',
              cliente: '',
              solicitante: '',
              ubicacion: '',
            },
            body: {
              maquina_equipo: '',
              requerimientos: '',
              diagnostico: '',
              solucion: '',
              refacciones: '',
            },
            footer: {
              vigilancia: '',
              solicitante: '',
              ingServicio1: '',
              ingServicio2: '',
              ingServicio3: '',
            },
          };
          console.log(this.nuevoReporte);
          /* document
          .getElementById('btn-crear-clientes')
          ?.setAttribute('data-bs-dismiss', 'modal'); */
          //window.location.reload();
          this.getAllReportes();
        },
        (error) => {
          console.log(error.error.msg);
        }
      );
    },
    cancelar: () => {
      console.log('Cancelar');
      this.nuevoReporte = {
        folio: '',
        status: '',
        tenicoAsignado: '',
        tipoDeServicio: '',
        head: {
          horaSalida: '',
          horaInicio: '',
          horaFin: '',
          horaLlegada: '',
          vehiculo: '',
          kilometraje: {
            inicio: '',
            fin: '',
          },
          fecha: '',
          cliente: '',
          solicitante: '',
          ubicacion: '',
        },
        body: {
          maquina_equipo: '',
          requerimientos: '',
          diagnostico: '',
          solucion: '',
          refacciones: '',
        },
        footer: {
          vigilancia: '',
          solicitante: '',
          ingServicio1: '',
          ingServicio2: '',
          ingServicio3: '',
        },
      };
      console.log(this.nuevoReporte);
    },
  };

  vistaDetallada(id: any) {
    // console.log(id);
    this.vistaDetalladaReporte = this.reportes[id];
    //console.log(this.vistaDetalladaReporte);
  }

  manejadorInfoReporteFunc(id: any) {
    //console.log(id);
    //console.log(this.editarReporteData);
    this.manejadorInfoReporte = this.reportes[id];
    this.editarReporteData = JSON.parse(
      JSON.stringify(this.manejadorInfoReporte)
    );
  }

  confirmarEliminar(confirm: boolean) {
    if (confirm) {
      /*  console.log('confirm', confirm);
      console.log('info a eliminar', this.manejadorInfoEmpleado);
      this.manejadorInfoEmpleado = {};
      console.log('info a eliminar', this.manejadorInfoEmpleado); */
      //console.log(this.manejadorInfoCliente.rfc);

      this.reporteService
        .eliminarPrestacion(this.manejadorInfoReporte.folio)
        .subscribe((data) => {
          console.log('EliminarClientesService: ', data);
          this.manejadorInfoReporte = {};
          this.getAllReportes();
        });
    } else {
      console.log('Peticion de eliminar cancelada');
      /* console.log('confirm: ', 'cancelado'); */
    }
  }

  editarReporte: any = {
    guardar: () => {
      console.log('EditarReporteService', this.editarReporteData);
      if (
        this.editarReporteData.folio === '' ||
        this.editarReporteData.status === '' ||
        this.editarReporteData.tenicoAsignado === '' ||
        this.editarReporteData.tipoDeServicio === '' ||
        this.editarReporteData.head.horaSalida === '' ||
        this.editarReporteData.head.horaInicio === '' ||
        this.editarReporteData.head.horaFin === '' ||
        this.editarReporteData.head.horaLlegada === '' ||
        this.editarReporteData.head.vehiculo === '' ||
        this.editarReporteData.head.kilometraje.inicio === '' ||
        this.editarReporteData.head.kilometraje.fin === '' ||
        this.editarReporteData.head.fecha === '' ||
        this.editarReporteData.head.cliente === '' ||
        this.editarReporteData.head.solicitante === '' ||
        this.editarReporteData.head.ubicacion === '' ||
        this.editarReporteData.body.maquina_equipo === '' ||
        this.editarReporteData.body.requerimientos === '' ||
        this.editarReporteData.body.diagnostico === '' ||
        this.editarReporteData.body.solucion === '' ||
        this.editarReporteData.body.refacciones === ''
        /* this.editarReporteData.footer.vigilancia === '' ||
        this.editarReporteData.footer.solicitante === '' ||
        this.editarReporteData.footer.ingServicio1 === '' ||
        this.editarReporteData.footer.ingServicio2 === '' ||
        this.editarReporteData.footer.ingServicio3 === '' */
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
      this.reporteService
        .editarPrestacion(this.editarReporteData.folio, this.editarReporteData)
        .subscribe(
          (data) => {
            console.log('EditarReporteService', data);
            this.getAllReportes();
          },
          (error) => {
            console.log(error.error.msg);
          }
        );
      /* document
        .getElementById('btn_edit_reporte')
        ?.setAttribute('data-bs-dismiss', 'modal');*/
      //window.location.reload();
      this.editarReporteData = JSON.parse(JSON.stringify(this.nuevoReporte));
    },
    cancelar: () => {
      console.log('cancelar');
      this.editarReporteData = JSON.parse(JSON.stringify(this.nuevoReporte));
      ///console.log(this.editarReporteData);
    },
  };

  async createPdf() {
    console.log('createPdf');
    console.log(this.vistaDetalladaReporte);
    const pdfDefinition: any = {
      content: [
        {
          image: await this.getBase64ImageFromURL('assets/aconlogo.png'),
          alignment: 'center',
          width: 100,
        },

        {
          columns: [
            {
              text: [
                {
                  text: 'Hora de prestación de servicio ',
                  fontSize: 15,
                  bold: true,
                  alignment: 'center',
                },
              ],
              margin: [0, 20, 0, 0],
            },
          ],
        },

        {
          columns: [
            {
              text: [
                {
                  text: 'Hora de salida: ',
                  fontSize: 13,
                  bold: true,
                },

                this.vistaDetalladaReporte.head.horaInicio,
                ,
              ],
              margin: [0, 30, 0, 0],
            },

            {
              text: [
                {
                  text: 'S-1: ',
                  fontSize: 13,
                  bold: true,
                },

                this.vistaDetalladaReporte.folio,
                ,
              ],

              margin: [0, 30, 0, 0],
            },
          ],
        },

        {
          columns: [
            {
              text: [
                {
                  text: 'Hora de Inicio: ',
                  fontSize: 13,
                  bold: true,
                },

                this.vistaDetalladaReporte.head.horaInicio,
                ,
              ],
              margin: [0, 10, 0, 0],
            },

            {
              text: [
                {
                  text: 'Fecha: ',
                  fontSize: 13,
                  bold: true,
                },

                this.vistaDetalladaReporte.head.fecha,
                ,
              ],
              margin: [0, 10, 0, 0],
            },
          ],
        },

        {
          columns: [
            {
              text: [
                {
                  text: 'Hora de Fin: ',
                  fontSize: 13,
                  bold: true,
                },

                this.vistaDetalladaReporte.head.horaFin,
                ,
              ],
              margin: [0, 10, 0, 0],
            },
            {
              text: [
                {
                  text: 'Cliente: ',
                  fontSize: 13,
                  bold: true,
                },

                this.vistaDetalladaReporte.head.cliente,
                ,
              ],
              margin: [0, 10, 0, 0],
            },
          ],
        },

        {
          columns: [
            {
              text: [
                {
                  text: 'Hora de Llegada: ',
                  fontSize: 13,
                  bold: true,
                },

                this.vistaDetalladaReporte.head.horaLlegada,
                ,
              ],
              margin: [0, 10, 0, 0],
            },

            {
              text: [
                {
                  text: 'Solicitante: ',
                  fontSize: 13,
                  bold: true,
                },

                this.vistaDetalladaReporte.head.solicitante,
                ,
              ],
              margin: [0, 10, 0, 0],
            },
          ],
        },

        {
          columns: [
            {
              text: [
                {
                  text: 'Vehículo: ',
                  fontSize: 13,
                  bold: true,
                },

                this.vistaDetalladaReporte.head.vehiculo,
                ,
              ],
              margin: [0, 10, 0, 0],
            },

            {
              text: [
                {
                  text: 'Ubicación: ',
                  fontSize: 13,
                  bold: true,
                },

                this.vistaDetalladaReporte.head.ubicacion,
                ,
              ],
              margin: [0, 10, 0, 0],
            },
          ],
        },

        {
          columns: [
            {
              text: [
                {
                  text: 'KM de Inicio: ',
                  fontSize: 13,
                  bold: true,
                },

                `${this.vistaDetalladaReporte.head.kilometraje.inicio} km`,
                ,
              ],
              margin: [0, 10, 0, 0],
            },
            {
              text: [
                {
                  text: 'KM de Fin: ',
                  fontSize: 13,
                  bold: true,
                },

                `${this.vistaDetalladaReporte.head.kilometraje.fin} km`,
                ,
              ],
              margin: [0, 10, 0, 0],
            },
          ],
        },

        {
          text: [
            {
              text: 'Máquina o equipo: ',
              fontSize: 13,
              bold: true,
            },
          ],
          margin: [0, 50, 0, 0],
        },

        {
          text: [
            {
              text: this.vistaDetalladaReporte.body.maquina_equipo,
            },
          ],
          margin: [0, 5, 0, 0],
        },

        {
          text: [
            {
              text: 'Requerimiento: ',
              fontSize: 13,
              bold: true,
            },
          ],
          margin: [0, 20, 0, 0],
        },

        {
          text: [
            {
              text: this.vistaDetalladaReporte.body.requerimientos,
            },
          ],
          margin: [0, 5, 0, 0],
        },

        {
          text: [
            {
              text: 'Diagnóstico: ',
              fontSize: 13,
              bold: true,
            },
          ],
          margin: [0, 20, 0, 0],
        },

        {
          text: [
            {
              text: this.vistaDetalladaReporte.body.diagnostico,
            },
          ],
          margin: [0, 5, 0, 0],
        },

        {
          text: [
            {
              text: 'Solución: ',
              fontSize: 13,
              bold: true,
            },
          ],
          margin: [0, 20, 0, 0],
        },

        {
          text: [
            {
              text: this.vistaDetalladaReporte.body.solucion,
            },
          ],
          margin: [0, 5, 0, 0],
        },

        {
          text: [
            {
              text: 'Refacciones: ',
              fontSize: 13,
              bold: true,
            },
          ],
          margin: [0, 20, 0, 0],
        },

        {
          text: [
            {
              text: this.vistaDetalladaReporte.body.refacciones,
            },
          ],
          margin: [0, 5, 0, 0],
        },
      ],
    };

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }

  getBase64ImageFromURL(url: any) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');

      img.onload = () => {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx: any = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL('image/png');

        resolve(dataURL);
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = url;
    });
  }

  cerrar() {
    this.loginService.cerrarSesion();
  }
}
