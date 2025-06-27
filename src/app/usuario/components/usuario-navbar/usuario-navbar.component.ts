import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'usuario-navbar',
    imports: [RouterLink, CommonModule, RouterLinkActive],
    templateUrl: './usuario-navbar.component.html'
})
export class UsuarioNavbarComponent {
  authService = inject(AuthService);
}
