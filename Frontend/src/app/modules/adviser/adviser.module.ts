import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdviserRoutingModule } from './adviser-routing.module';
import { PropertyCreateComponent } from './property-create/property-create.component';
import { PropertyDeleteComponent } from './property-delete/property-delete.component';
import { PropertyFindAllComponent } from './property-find-all/property-find-all.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FindSolicitudesComponent } from './find-solicitudes/find-solicitudes.component';

@NgModule({
  declarations: [
    PropertyCreateComponent,
    PropertyDeleteComponent,
    PropertyFindAllComponent,
    FindSolicitudesComponent
  ],
  imports: [
    CommonModule,
    AdviserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdviserModule { }
