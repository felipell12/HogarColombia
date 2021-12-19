import { Component, OnInit } from '@angular/core';
import { ModeloCiudad} from 'src/app/models/ciudad.modelo';
import { ModeloDepartamento} from 'src/app/models/departamento.modelo';
import { ModeloInmueble } from 'src/app/models/inmueble.modelo';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-property-find-all',
  templateUrl: './property-find-all.component.html',
  styleUrls: ['./property-find-all.component.css']
})
export class PropertyFindAllComponent implements OnInit {
  listadoInmuebles: ModeloInmueble[] = [];
  AsesorId: string = "";
  Estado: string = "Activo";

  constructor(private propertyservice: PropertyService) { }

  ngOnInit(): void {
    this.ObtenerListadoInmuebles() 
    this.EventoSeleccionarEstado();
  }

  ObtenerListadoInmuebles() {
    this.propertyservice.whoAmI().subscribe((datos: any) => {
      this.AsesorId = datos
      this.propertyservice.ObtenerInmueblesFiltro(this.AsesorId, this.Estado).subscribe((datos: ModeloInmueble[]) => {
        this.listadoInmuebles = datos;
        for (let item of this.listadoInmuebles) {
          this.propertyservice.ObtenerCiudadPorId(item.ciudadId).subscribe((city: ModeloCiudad) => {
            item.ciudadId = city.nombre;
          });
          this.propertyservice.ObtenerDepartamentoPorCiudad(item.ciudadId).subscribe((Department: ModeloDepartamento) => {
            item.contactoEncargado = Department.nombre;
          });
        }
      });
    });
  }

  EventoSeleccionarEstado() {
    var selectElement3 = document.querySelector('.form-select5');
    if (selectElement3 == null) {
      alert("no ha seleccionado tipo de inmueble");
    }
    else {
      selectElement3.addEventListener('change', (event) => {
        var id4 = document.getElementById("Seleccionarestado") as HTMLSelectElement;
        if (id4.value == "2") {
          this.Estado = "Inactivo"
        }
        else {
          this.Estado = "Activo"
        }
        this.ObtenerListadoInmuebles()
      });
    }
  }

}
