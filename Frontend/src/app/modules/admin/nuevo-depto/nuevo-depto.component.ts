import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloDepartamento } from 'src/app/models/departamento.modelo';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-nuevo-depto',
  templateUrl: './nuevo-depto.component.html',
  styleUrls: ['./nuevo-depto.component.css']
})
export class NuevoDeptoComponent implements OnInit {
  fgValidatorNew: FormGroup = this.fbNew.group({
    'nombre': ['',[Validators.required]]
  });
  dpto: ModeloDepartamento = new ModeloDepartamento();
  
  constructor( private fbNew: FormBuilder,   private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
  }

  crear(){
    this.dpto.nombre = this.fgValidatorNew.controls['nombre'].value;
    this.adminService.crearDpto(this.dpto).subscribe((dep: ModeloDepartamento)=>{
      this.router.navigate(["admin/departamentos"]);
    })
    
  }
/*

  SignupCliente(){

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
*/
}
