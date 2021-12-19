import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloCiudad } from 'src/app/models/ciudad.modelo';
import { ModeloDepartamento } from 'src/app/models/departamento.modelo';
import { ModeloInmueble } from 'src/app/models/inmueble.modelo';
import { ModeloTipoInmueble } from 'src/app/models/tipoInmueble.modelo';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-property-create',
  templateUrl: './property-create.component.html',
  styleUrls: ['./property-create.component.css']
})

export class PropertyCreateComponent implements OnInit {

  listaDepartamentos: ModeloDepartamento[] = [];
  listaCiudades: ModeloCiudad[] = [];
  listatipoInmueble: ModeloTipoInmueble[] = [];
  Ciudad: ModeloCiudad = {};
  TipoInmueble: ModeloTipoInmueble = {};
  IdAsesor: string = "";
  TipoOferta: string = ""

  fgValidador: FormGroup = this.fb.group({
    'nombre': ['', [Validators.required]],
    'valor': ['', [Validators.required]],
    'foto': ['', [Validators.required]],
    'video': ['', [Validators.required]],
    'contactoEncargado': ['', [Validators.required]],
    'tipoInmuebleId': ['', [Validators.required]],
    'direccion': ['', [Validators.required]],
    'ciudadId': ['', [Validators.required]],
    'tipoOferta': ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
    private servicioProperty: PropertyService,
    private router: Router) { }

  ngOnInit(): void {
    this.ObtenerDepartamentos();
    this.EventoSeleccionarDepartamento();
    this.ObtenerlistadoTipoInmueble();
    this.EventoSeleccionarTipoInmueble();
    this.EventoSeleccionarTipoOferta();
  }

  GuardarProperty() {
    this.servicioProperty.whoAmI().subscribe((datos: any) => {
      this.IdAsesor = datos
      let nombre = this.fgValidador.controls["nombre"].value;
      let valor = parseInt(this.fgValidador.controls["valor"].value);
      let foto = this.fgValidador.controls["foto"].value;
      let video = this.fgValidador.controls["video"].value;
      let contactoEncargado = this.fgValidador.controls["contactoEncargado"].value;
      let direccion = this.fgValidador.controls["direccion"].value;
      let tipoOferta = this.fgValidador.controls["tipoOferta"].value;
      let ciudadId = this.fgValidador.controls["ciudadId"].value;
      let tipoInmuebleId = this.fgValidador.controls["tipoInmuebleId"].value;
      let i = new ModeloInmueble();
      i.nombreEncargado = nombre;
      i.valor = valor;
      i.foto = foto;
      i.estado = "Activo";
      i.video = video;
      i.asesorId = this.IdAsesor;
      i.contactoEncargado = contactoEncargado;
      i.tipoInmuebleId = tipoInmuebleId;
      i.tipoInmuebleId = this.TipoInmueble.id;
      i.ciudadId = ciudadId.id;
      i.ciudadId = this.Ciudad.id;
      i.direccion = direccion;
      i.tipoOferta = tipoOferta;
      i.tipoOferta = this.TipoOferta;
      this.servicioProperty.CrearInmueble(i).subscribe((datos: ModeloInmueble) => {
        alert("property almacenado correctamente");
        this.router.navigate(["/adviser/property-find-all"]);
      }, (error: any) => {
        alert("Error almacenando el property");
      })
    })
  }

  ObtenerDepartamentos() {
    this.servicioProperty.ObtenerDepartamentos().subscribe((datos: ModeloDepartamento[]) => {
      this.listaDepartamentos = datos;
    });
  }

  ObtenerCiudadesPorDepartamentos(departamentoid?: string) {
    this.servicioProperty.ObtenerCiudadesPorDepartamento(departamentoid).subscribe((datos: ModeloCiudad[]) => {
      this.listaCiudades = datos;
    });
  }

  ObtenerCiudad(ciudadid?: string) {
    this.servicioProperty.ObtenerCiudadPorId(ciudadid).subscribe((datos: ModeloCiudad) => {
      this.Ciudad = datos;
    });
  }

  ObtenerlistadoTipoInmueble() {
    this.servicioProperty.ObtenerTipoInmueble().subscribe((datos: ModeloTipoInmueble[]) => {
      this.listatipoInmueble = datos;
      this.TipoInmueble = this.listatipoInmueble[0]
    });
  }
  ObtenerTiposDeInmueblePorId(id?: string) {
    this.servicioProperty.ObtenerTiposDeInmueblePorId(id).subscribe((datos: ModeloTipoInmueble) => {
      this.TipoInmueble = datos;
    });
  }

  EventoSeleccionarDepartamento() {
    var SelectElement = document.querySelector('.form-select1');
    if (SelectElement == null) {
      alert("no ha seleccionado departamento");
    }
    else {
      SelectElement.addEventListener('change', (event) => {
        var element = document.getElementById("SeleccionarDepartamento") as HTMLSelectElement;
        this.ObtenerCiudadesPorDepartamentos(this.listaDepartamentos[element.selectedIndex - 1].id);
        this.EventoSeleccionarCiudad();
      }
      );
    }
  }

  EventoSeleccionarCiudad() {
    var SelectElement = document.querySelector('.form-select2');
    if (SelectElement == null) {
      alert("no ha seleccionado ciudad");
    }
    else {
      SelectElement.addEventListener('change', (event) => {
        var element = document.getElementById("SeleccionarCiudad") as HTMLSelectElement;
        this.ObtenerCiudad(this.listaCiudades[element.selectedIndex - 1].id);
      }
      );
    }
  }

  EventoSeleccionarTipoInmueble() {
    var SelectElement = document.querySelector('.form-select4');
    if (SelectElement == null) {
      alert("no ha seleccionado tipo de inmueble");
    }
    else {
      SelectElement.addEventListener('change', (event) => {
        var element = document.getElementById("SeleccionarTipoInmueble") as HTMLSelectElement;
        this.ObtenerTiposDeInmueblePorId(this.listatipoInmueble[element.selectedIndex - 1].id);
      }
      );
    }
  }

  EventoSeleccionarTipoOferta() {
    var SelectElement = document.querySelector('.form-select3');
    if (SelectElement == null) {
      alert("no ha seleccionado tipo de oferta");
    }
    else {
      SelectElement.addEventListener('change', (event) => {
        var element = document.getElementById("SeleccionarOferta") as HTMLSelectElement;
        if (element.value == "1") {
          this.TipoOferta = "Venta"
        }
        else {
          this.TipoOferta = "Alquiler"
        }
      });
    }
  }
}

