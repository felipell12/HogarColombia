import { Component, OnInit } from '@angular/core';
import { ModeloCiudad } from 'src/app/models/ciudad.modelo';
import { ModeloInmueble } from 'src/app/models/inmueble.modelo';
import { ModeloTipoInmueble } from 'src/app/models/tipoInmueble.modelo';
import { InmuebleService } from 'src/app/services/inmueble.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  listaInmuebles: ModeloInmueble[] = [];

  constructor(private inmuebleServico: InmuebleService) { }

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
}
