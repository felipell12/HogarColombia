import { Component, OnInit } from '@angular/core';
import { ModeloDepartamento } from 'src/app/models/departamento.modelo';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {
 
  listaDep: ModeloDepartamento[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.listar()
  }

  listar(){
    this.adminService.departamentos().subscribe((datos: ModeloDepartamento[])=>{
      this.listaDep = datos;
    })
  }
}
