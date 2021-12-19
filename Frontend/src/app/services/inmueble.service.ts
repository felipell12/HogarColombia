import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloCiudad } from '../models/ciudad.modelo';
import { ModeloInmueble } from '../models/inmueble.modelo';
import { ModeloSolicitud } from '../models/solicitud.modelo';
import { ModeloTipoInmueble } from '../models/tipoInmueble.modelo';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {
  url = 'http://localhost:3000'
  token: string = '';

  constructor(private http: HttpClient, private seguridadServicio: SecurityService) {
    this.token = this.seguridadServicio.ObtenerToken();
  }

  obtenerInmueblesFiltro(estado: string | undefined): Observable<ModeloInmueble[]> {
    return this.http.get<ModeloInmueble[]>(`${this.url}/inmuebles?filter={"where":{"estado":"${estado}"}}`,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  obtenerInmueblesTodos(): Observable<ModeloInmueble[]> {
    return this.http.get<ModeloInmueble[]>(`${this.url}/inmuebles`,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  obtenerInmuebleId(id:string | undefined){
    return this.http.get<ModeloInmueble>(`${this.url}/inmuebles/${id}`,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }
  obtenerTipoInmueble(id: string | undefined): Observable<ModeloTipoInmueble> {
    return this.http.get<ModeloTipoInmueble>(`${this.url}/inmuebles/${id}/tipo-inmueble`,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  obtenerCiudad(id: string | undefined): Observable<ModeloCiudad> {
    return this.http.get<ModeloCiudad>(`${this.url}/inmuebles/${id}/ciudad`,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  obtenerCiudadId(id: string | undefined): Observable<ModeloCiudad> {
    return this.http.get<ModeloCiudad>(`${this.url}/ciudades/${id}`,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }
  solicitarInmueble(solicitud: ModeloSolicitud): Observable<ModeloSolicitud> {
    return this.http.post<ModeloSolicitud>(`${this.url}/solicitudes`, solicitud, {
       headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

}