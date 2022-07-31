import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientesServiceService {
  private url = 'http://localhost:4000/api/datosCliente';
  constructor(private http: HttpClient, private router: Router) {}

  private handleError(error: HttpErrorResponse) {
    console.error(error);
    return observableThrowError(error);
  }

  getAllClientes() {
    return this.http
      .get<any>(`${this.url}/obtenerTodosClientes`)
      .pipe(catchError(this.handleError));
  }

  crearCliente(cliente: any) {
    return this.http
      .post<any>(`${this.url}/guardarCliente`, cliente)
      .pipe(catchError(this.handleError))
      .pipe(
        map((res) => {
          console.log('ressss:');
          return res;
        })
      );
  }
  eliminarCliente(rfc: string) {
    return this.http
      .delete<any>(`${this.url}/eliminarCliente?rfc=${rfc}`)
      .pipe(catchError(this.handleError));
  }
  editarCliente(id: string, cliente: any) {
    ///console.log('cliente', cliente);
    return this.http
      .put<any>(`${this.url}/actualizarCliente?id=${id}`, cliente)
      .pipe(catchError(this.handleError));
  }
}
