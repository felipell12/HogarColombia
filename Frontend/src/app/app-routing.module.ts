import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsesoresComponent } from './modules/admin/asesores/asesores.component';
import { CiudadesComponent } from './modules/admin/ciudades/ciudades.component';
import { DepartamentosComponent } from './modules/admin/departamentos/departamentos.component';
import { NuevoDeptoComponent } from './modules/admin/nuevo-depto/nuevo-depto.component';
import { BuscarInmuebleComponent } from './modules/cliente/buscar-inmueble/buscar-inmueble.component';
import { BuscarSolicitudComponent } from './modules/cliente/buscar-solicitud/buscar-solicitud.component';
import { EliminarSolicitudComponent } from './modules/cliente/eliminar-solicitud/eliminar-solicitud.component';
import { ContentComponent } from './template/content/content.component';
import { ErrorComponent } from './template/error/error.component';

const routes: Routes = [
  {
    path: 'content',
    component: ContentComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: "/content"
  },
  {
    path: 'security',
    loadChildren: () => import("./modules/security/security.module").then(x => x.SecurityModule)
  },
  {
    path: 'management',
    loadChildren: () => import("./modules/management/management.module").then(x => x.ManagementModule)
  },
  {
    path: 'adviser',
    loadChildren: () => import("./modules/adviser/adviser.module").then(x => x.AdviserModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import("./modules/cliente/cliente.module").then(x => x.ClienteModule)
  },
  {path:'cliente/buscar-inmueble', component: BuscarInmuebleComponent},
  {path:'cliente/buscar-solicitud', component: BuscarSolicitudComponent},
  {path:'cliente/eliminar-solicitud', component: EliminarSolicitudComponent},
  {
    path: 'admin',
    loadChildren: () => import("./modules/admin/admin.module").then(x => x.AdminModule)
  },
  {path:'admin/asesores', component: AsesoresComponent},
  {path:'admin/ciudades', component: CiudadesComponent},
  {path:'admin/departamentos', component: DepartamentosComponent},
  {path:'admin/nuevo-depto', component: NuevoDeptoComponent},
  {path:'admin/eliminar-asesor', component: NuevoDeptoComponent},
  {
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
