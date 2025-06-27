import { Component, computed, inject, OnInit } from '@angular/core';
import { PeticionService } from '../../../peticion/service/peticion.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Peticion } from '../../../peticion/interfaces/peticion.interface';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
@Component({
    selector: 'app-home-page',
    imports: [CommonModule, DatePipe, RouterLink, RouterLinkActive],
    templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {

  peticionService = inject(PeticionService);

  authService = inject(AuthService)
  peticiones: Peticion[] = [];

  ngOnInit(): void {
    this.actualizarLista();
    this.peticionService.peticionSelectedService = undefined;
  }

  eliminarPeticion(peticionId: number) {
    this.peticionService.deletePeticion(peticionId).subscribe({
      next: (resp: HttpResponse<Peticion>) => {
                  if (resp.status === 200 && resp.body) {
                    this.actualizarLista();
                  }
                },
      error: (err: HttpErrorResponse) => {
                   const mensajes = Object.values(err.error as Record<string,string>).join('\n');
                   alert(`Error:\n${mensajes}`);
                }
    })
  }

  private actualizarLista(){
    this.peticionService.getPeticiones().subscribe(peticionesOfServices => this.peticiones = peticionesOfServices)
  }

  public guardarPeticion(peticion: Peticion) {
    this.peticionService.peticionSelectedService = peticion;
  }

}
