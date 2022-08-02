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
  tipo: any;
  div1: any;
  div2: any;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  Show_Hiden_Pass() {
    this.tipo = document.getElementById('pass_word');
    this.div1 = document.getElementById('show');
    this.div2 = document.getElementById('hide');
    if (this.tipo.type == 'password') {
      this.tipo.type = 'text';
      this.div1.style.display = 'none';
      this.div2.style.display = 'block';
    } else {
      this.tipo.type = 'password';
      this.div1.style.display = 'block';
      this.div2.style.display = 'none';
    }
  }

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
        ///this.loginService.setUserName(res.name);
        localStorage.setItem('name', res.name);
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
