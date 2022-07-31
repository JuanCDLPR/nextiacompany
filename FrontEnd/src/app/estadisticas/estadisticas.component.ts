import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css'],
})
export class EstadisticasComponent implements OnInit {
  NombreUsuario = '';
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    const ctx = document.getElementById('myChart');
    this.NombreUsuario = this.loginService.getUserName();
  }

  cerrar() {
    this.loginService.cerrarSesion();
  }
}
