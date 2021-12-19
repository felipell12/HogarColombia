import { Component, OnInit } from '@angular/core';
import { ModeloCiudad } from 'src/app/models/ciudad.modelo';
import { ModeloInmueble } from 'src/app/models/inmueble.modelo';
import { ModeloListaSolicitud } from 'src/app/models/listaSolicitud.modelo';
import { ModeloSolicitud } from 'src/app/models/solicitud.modelo';
import { ModeloTipoInmueble } from 'src/app/models/tipoInmueble.modelo';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { SecurityService } from 'src/app/services/security.service';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-buscar-solicitud',
  templateUrl: './buscar-solicitud.component.html',
  styleUrls: ['./buscar-solicitud.component.css']
})
export class BuscarSolicitudComponent implements OnInit {
  listaSolicitudes: ModeloSolicitud[] = []
  listaCompleta: ModeloListaSolicitud[] = []
  idUsuario?: string = "";
  solicitud: ModeloSolicitud = new ModeloSolicitud();

  constructor(private solicitudService: SolicitudService, private securityService: SecurityService, 
    private inmuebleService: InmuebleService) { }

  ngOnInit(): void {
    this.obtenerListadoSolicitudes();
  }

  obtenerListadoSolicitudes() {
    this.securityService.whoAmI().subscribe((id: any) => {
      this.idUsuario = id;
      this.solicitudService.obtenerSolicitudesUsuario(this.idUsuario).subscribe((dSolicitud: ModeloListaSolicitud[]) => {
        this.listaSolicitudes = dSolicitud;
        if (this.listaSolicitudes != null) {
          for (let i of this.listaSolicitudes) {

            let mostrarB1 = false;//Eliminar
            let mostrarB2 = false;//Descargar y Adjuntar Contrato
            let mostrarB3 = false;//Ver comentarios
            let mostrarB4 = false;//Ver contrato
            let mostrarB5 = true;//Filtro lista

            if (i.estado === 'Enviado') { mostrarB1 = true }
            else if (i.estado === 'Aceptado') { mostrarB2 = true}
            else if (i.estado === 'Rechazado') { mostrarB3 = true }
            else if (i.estado === 'Inactivo' || i.estado === 'Alquilado' || i.estado === 'Comprado') { mostrarB5 = false }


            this.inmuebleService.obtenerInmuebleId(i.inmuebleId).subscribe((inmueble: ModeloInmueble) => {
              this.inmuebleService.obtenerCiudad(inmueble.id).subscribe((city: ModeloCiudad) => {
                this.inmuebleService.obtenerTipoInmueble(inmueble.id).subscribe((tipo: ModeloTipoInmueble) => {
                  let lista = [{
                    id: i.id,
                    foto: inmueble.foto,
                    estado: i.estado,
                    tipoOferta: inmueble.tipoOferta,
                    ciudad: city.nombre,
                    direccion: inmueble.direccion,
                    tipoInmueble: tipo.nombre,
                    valor: inmueble.valor,
                    comentarios: i.comentarios,
                    contrato: i.contrato,
                    boton1: mostrarB1,
                    boton2: mostrarB2,
                    boton3: mostrarB3,
                    boton4: mostrarB4,
                    boton5: mostrarB5
                  }]
                  this.listaCompleta.push(lista[0])
                });
              });
            });
          }
        }
      });
    });
  }

  eliminarSolicitud(id: string | undefined) {
    console.log('Entro en metodo boton')
    this.solicitudService.obtenerSolicitudId(id).subscribe((datos: ModeloSolicitud) => {
      this.solicitud.id = id
      this.solicitud.fecha = datos.fecha
      this.solicitud.estado = 'Inactivo'
      this.solicitud.comentarios = datos.comentarios
      this.solicitud.contrato = datos.contrato
      this.solicitud.inmuebleId = datos.inmuebleId
      this.solicitud.clienteId = datos.clienteId;
      this.solicitudService.eliminarSolicitud(id, this.solicitud).subscribe((datosSolic: ModeloSolicitud) => {
        alert('Solicitud eliminada con éxito')
      })
    })
  }

}

