import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../services/reportes.service';

@Component({
  selector: 'app-vista-cliente',
  templateUrl: './vista-cliente.component.html',
  styleUrls: ['./vista-cliente.component.css'],
})
export class VistaClienteComponent implements OnInit {
  idReporte: string = '';
  trueDiv: any;
  falseDiv: any;

  reporte: any = {
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

  constructor(private reporteService: ReportesService) {}

  ngOnInit(): void {}

  buscarReporte() {
    this.trueDiv = document.getElementById('true');
    this.falseDiv = document.getElementById('false');
    console.log(this.idReporte);
    this.reporteService
      .getPrestacionesByFolio(this.idReporte)
      .subscribe((data) => {
        //console.log(data);
        //console.log(data.dataStatus);
        if (data.dataStatus == true) {
          this.reporte.folio = data.prestacionServicio.folio;
          this.reporte.status = data.prestacionServicio.status;
          this.reporte.tenicoAsignado = data.prestacionServicio.tenicoAsignado;
          this.reporte.tipoDeServicio = data.prestacionServicio.tipoDeServicio;
          this.reporte.body.maquina_equipo =
            data.prestacionServicio.body.maquina_equipo;
          this.reporte.body.requerimientos =
            data.prestacionServicio.body.requerimientos;
          this.reporte.body.diagnostico =
            data.prestacionServicio.body.diagnostico;
          this.reporte.body.solucion = data.prestacionServicio.body.solucion;
          this.reporte.body.refacciones =
            data.prestacionServicio.body.refacciones;

          this.trueDiv.style.display = 'block';
          this.falseDiv.style.display = 'none';
        } else {
          this.trueDiv.style.display = 'none';
          this.falseDiv.style.display = 'block';
        }
      });

    //this.idReporte = '';
  }
}
