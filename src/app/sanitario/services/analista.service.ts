import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment.development';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Analista } from '../interfaces/analista.interface';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AnalistaService {

  private urlAnalista: string =  `${environment.baseUrl}/analista`

  http = inject(HttpClient);

  public findAll(): Observable<Analista[]> {
    return this.http.get<Analista[]>(this.urlAnalista);
  }

  public save(analista: Analista): Observable<HttpResponse<Analista>> {
    return this.http.post<Analista>(this.urlAnalista, analista, { observe: 'response' });
  }

  public update(analista: Analista): Observable<HttpResponse<Analista>> {
    return this.http.put<Analista>(`${this.urlAnalista}/${analista.usuarioId}`, analista, { observe: 'response' });
  }

  public delete(id: number): Observable<HttpResponse<Analista>> {
    return this.http.delete<Analista>(`${this.urlAnalista}/${id}`, { observe: 'response' });
  }

}
