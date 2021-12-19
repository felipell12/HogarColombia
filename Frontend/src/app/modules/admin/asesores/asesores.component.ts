import { Component, OnInit } from '@angular/core';
import { ModeloUser } from 'src/app/models/user.modelo';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-asesores',
  templateUrl: './asesores.component.html',
  styleUrls: ['./asesores.component.css']
})
export class AsesoresComponent implements OnInit {

  lista: ModeloUser[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.listar()
  }

  listar(){
    this.adminService.asesores().subscribe((datos: ModeloUser[])=>{
      this.lista = datos
    })
  }

  

}