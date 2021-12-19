import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloUser } from 'src/app/models/user.modelo';
import { AdminService } from 'src/app/services/admin.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-eliminar-asesor',
  templateUrl: './eliminar-asesor.component.html',
  styleUrls: ['./eliminar-asesor.component.css']
})
export class EliminarAsesorComponent implements OnInit {
  id?: string;
  user: ModeloUser  = new ModeloUser();

  constructor(private router: Router, private adminService: AdminService, private activatedRoute: ActivatedRoute, private securityService: SecurityService) {

   }
  ngOnInit(): void {
    this.ObtenerId()
  }
  ObtenerId() {
    if (this.activatedRoute.snapshot.paramMap.get('id') == null) {
      this.router.navigate(["/cliente/buscar-solicitud"]);
    }
    else {
      this.id = this.activatedRoute.snapshot.paramMap.get('id')!;
    }
    return this.id;
  }
  
  eliminar() {
    console.log('Entro en metodo boton')
    this.adminService.obtenerAsesor(this.id).subscribe((datos: ModeloUser) => {
    
      this.user.id = this.id
      this.user.nombre = datos.nombre;
      this.user.apellido = datos.apellido;
      this.user.tipoDocumento = datos.tipoDocumento;
      this.user.documento = datos.documento;
      this.user.email = datos.email;
      this.user.telefono = datos.telefono;
      this.user.role = datos.role;
      this.user.estado = 'Inactivo';
      this.user.password = datos.password;
      this.user.cartaLaboral = datos.cartaLaboral;
      this.adminService.eliminarAsesor(this.id, this.user).subscribe((datosSolic: ModeloUser) => {
        alert('Solicitud eliminada con éxito')
        this.router.navigate(["/admin/asesores"]);
      })
    })
  }
}
