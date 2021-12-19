import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { SignOffComponent } from './sign-off/sign-off.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: 'password-change',
    component: PasswordChangeComponent 
  },
  {
    path: 'password-recovery',
    component: PasswordRecoveryComponent 
  },
  {
    path: 'login',
    component: LoginComponent 
  },
  {
    path: "sign-off",
    component: SignOffComponent
  },
  {
    path: "signup",
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
