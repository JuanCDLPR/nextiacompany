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
export class ReportesService {
  // private url = 'http://localhost:4000/api/prestacionServicio';
  private url = 'https://backend-utj-9a.herokuapp.com/api/prestacionServicio';
  constructor(private http: HttpClient, private router: Router) {}

  private handleError(error: HttpErrorResponse) {
    console.error(error);
    return observableThrowError(error);
  }

  getAllPrestaciones() {
    return this.http
      .get<any>(`${this.url}/getAllPrestacionServicio`)
      .pipe(catchError(this.handleError));
  }

  getPrestacionesByFolio(folio: string) {
    return this.http
      .get<any>(`${this.url}/getPrestacionServicio?folio=${folio}`)
      .pipe(catchError(this.handleError));
  }

  eliminarPrestacion(folio: string) {
    return this.http
      .delete<any>(`${this.url}/deletePrestacionServicio?folio=${folio}`)
      .pipe(catchError(this.handleError));
  }

  editarPrestacion(folio: string, prestacion: any) {
    return this.http
      .put<any>(
        `${this.url}/updatePrestacionServicio?folio=${folio}`,
        prestacion
      )
      .pipe(catchError(this.handleError));
  }

  crearPrestacion(prestacion: any) {
    return this.http
      .post<any>(`${this.url}/postPrestacionServicio`, prestacion)
      .pipe(catchError(this.handleError))
      .pipe(
        map((res) => {
          console.log('ressss:');
          return res;
        })
      );
  }
}
