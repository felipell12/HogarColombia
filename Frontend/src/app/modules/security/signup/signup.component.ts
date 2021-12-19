import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloEmail } from 'src/app/models/email.modelo';
import { ModeloUser } from 'src/app/models/user.modelo';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
// adicion de validadores
  fgValidatorSignup: FormGroup = this.fbSignup.group({
    'nombre': ['',[Validators.required]],
    'apellido': ['',[Validators.required]],
    'tipodocumento': ['',[Validators.required]],
    'documento': ['',[Validators.required]],
    'email': ['',[Validators.required,Validators.email]],
    'telefono': ['',[Validators.required]],
    'password': ['',[Validators.required]], 
    'password2': ['',[Validators.required]]
  });
  constructor(private fbSignup: FormBuilder,
    private servicioSeguridad: SecurityService,
    private router: Router) { }

  ngOnInit(): void {
  }

  SignupCliente(){
    let email = this.fgValidatorSignup.controls['email'].value;
    let cliente = new ModeloUser();
    cliente.nombre = this.fgValidatorSignup.controls['nombre'].value;
    cliente.apellido = this.fgValidatorSignup.controls['apellido'].value;
    cliente.tipoDocumento = this.fgValidatorSignup.controls['tipodocumento'].value;
    cliente.documento = this.fgValidatorSignup.controls['documento'].value;
    cliente.email = this.fgValidatorSignup.controls['email'].value;
    cliente.telefono = this.fgValidatorSignup.controls['telefono'].value;
    cliente.role = 'Client';
    cliente.estado = 'Activo';
    cliente.password = this.fgValidatorSignup.controls['password'].value;

    if (cliente.email){
      this.servicioSeguridad.ValidaCorreoExistente(cliente.email).subscribe((datos:ModeloEmail) =>{
        if (datos){
          alert("Correo ya existe, por favor inicia sesión o recupera la contraseña");
        }else{
          this.servicioSeguridad.RegistrarCliente(cliente).subscribe((datos: ModeloUser) => {
            alert('Usuario registrado correctamente, por favor inicie sesión');
            this.router.navigate(['/security/login'])
          },(err: any) => {
            alert(`No se registró el usuario ${email}. Válide que el usuario no se encuentre ya registrado y verifique los datos ingresados`)      
          })
        }
      },(err: any) =>{
        alert("Error")
      })
    }
  }
}