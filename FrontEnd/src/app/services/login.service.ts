import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = 'http://localhost:4000/api/auth';

  public getUser() {
    return localStorage.getItem('userType');
  }

  constructor(private http: HttpClient, private router: Router) {}

  login(user: any) {
    return this.http.post<any>(this.url, user);
  }

  esLogeado() {
    return !!localStorage.getItem('token');
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
