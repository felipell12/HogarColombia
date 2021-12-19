import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindSolicitudesComponent } from './find-solicitudes/find-solicitudes.component';
import { PropertyCreateComponent } from './property-create/property-create.component';
import { PropertyDeleteComponent } from './property-delete/property-delete.component';
import { PropertyFindAllComponent } from './property-find-all/property-find-all.component';

const routes: Routes = [
  {
    path: 'property-create',
    component: PropertyCreateComponent
  },
  {
    path: 'property-find-all',
    component: PropertyFindAllComponent
  },
  {
    path: 'property-delete/:id',
    component: PropertyDeleteComponent
  },
  {
    path: 'find-solicitudes/:id',
    component: FindSolicitudesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdviserRoutingModule { }
