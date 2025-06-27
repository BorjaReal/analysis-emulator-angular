import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment.development';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Medico } from '../interfaces/medico.interface';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class MedicoService {

  private urlMedico: string =  `${environment.baseUrl}/medico`

  http = inject(HttpClient);

  public findAll(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.urlMedico);
  }

  public save(analista: Medico): Observable<HttpResponse<Medico>> {
    return this.http.post<Medico>(this.urlMedico, analista, { observe: 'response' });
  }

  public update(analista: Medico): Observable<HttpResponse<Medico>> {
    return this.http.put<Medico>(`${this.urlMedico}/${analista.usuarioId}`, analista, { observe: 'response' });
  }

  public delete(id: number): Observable<HttpResponse<Medico>> {
    return this.http.delete<Medico>(`${this.urlMedico}/${id}`, { observe: 'response' });
  }
}
