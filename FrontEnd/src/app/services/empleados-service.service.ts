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
export class EmpleadosServiceService {
  // private url = 'http://localhost:4000/api/datosEmpleado';
  private url = 'https://backend-utj-9a.herokuapp.com/api/datosEmpleado';

  constructor(private http: HttpClient, private router: Router) {}

  private handleError(error: HttpErrorResponse) {
    /* if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.'); */
    console.error(error);
    return observableThrowError(error);
  }

  getAllEmpleados() {
    return this.http
      .get<any>(`${this.url}/obtenerTodasEmpleados`)
      .pipe(catchError(this.handleError));
  }
  crearEmpleado(empleado: any) {
    return this.http
      .post<any>(`${this.url}/guardarEmpleado`, empleado)
      .pipe(catchError(this.handleError))
      .pipe(
        map((res) => {
          console.log('ressss:');
          return res;
        })
      );
  }
  eliminarEmpleado(id: string) {
    return this.http
      .delete<any>(`${this.url}/eliminarEmpleado?usuario=${id}`)
      .pipe(catchError(this.handleError));
  }
  editarEmpleado(id: string, empleado: any) {
    console.log('empleado', empleado);
    return this.http
      .put<any>(`${this.url}/actualizarEmpleado?usuario=${id}`, empleado)
      .pipe(catchError(this.handleError));
  }
}
