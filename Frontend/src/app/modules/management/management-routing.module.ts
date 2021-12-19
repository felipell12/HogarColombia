import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserFindComponent } from './user-find/user-find.component';

const routes: Routes = [
  {
    path: 'user-create',
    component: UserCreateComponent 
  },
  {
    path: 'user-delete',
    component: UserDeleteComponent
  },
  {
    path: 'user-edit',
    component: UserEditComponent
  },
  {
    path: 'user-find',
    component: UserFindComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
