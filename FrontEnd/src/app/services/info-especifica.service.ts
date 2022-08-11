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
export class InfoEspecificaService {
  // private url = 'http://localhost:4000/api/InfoEspecifica';
  private url = 'https://backend-utj-9a.herokuapp.com/api/InfoEspecifica';

  constructor(private http: HttpClient, private router: Router) {}

  private handleError(error: HttpErrorResponse) {
    console.error(error);
    return observableThrowError(error);
  }

  getConteoReportes() {
    return this.http
      .get<any>(`${this.url}/getConteoReportes`)
      .pipe(catchError(this.handleError));
  }
}
