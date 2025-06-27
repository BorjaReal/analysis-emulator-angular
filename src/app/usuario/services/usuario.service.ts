import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface'
import { Observable, of } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService{

  private urlUsuario: string =  `${environment.baseUrl}/usuario`
  constructor(private http: HttpClient) { }

  public findAll(): Observable<Usuario[]> {
    //return of(this.usuarios);
    return this.http.get<Usuario[]>(this.urlUsuario);
  }

  public save(usuario: Usuario): Observable<HttpResponse<Usuario>> {
    return this.http.post<Usuario>(this.urlUsuario, usuario, { observe: 'response' });
  }

  public update(usuario: Usuario): Observable<HttpResponse<Usuario>> {
    return this.http.put<Usuario>(`${this.urlUsuario}/${usuario.usuarioId}`, usuario, { observe: 'response' });
  }

  public delete(id: number): Observable<HttpResponse<Usuario>> {
    return this.http.delete<Usuario>(`${this.urlUsuario}/${id}`, { observe: 'response' });
  }
}
