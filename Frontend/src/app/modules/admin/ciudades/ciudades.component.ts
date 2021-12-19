import { Component, OnInit } from '@angular/core';
import { ModeloCiudad } from 'src/app/models/ciudad.modelo';
import { ModeloDepartamento } from 'src/app/models/departamento.modelo';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styleUrls: ['./ciudades.component.css']
})
export class CiudadesComponent implements OnInit {

  lista: ModeloCiudad[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.listar()
  }

  listar(){
    this.adminService.ciudades().subscribe((datos: ModeloCiudad[])=>{
      this.lista = datos;
      for(let item of this.lista){
        this.adminService.departamentoId(item.id).subscribe((ciudad:ModeloDepartamento)=>{
          item.departamentoId = ciudad.nombre
          console.log(item.departamentoId)
        });
      }
    })
  }
}