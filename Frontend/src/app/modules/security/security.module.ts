import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { LoginComponent } from './login/login.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignOffComponent } from './sign-off/sign-off.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    LoginComponent,
    PasswordChangeComponent,
    PasswordRecoveryComponent,
    SignOffComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SecurityModule { }