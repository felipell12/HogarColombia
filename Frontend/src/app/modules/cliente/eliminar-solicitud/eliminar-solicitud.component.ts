import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloSolicitud } from 'src/app/models/solicitud.modelo';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-eliminar-solicitud',
  templateUrl: './eliminar-solicitud.component.html',
  styleUrls: ['./eliminar-solicitud.component.css']
})
export class EliminarSolicitudComponent implements OnInit {
  id?: string;
  solicitud: ModeloSolicitud  = new ModeloSolicitud();

  constructor(private router: Router, private solicitudService: SolicitudService, private activatedRoute: ActivatedRoute) {

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
  
  eliminarSolicitud() {
    console.log('Entro en metodo boton')
    this.solicitudService.obtenerSolicitudId(this.id).subscribe((datos: ModeloSolicitud) => {
      this.solicitud.id = this.id
      this.solicitud.fecha = datos.fecha
      this.solicitud.estado = 'Inactivo'
      this.solicitud.comentarios = datos.comentarios
      this.solicitud.contrato = datos.contrato
      this.solicitud.inmuebleId = datos.inmuebleId
      this.solicitud.clienteId = datos.clienteId;
      this.solicitudService.eliminarSolicitud(this.id, this.solicitud).subscribe((datosSolic: ModeloSolicitud) => {
        alert('Solicitud eliminada con éxito')
        this.router.navigate(["/cliente/buscar-solicitud"]);
      })
    })
  }

}
