import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloCiudad } from '../models/ciudad.modelo';
import { ModeloDepartamento } from '../models/departamento.modelo';
import { ModeloInmueble } from '../models/inmueble.modelo';
import { ModeloSolicitud } from '../models/solicitud.modelo';
import { ModeloTipoInmueble } from '../models/tipoInmueble.modelo';
import { ModeloUser } from '../models/user.modelo';
import { ModeloWhoAmI } from '../models/whoAmI.modelo';
import { SecurityService } from './security.service';
/*********************************************************************************************************/
@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  url: string = "http://[::1]:3000";
  token: string = "";
  /*********************************************************************************************************/
  constructor(private http: HttpClient, private securityService: SecurityService) {
    this.token = this.securityService.ObtenerToken();
  }
  /*********************************************************************************************************/
  CrearInmueble(Inmueble: ModeloInmueble): Observable<ModeloInmueble> {
    return this.http.post<ModeloInmueble>(`${this.url}/inmuebles`, Inmueble, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }
  ObtenerInmueblePorId(inmuebleid?: string): Observable<ModeloInmueble> {
    return this.http.get<ModeloInmueble>(`${this.url}/inmuebles/${inmuebleid}`,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }
  ActualizarInmueble(inmueble: ModeloInmueble): Observable<ModeloInmueble> {
    return this.http.patch<ModeloInmueble>(`${this.url}/inmuebles/${inmueble.id}`, inmueble, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }
  ObtenerCiudadPorId(ciudadid?: string): Observable<ModeloCiudad> {
    return this.http.get<ModeloCiudad>(`${this.url}/ciudades/${ciudadid}`,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }
  ObtenerClientePorId(clienteid?: string): Observable<ModeloUser> {
    return this.http.get<ModeloUser>(`${this.url}/users/${clienteid}`,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }
  ObtenerDepartamentoPorCiudad(departamentoid?: string): Observable<ModeloDepartamento> {
    return this.http.get<ModeloDepartamento>(`${this.url}/ciudads/${departamentoid}/departamento`,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }
  ObtenerDepartamentos(): Observable<ModeloDepartamento[]> {
    return this.http.get<ModeloDepartamento[]>(`${this.url}/departamentos`,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }
  ObtenerCiudadesPorDepartamento(departamentoid?: string): Observable<ModeloCiudad[]> {
    return this.http.get<ModeloCiudad[]>(`${this.url}/departamentos/${departamentoid}/ciudads`,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }
  ObtenerTiposDeInmueblePorId(tipoinmuebleid?: string): Observable<ModeloTipoInmueble> {
    return this.http.get<ModeloTipoInmueble>(`${this.url}/tipo-inmuebles/${tipoinmuebleid}`,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }
  ObtenerInmueblesFiltro(asesorId: string | undefined, estado: string): Observable<ModeloInmueble[]> {
    return this.http.get<ModeloInmueble[]>(`${this.url}/inmuebles?filter={"where":{"asesorId":"${asesorId}","estado":"${estado}"}}`,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }
  ObtenerSolicitudesPorInmuebleId(InmuebleId?: string): Observable<ModeloSolicitud[]> {
    return this.http.get<ModeloSolicitud[]>(`${this.url}/solicitudes?filter={"where":{"inmuebleId":"${InmuebleId}"}}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }
  ObtenerTipoInmueble(): Observable<ModeloTipoInmueble[]> {
    this.token = this.securityService.ObtenerToken();
    return this.http.get<ModeloTipoInmueble[]>(`${this.url}/tipo-inmuebles`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }
  whoAmI(): Observable<ModeloWhoAmI> {
    this.token = this.securityService.ObtenerToken();
    return this.http.get(`${this.url}/whoAmI`,
      {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        }), responseType: "text" as 'json'
      }
    )
  }
  /*********************************************************************************************************/
}
