import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { Tooltip, Toast, Popover } from 'bootstrap';
import { ReportesComponent } from './reportes/reportes.component';
import { ClientesComponent } from './clientes/clientes.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { GraficasComponent } from './graficas/graficas.component';
import { ReportesTecnicosComponent } from './reportes-tecnicos/reportes-tecnicos.component';
import { VistaClienteComponent } from './vista-cliente/vista-cliente.component';
import { LoginService } from './services/login.service';
import { TokenValidateGuard } from './guards/token-validate.guard';
import { HomeOverGuard } from './guards/home-over.guard';
import { ValidateUserGuard } from './guards/validate-user.guard';

const AppRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: SidebarComponent,
    canActivate: [HomeOverGuard],
  },
  {
    path: 'sidebar',
    component: SidebarComponent,
    canActivate: [TokenValidateGuard],
  },
  {
    path: 'empleados',
    component: EmpleadosComponent,
    canActivate: [TokenValidateGuard, ValidateUserGuard],
  },
  {
    path: 'reportes',
    component: ReportesComponent,
    canActivate: [TokenValidateGuard],
  },
  {
    path: 'clientes',
    component: ClientesComponent,
    canActivate: [TokenValidateGuard, ValidateUserGuard],
  },
  {
    path: 'estadisticas',
    component: EstadisticasComponent,
    canActivate: [TokenValidateGuard, ValidateUserGuard],
  },
  {
    path: 'report',
    component: ReportesTecnicosComponent,
    canActivate: [TokenValidateGuard],
  },
  {
    path: 'client',
    component: VistaClienteComponent,
    ///canActivate: [TokenValidateGuard],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    EmpleadosComponent,
    ReportesComponent,
    ClientesComponent,
    EstadisticasComponent,
    GraficasComponent,
    ReportesTecnicosComponent,
    VistaClienteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(AppRoutes),
    HttpClientModule,
    FormsModule,
    // ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    ChartsModule,
    CommonModule,
  ],
  providers: [LoginService],
  bootstrap: [AppComponent],
})
export class AppModule {}
