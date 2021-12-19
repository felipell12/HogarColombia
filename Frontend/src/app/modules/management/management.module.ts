import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { UserFindComponent } from './user-find/user-find.component';
import { UserCreateComponent } from './user-create/user-create.component';


@NgModule({
  declarations: [
    UserEditComponent,
    UserDeleteComponent,
    UserFindComponent,
    UserCreateComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule
  ]
})
export class ManagementModule { }
