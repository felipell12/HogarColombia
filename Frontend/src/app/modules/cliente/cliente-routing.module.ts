import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarInmuebleComponent } from './buscar-inmueble/buscar-inmueble.component';
import { EliminarSolicitudComponent } from './eliminar-solicitud/eliminar-solicitud.component';

const routes: Routes = [
  {
    path: 'buscar-inmueble',
    component: BuscarInmuebleComponent
  },
  {
    path: 'listar-inmuebles',
    component: BuscarInmuebleComponent
  },
  
  {
    path: 'eliminar-solicitud/:id',
    component: EliminarSolicitudComponent
  },
  {
    path: 'eliminar-solicitud',
    component: EliminarSolicitudComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
