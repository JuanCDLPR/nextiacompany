import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: '',
  };

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    if (this.user.email === '' || this.user.password === '') {
      //alert('Todos los campos son obligatorios');
      Swal.fire({
        title: 'Error',
        text: 'Todos los campos son obligatorios',
        icon: 'error',
        confirmButtonText: 'Ok',
      });

      return;
    }
    this.loginService.login(this.user).subscribe(
      (res) => {
        console.log('RES::::', res);
        if (res.ok == false) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario o contraseña incorrecta!',
            footer: 'Por favor, intente de nuevo',
          });
          return;
        }
        localStorage.setItem('token', res.token);
        localStorage.setItem('userType', res.userType);
        if (this.loginService.getUser() == 'Administrador') {
          this.router.navigate(['/empleados']);
        } else {
          this.router.navigate(['/reportes']);
        }
      },
      (err) => {
        console.log('ERROR:::::', err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuario o contraseña incorrecta!',
          footer: 'Por favor, intente de nuevo',
        });
      }
    );
  }
}
