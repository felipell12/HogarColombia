import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './template/footer/footer.component';
import { NavbarComponent } from './template/navbar/navbar.component';
import { ContentComponent } from './template/content/content.component';
import { ErrorComponent } from './template/error/error.component';
// Importanción manual del modulo
import {HttpClientModule} from '@angular/common/http';

// Adicionar componentes y modulos (HttpClienteModule)
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    ContentComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
