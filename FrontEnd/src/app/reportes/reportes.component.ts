import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
})
export class ReportesComponent implements OnInit {
  NombreUsuario = '';
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.NombreUsuario = this.loginService.getUserName();
    console.log('NombreUsuario', this.NombreUsuario);
  }

  rolEmpleado() {
    return this.loginService.getUser();
  }

  cerrar() {
    this.loginService.cerrarSesion();
  }
}
