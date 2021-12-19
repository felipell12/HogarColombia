import { Component, OnInit } from '@angular/core';
import { ModeloInmueble } from 'src/app/models/inmueble.modelo';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { ModeloCiudad } from 'src/app/models/ciudad.modelo';
import { ModeloTipoInmueble } from 'src/app/models/tipoInmueble.modelo';
import { SecurityService } from 'src/app/services/security.service';
import { ModeloSolicitud } from 'src/app/models/solicitud.modelo';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-buscar-inmueble',
  templateUrl: './buscar-inmueble.component.html',
  styleUrls: ['./buscar-inmueble.component.css']
})
export class BuscarInmuebleComponent implements OnInit {

  listaInmuebles: ModeloInmueble[] = [];
  idUsuario?: string = "";
  solicitud: ModeloSolicitud = new ModeloSolicitud();


  constructor(private inmuebleServico: InmuebleService, private securityService: SecurityService) { }

  ngOnInit(): void {
    this.obtenerListadoInmuebles();
  }

  obtenerListadoInmuebles() {
    this.inmuebleServico.obtenerInmueblesFiltro('Activo').subscribe((datos: ModeloInmueble[]) => {
      this.listaInmuebles = datos;
      if (this.listaInmuebles != null) {
        for (let item of this.listaInmuebles) {
          this.inmuebleServico.obtenerTipoInmueble(item.id).subscribe((tipo: ModeloTipoInmueble) => {
            item.tipoInmuebleId = tipo.nombre;
          });
          this.inmuebleServico.obtenerCiudad(item.id).subscribe((tipo: ModeloCiudad) => {
            item.ciudadId = tipo.nombre;
          });
        }
      }
    })

  }

  solicitar(id: string | undefined) {
    this.securityService.whoAmI().subscribe((datos: any) => {
      this.idUsuario = datos
      let now = new Date().toString();
      this.solicitud.fecha = formatDate(now, "yyyy-MM-ddThh:mm:ssZ", 'en-us')
      this.solicitud.inmuebleId = id;
      this.solicitud.clienteId = this.idUsuario;
      this.solicitud.estado = 'Enviado'
      this.solicitud.comentarios = ''
      this.solicitud.contrato = ''
      this.inmuebleServico.solicitarInmueble(this.solicitud).subscribe((datos: ModeloSolicitud) => {
        alert('Solicitud Enviada');
      });
      // this.boton_pulsado = !this.boton_pulsado;
    }, (error: any) => {
      alert(error.message)
    });

  }
}
