import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloCiudad } from '../models/ciudad.modelo';
import { ModeloDepartamento } from '../models/departamento.modelo';
import { ModeloUser } from '../models/user.modelo';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url = 'http://localhost:3000'
  token: string = '';

  constructor(private http: HttpClient, private securityService: SecurityService) {
    this.token = this.securityService.ObtenerToken()
  }

  departamentos(): Observable<ModeloDepartamento[]> {
    return this.http.get<ModeloDepartamento[]>(`${this.url}/departamentos`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }
  departamentoId(id: string | undefined): Observable<ModeloDepartamento> {
    return this.http.get<ModeloDepartamento>(`${this.url}/ciudads/${id}/departamento`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  ciudades(): Observable<ModeloCiudad[]> {
    return this.http.get<ModeloCiudad[]>(`${this.url}/ciudades`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  asesores(): Observable<ModeloUser[]> {
    return this.http.get<ModeloUser[]>(`${this.url}/usersAll?filter={"where":{"role":"Adviser"}}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  crearDpto(dpto: ModeloDepartamento): Observable<ModeloDepartamento> {
    //alert(j dpto)
    return this.http.post<ModeloDepartamento>(`${this.url}/departamentos`, dpto, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  obtenerAsesor(id: string | undefined):Observable<ModeloUser>{
    return this.http.get<ModeloUser>(`${this.url}/users/${id}`)
  }
  
  eliminarAsesor(id: string | undefined, user: ModeloUser): Observable<ModeloUser> {
    return this.http.patch<ModeloUser>(`${this.url}/user/${id}`, user, {
      headers: new HttpHeaders({ })
    })
  }
}
