import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloEmail } from 'src/app/models/email.modelo';
import { ModeloUser } from 'src/app/models/user.modelo';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-nuevo-asesor',
  templateUrl: './nuevo-asesor.component.html',
  styleUrls: ['./nuevo-asesor.component.css']
})
export class NuevoAsesorComponent implements OnInit {
  // adicion de validadores
  fgValidatorSignup: FormGroup = this.fbSignup.group({
    'nombre': ['', [Validators.required]],
    'apellido': ['', [Validators.required]],
    'tipodocumento': ['', [Validators.required]],
    'documento': ['', [Validators.required]],
    'email': ['', [Validators.required, Validators.email]],
    'telefono': ['', [Validators.required]],
  });
  constructor(private fbSignup: FormBuilder,
    private servicioSeguridad: SecurityService,
    private router: Router) { }

  ngOnInit(): void {
  }

  SignupCliente() {
    let email = this.fgValidatorSignup.controls['email'].value;
    let cliente = new ModeloUser();
    cliente.nombre = this.fgValidatorSignup.controls['nombre'].value;
    cliente.apellido = this.fgValidatorSignup.controls['apellido'].value;
    cliente.tipoDocumento = this.fgValidatorSignup.controls['tipodocumento'].value;
    cliente.documento = this.fgValidatorSignup.controls['documento'].value;
    cliente.email = this.fgValidatorSignup.controls['email'].value;
    cliente.telefono = this.fgValidatorSignup.controls['telefono'].value;
    cliente.role = 'Adviser';
    cliente.estado = 'Activo';
    cliente.password = '1234567890';

    if (cliente.email) {
      this.servicioSeguridad.ValidaCorreoExistente(cliente.email).subscribe((datos: ModeloEmail) => {
        if (datos) {
          alert("Correo ya existe, por favor inicia sesión o recupera la contraseña");
        } else {
          this.servicioSeguridad.RegistrarCliente(cliente).subscribe((datos: ModeloUser) => {
            alert('Asesor agregado correctamente');
            this.router.navigate(['/admin/asesores'])
          }, (err: any) => {
            alert(`No se registró el usuario ${email}. Válide que el usuario no se encuentre ya registrado y verifique los datos ingresados`)
          })
        }
      }, (err: any) => {
        alert("Error")
      })
    }
  }
}