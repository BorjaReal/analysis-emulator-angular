import { inject, Injectable } from '@angular/core';
import { AnalitoTipo } from '../interfaces/analito-tipo.interface';
import { environment } from '../../../environment/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AnalitoTipoService {

  private urlAnalito: string = `${environment.baseUrl}/analito`

    private http = inject(HttpClient);

    public findAll(): Observable<AnalitoTipo[]> {
      return this.http.get<AnalitoTipo[]>(this.urlAnalito);
    }
}
