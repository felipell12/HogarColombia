import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModeloIdentificar } from 'src/app/models/identificar.modelo';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  SesionIniciada: boolean = false;
  subs: Subscription = new Subscription();
  rol: string = '';
  SesionCliente: boolean = false;
  router: any;
  SesionAdmin: boolean = false;
  SesionAdviser: boolean = false;

  constructor(private seguridadServicio: SecurityService) { }

  ngOnInit(): void {
    this.subs = this.seguridadServicio.ObtenerDatosUsuarioEnSesion().subscribe((datos: ModeloIdentificar) => {
      this.SesionIniciada = datos.identificado;
      if (this.SesionIniciada) {
        let datosString = localStorage.getItem("datosSesion");
        if (datosString) {
          let datos = JSON.parse(datosString);
          if (datos.rol == 'Client') { this.SesionCliente = true; }
          else if (datos.rol == 'Admin') { this.SesionAdmin = true }
          else if (datos.rol == 'Adviser') { this.SesionAdviser = true }
        }
      }
      else{
        this.SesionCliente = false;
        this.SesionAdmin = false; 
        this.SesionAdviser = false
      }
    });
  }
  
}