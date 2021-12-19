import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';
import { ModeloUser } from 'src/app/models/user.modelo';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {
  fgValidatorPassChange: FormGroup = this.fbPassChange.group({
    'password': ['', [Validators.required, Validators.minLength(8)]],
    'password2': ['', [Validators.required, Validators.minLength(8)]]
  })
  constructor(private fbPassChange: FormBuilder,
    private servicioSeguridad: SecurityService,
    private router: Router) { }

  ngOnInit(): void {
  }

  PassChange() {
    const password = this.fgValidatorPassChange.controls['password'].value;
    const password2 = this.fgValidatorPassChange.controls['password2'].value;
    if (password != password2) {
      alert("Las contraseñas no coinciden")
    }
    else {
      this.servicioSeguridad.Recuperarme().subscribe((datos: ModeloUser) => {
        if (datos) {
            datos.password = password;
            this.servicioSeguridad.CambiarClave(datos).subscribe((datos: ModeloUser) => {
              alert('Constraseña cambiada exitosamente');
              this.router.navigate(['content'])
            }, (err: any) => {
              alert("No se puede realizar cambio de contraseña")
            })
        }
      }, (err: any) => {
        alert("Error al modificar la constraseña")
      });
    }
  }
}