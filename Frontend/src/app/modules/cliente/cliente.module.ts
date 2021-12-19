import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { BuscarInmuebleComponent } from './buscar-inmueble/buscar-inmueble.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarSolicitudComponent } from './editar-solicitud/editar-solicitud.component';
import { BuscarSolicitudComponent } from './buscar-solicitud/buscar-solicitud.component';
import { EliminarSolicitudComponent } from './eliminar-solicitud/eliminar-solicitud.component';


@NgModule({
  declarations: [
    BuscarInmuebleComponent,
    EditarSolicitudComponent,
    BuscarSolicitudComponent,
    EliminarSolicitudComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClienteModule { }
