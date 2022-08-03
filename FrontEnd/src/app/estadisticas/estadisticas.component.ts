import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { LoginService } from '../services/login.service';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { InfoEspecificaService } from '../services/info-especifica.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css'],
})
export class EstadisticasComponent implements OnInit {
  NombreUsuario = '';

  dataGrafica: any = {};

  public doughnutChartLabels: Label[] = [
    'Evaluación',
    'Cotización',
    'En proceso',
    'Terminado',
  ];
  public doughnutChartData: MultiDataSet = [[15, 8, 10, 15]];
  public doughnutChartType: ChartType = 'doughnut';

  public colors: Color[] = [
    {
      //backgroundColor: ['#0075ED', '#00BAF7', '#00E0DB', '#00F7AD', '#00ED63'],
      backgroundColor: ['#DD3B4B', '#FFC413', '#2C81FD', '#349568'],
    },
  ];

  ////////////////////////////////////////////////////////////////////////////////////
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
    '2022',
  ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    {
      data: [65, 59, 80, 81, 56, 55, 40],
      label: 'Clientes',
      backgroundColor: '#ED5F76',
      hoverBackgroundColor: 'red',
      hoverRadius: 100,
    },
    {
      data: [28, 48, 40, 19, 86, 27, 90],
      label: 'Reportes',
      backgroundColor: '#F763C4',
      hoverBackgroundColor: 'red',
    },
    {
      data: [8, 38, 70, 59, 66, 80, 100],
      label: 'Empleados',
      backgroundColor: '#D665E0',
      hoverBackgroundColor: 'red',
    },
  ];

  constructor(
    private loginService: LoginService,
    private infoEspecificaService: InfoEspecificaService
  ) {}

  ngOnInit(): void {
    const ctx = document.getElementById('myChart');
    this.NombreUsuario = this.loginService.getUserName();
    this.randomize();
    this.dataGrafica = this.infoEspecificaService
      .getConteoReportes()
      .subscribe((data) => {
        console.log(data);
        this.dataGrafica = {
          evaluacion: data.evaluacionesTotales,
          cotizacion: data.cotizacionesTotales,
          proceso: data.procesoTotales,
          terminado: data.terminadoTotales,
        };
        this.doughnutChartData = [
          data.evaluacionesTotales,
          data.cotizacionesTotales,
          data.procesoTotales,
          data.terminadoTotales,
        ];
      });
  }

  cerrar() {
    this.loginService.cerrarSesion();
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData[0].data = [
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
    ];

    this.barChartData[1].data = [
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
    ];

    this.barChartData[2].data = [
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
    ];
  }
}
