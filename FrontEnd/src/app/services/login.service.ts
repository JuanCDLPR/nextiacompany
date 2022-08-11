import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // private url = 'http://localhost:4000/api/auth';
  private url = `https://backend-utj-9a.herokuapp.com/api/auth`;

  private userName: any;

  public getUserName() {
    this.userName = localStorage.getItem('name');
    return this.userName;
  }

  /* public setUserName(userName: string) {
    this.userName = userName;
  } */

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
