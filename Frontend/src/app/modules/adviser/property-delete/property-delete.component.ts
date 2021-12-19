import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModeloInmueble } from 'src/app/models/inmueble.modelo';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-property-delete',
  templateUrl: './property-delete.component.html',
  styleUrls: ['./property-delete.component.css']
})
export class PropertyDeleteComponent implements OnInit {
  Inmueble: ModeloInmueble = {};
  id: string = "";

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private propertyService: PropertyService) {
  }

  ngOnInit(): void {
    this.id = this.ObtenerId();
    this.Alerta();
  }

  Alerta() {
    var opcion = confirm("Desea eliminar inmueble Aceptar o Cancelar");
    if (opcion == true) {
      this.ObtenerInmueblePorId(this.id);
    } else {
      this.router.navigate(["/adviser/property-find-all"]);
    }
  }

  ObtenerInmueblePorId(inmuebleid?: string) {
    this.propertyService.ObtenerInmueblePorId(inmuebleid).subscribe(
      (datos: ModeloInmueble) => {
        this.Inmueble = datos;
        this.Inmueble.estado = "Inactivo"
        this.propertyService.ActualizarInmueble(this.Inmueble).subscribe(
          (datos: ModeloInmueble) => {
            this.router.navigate(["/adviser/property-find-all"]);
          }
        );
      }
    );
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
