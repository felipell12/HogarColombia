import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // adicion de validadores
  fgValidatorLogin: FormGroup = this.fbLogin.group({
    'email': ['', [Validators.required, Validators.email]],
    'password': ['', [Validators.required]]
  });
  // adicion de FormBuilder al constructor: private fb: FormBuilder, private servicioSeguridad: SecurityService
  constructor(private fbLogin: FormBuilder,
    private servicioSeguridad: SecurityService,
    private router: Router) { }

  ngOnInit(): void {
  }

  // Agregar metodo para identificar usuario
  LoginUsuario() {
    let email = this.fgValidatorLogin.controls['email'].value;
    let password = this.fgValidatorLogin.controls['password'].value;
    this.servicioSeguridad.Identificar(email, password).subscribe((datos: any) => {
      //Ok
      this.servicioSeguridad.AlmacenarSesion(datos)
      this.router.navigate(['content'])
      this.servicioSeguridad.Recuperarme().subscribe((roles: any) => {
        const datos1 = {'token':datos.token, 'identificado': datos.identificado, 'rol': roles.role}
        this.servicioSeguridad.EliminarInformacionSesion();
        this.servicioSeguridad.AlmacenarSesion(datos1)
      }, (error: any) => {
        alert('cualquier cosa')
      })
    }, (err: any) => {
      //KO
      alert("Nombre de usuario o contraseña incorrectos. Por favor válide nuevamente");
    })
  }
}