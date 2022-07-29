import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

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

const AppRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: SidebarComponent,
    canActivate: [TokenValidateGuard],
  },
  {
    path: 'sidebar',
    component: SidebarComponent,
    canActivate: [TokenValidateGuard],
  },
  {
    path: 'empleados',
    component: EmpleadosComponent,
    canActivate: [TokenValidateGuard],
  },
  {
    path: 'reportes',
    component: ReportesComponent,
    canActivate: [TokenValidateGuard],
  },
  {
    path: 'clientes',
    component: ClientesComponent,
    canActivate: [TokenValidateGuard],
  },
  {
    path: 'estadisticas',
    component: EstadisticasComponent,
    canActivate: [TokenValidateGuard],
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
  ],
  providers: [LoginService],
  bootstrap: [AppComponent],
})
export class AppModule {}
