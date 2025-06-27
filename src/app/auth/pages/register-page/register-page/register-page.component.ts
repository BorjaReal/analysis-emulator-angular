import { CommonModule, DatePipe } from '@angular/common';
import { Component,  inject} from '@angular/core';
import { Usuario } from '../../../../usuario/interfaces/usuario.interface';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-register-page',
    imports: [FormsModule, CommonModule],
    templateUrl: './register-page.component.html'
})
export class RegisterPageComponent {

    router = inject(Router);
    authService = inject(AuthService)

    usuarioForm: Usuario = {
    usuarioId: 0,
    nombre: '',
    apellidos: '',
    fechaNacimiento: '',
    sexo: 'M',
    sip: '',
    dni: '',
    direccion: '',
    codigoPostal: '',
    email: '',
    telefono: '',
    contrasenya: '',
    fechaRegistro: new Date(),
};


    onSubmit(): void {
      this.authService.save(this.usuarioForm).subscribe({
        next: (resp: HttpResponse<Usuario>) => {
          if (resp.status === 201 && resp.body) {
            this.router.navigateByUrl('/auth/auth')
          }
        },
        error: (err: HttpErrorResponse) => {
         const mensajes = Object.values(err.error as Record<string,string>).join('\n');
           alert(`Error:\n${mensajes}`);
          }
        });
    }
}
