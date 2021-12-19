import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloSolicitud } from 'src/app/models/solicitud.modelo';
import { PropertyService } from 'src/app/services/property.service';
import { ModeloUser } from 'src/app/models/user.modelo';
@Component({
  selector: 'app-find-solicitudes',
  templateUrl: './find-solicitudes.component.html',
  styleUrls: ['./find-solicitudes.component.css']
})
export class FindSolicitudesComponent implements OnInit {
  listadoSolicitudes: ModeloSolicitud[] = [];
  id:string=""
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private propertyService: PropertyService) { }

  ngOnInit(): void {
    this.id = this.ObtenerId();
    this.ObtenerListadoSolicitudes()
  }

  ObtenerListadoSolicitudes() {
    this.propertyService.ObtenerSolicitudesPorInmuebleId(this.id).subscribe((datos: ModeloSolicitud[]) => {
      this.listadoSolicitudes = datos;
      for (let item of this.listadoSolicitudes) {
        this.propertyService.ObtenerClientePorId(item.clienteId).subscribe((user: ModeloUser) => {
          item.clienteId=user.nombre
        });
      }
    });
  }

  ObtenerId() {
    var Id = "";
    if (this.activatedRoute.snapshot.paramMap.get('id') == null) {
      this.router.navigate(["/adviser/property-find-all"]);
    }
    else {
      Id = this.activatedRoute.snapshot.paramMap.get('id')!;
    }
    return Id;
  }
}
