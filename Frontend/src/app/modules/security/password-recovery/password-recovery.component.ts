import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloEmail } from 'src/app/models/email.modelo';
import { ModeloUser } from 'src/app/models/user.modelo';
import { SecurityService } from 'src/app/services/security.service';
// import {generate} from 'generate-password';
// var generator = require('generate-password');

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {
  fgValidatorPassRecovery: FormGroup = this.fbPassRecovery.group({
    'email': ['',[Validators.required,Validators.email]]
  })
  constructor(private fbPassRecovery: FormBuilder,
    private servicioSeguridad: SecurityService,
    private router: Router) { }

  ngOnInit(): void {
  }

  PassRecovery(){
    const email = this.fgValidatorPassRecovery.controls['email'].value;
    this.servicioSeguridad.ValidaCorreoExistente(email).subscribe((datos:ModeloEmail) => {
      if (!datos){
        alert("El correo no se encuentra en el sistema, por favor cree una nueva cuenta");
      }else{
        var randomstring = Math.random().toString(36).slice(-8);
        // const password = generate({
        //   length: 10,
        //   numbers: true
        // });

        this.servicioSeguridad.BuscarPorEmail(email).subscribe((datos: ModeloUser) => {
          if (datos){
            datos.password = randomstring;
            this.servicioSeguridad.CambiarClave(datos).subscribe((datos: ModeloUser) => {
              alert("La nueva constraseña fue enviada al correo electrónico registrado")
              this.router.navigate(['/security/login'])
              },(err: any) => {
                alert("No se puede realizar cambio de contraseña")      
              })
            }
          },(err: any) => {
            alert("Error al recuperar clave")
          });
      }
    });
  }
}
