import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualizarDptoComponent } from './actualizar-dpto/actualizar-dpto.component';
import { AsesoresComponent } from './asesores/asesores.component';
import { CiudadesComponent } from './ciudades/ciudades.component';
import { DepartamentosComponent } from './departamentos/departamentos.component';
import { EliminarAsesorComponent } from './eliminar-asesor/eliminar-asesor.component';
import { NuevoAsesorComponent } from './nuevo-asesor/nuevo-asesor.component';
import { NuevoDeptoComponent } from './nuevo-depto/nuevo-depto.component';

const routes: Routes = [
  {
    path: 'actualizar-dpto',
    component: ActualizarDptoComponent 
  },
  {
    path: 'asesores',
    component: AsesoresComponent 
  },
  {
    path: 'ciudades',
    component: CiudadesComponent 
  },
  {
    path: 'departamentos',
    component: DepartamentosComponent 
  },
  {
    path: 'nuevo-asesor',
    component: NuevoAsesorComponent 
  },
  {
    path: 'nuevo-depto',
    component: NuevoDeptoComponent 
  },
  
  {
    path: 'eliminar-asesor/:id',
    component: EliminarAsesorComponent
  },
  {
    path: 'eliminar-asesor',
    component: EliminarAsesorComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
