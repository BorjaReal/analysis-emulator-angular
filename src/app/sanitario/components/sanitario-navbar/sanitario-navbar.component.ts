import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'sanitario-navbar',
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './sanitario-navbar.component.html'
})
export class SanitarioNavbarComponent {

  authService = inject(AuthService)
}
