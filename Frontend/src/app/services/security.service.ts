import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { ModeloEmail } from '../models/email.modelo';
import { ModeloIdentificar } from '../models/identificar.modelo';
import { ModeloUser } from '../models/user.modelo';
import { ModeloWhoAmI } from '../models/whoAmI.modelo';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  url = 'http://[::1]:3000'
  datosUsuarioEnSesion = new BehaviorSubject<ModeloIdentificar>(new ModeloIdentificar())
  token: string = '';
  rol: string = '';
  // Agregar al constructor private http: HttpClient
  constructor(private http: HttpClient) { 
    this.VerificarSesionActual();
    this.token = this.ObtenerToken();
    this.rol = this.ObtenerRol();
  }

  Identificar(email: string, password: string): Observable<ModeloIdentificar> {
    return this.http.post<ModeloIdentificar>(`${this.url}/users/login`,{
      email: email,
      password: password
    },{
      headers: new HttpHeaders({})
    })
  }

  ValidaCorreoExistente(email: string): Observable<ModeloEmail>{
    return this.http.get<ModeloEmail>(`${this.url}/users?filter={"where":{"email":"${email}"}}`)
  }

  RegistrarCliente(cliente: ModeloUser): Observable<ModeloUser> {
    return this.http.post<ModeloUser>(`${this.url}/signup`,cliente,{
      headers: new HttpHeaders({
        // 'Authorization': `Bearer ${this.token}`
      })
    })
  }

  BuscarPorEmail(email: string): Observable<ModeloUser> {
    return this.http.get<ModeloUser>(`${this.url}/users/email?filter={"where":{"email":"${email}"}}`)
  }

  Recuperarme(): Observable<ModeloUser> {
    this.token = this.ObtenerToken();
    return this.http.get<ModeloUser>(`${this.url}/users/me`,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }



  CambiarClave(user: ModeloUser): Observable<ModeloUser>{
    return this.http.patch<ModeloUser>(`${this.url}/user/${user.id}`,user,{
      headers: new HttpHeaders({
        // 'Authorization': `Bearer ${this.token}`
      })
    })
  }

  AlmacenarSesion(datos: ModeloIdentificar){
    datos.identificado = true;
    let stringDatos = JSON.stringify(datos);
    localStorage.setItem("datosSesion",stringDatos);
    this.RefrescarDatosSesion(datos);
  }

  ObtenerToken(){
    let datosString = localStorage.getItem("datosSesion");
    if (datosString){
      let datos = JSON.parse(datosString);
      return datos.token;
    }else{
      return '';
    }
  }

  ObtenerRol(){
    let datosString = localStorage.getItem("datosSesion");
    if (datosString){
      let datos = JSON.parse(datosString);
      return datos.rol;
    }else{
      return '';
    }
  }
  
  ObtenerInformacionSesion(){
    let datosString = localStorage.getItem("datosSesion");
    if (datosString){
      let datos = JSON.parse(datosString);
      return datos;
    }else{
      return '';
    }
  }

  EliminarInformacionSesion(){
    localStorage.removeItem("datosSesion");
    this.RefrescarDatosSesion(new ModeloIdentificar());
  }

  SesionIniciadad(){
    let datosString = localStorage.getItem("datosSesion");
    return datosString;
  }

  VerificarSesionActual(){
    let datos = this.ObtenerInformacionSesion();
    if (datos) {
      this.RefrescarDatosSesion(datos);
    }
  }

  RefrescarDatosSesion(datos: ModeloIdentificar){
    this.datosUsuarioEnSesion.next(datos);
  }

  ObtenerDatosUsuarioEnSesion(){
    this.rol = this.ObtenerRol();

    return this.datosUsuarioEnSesion.asObservable();
  }

  whoAmI(): Observable<ModeloWhoAmI> {
    this.token = this.ObtenerToken();
    return this.http.get(`${this.url}/whoAmI`,
    {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type':'application/json',
      }),responseType: "text" as 'json' 
    }
    )
  }
}