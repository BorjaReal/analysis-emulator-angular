import { computed, inject, Injectable, signal, OnInit } from '@angular/core';
import { Usuario } from '../../usuario/interfaces/usuario.interface';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environment/environment.development';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Medico } from '../../sanitario/interfaces/medico.interface';
import { Analista } from '../../sanitario/interfaces/analista.interface';

type AuthStatus = 'chequeando' | 'autenticado' | 'no-autenticado';

@Injectable({providedIn: 'root'})
export class AuthService {


  private _authStatus = signal<AuthStatus>('chequeando')
  private _usuario = signal<Usuario|Medico|Analista|null>(null);
  //private _token = signal<string | null>(null)

  private http = inject(HttpClient);

  public esMedico: boolean = false;
  public esAnalista: boolean = false;

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'chequeando')
      return 'chequeando';

    if(this._usuario()) {
      return 'autenticado'
    }

    return 'no-autenticado'
  })

  usuario = computed(() => this._usuario)

  login(sip: string, contrasenya: string): Observable<boolean> {
    return this.http.post<Usuario|Medico|Analista>(
      `${environment.baseUrl}/usuario/login`,
      {
        sip: sip,
        contrasenya: contrasenya,
      }).pipe(
        tap(
          (resp) => {
            this._usuario.set(resp); //this._usuario.set(resp.usuario) this._token.set(resp.token)
            if((resp as Medico).actividadMedico === true){
              this.esMedico = true
            } else if((resp as Analista).actividadAnalista === true){
              this.esAnalista = true
            }else{
              this.esMedico =false
              this.esAnalista = false
            }
            this._authStatus.set('autenticado')
            //this._token.set(resp.token)
            localStorage.setItem('rol', resp.rol!);//aqui meto mi token, por ahora rol
          }),
          map(() =>true),
          catchError((error: any) => {
            this._usuario.set(null);
            this._authStatus.set('no-autenticado')
            //this._token.set(null);
            localStorage.setItem('rol', '');
            return of(false);
          })
      )
  }

    logout() {
    this._usuario.set(null);
    //this._token.set(null);
    this._authStatus.set('no-autenticado');

    localStorage.removeItem('rol');
  }


    public save(usuarioForm: Usuario): Observable<HttpResponse<Usuario>> {
      return this.http.post<Usuario>
      (`${environment.baseUrl}/usuario`,
        usuarioForm,
        { observe: 'response' });
    }

}
