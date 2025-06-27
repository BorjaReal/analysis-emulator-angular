import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment.development';
import { Peticion } from '../interfaces/peticion.interface';
import { Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PeticionService {

  private urlPeticion: string =  `${environment.baseUrl}/peticion`

  peticionSelectedService? : Peticion

  private http = inject(HttpClient)

  public getPeticiones(): Observable<Peticion[]>{
    return this.http.get<Peticion[]>(this.urlPeticion);
  }

  public save(peticion: Peticion): Observable<HttpResponse<Peticion>>{
    return this.http.post<Peticion>(this.urlPeticion, peticion, { observe: 'response'})
  }

  public update(peticion: Peticion): Observable<HttpResponse<Peticion>> {
    return this.http.put<Peticion>(`${this.urlPeticion}/${peticion.peticionId}`, peticion, { observe: 'response' })
  }


  public deletePeticion(peticionId: number): Observable<HttpResponse<Peticion>>{
    return this.http.delete<Peticion>(`${this.urlPeticion}/${peticionId}`, { observe: 'response' })
    .pipe(tap(resp=> (console.log(resp))))
  }
}
