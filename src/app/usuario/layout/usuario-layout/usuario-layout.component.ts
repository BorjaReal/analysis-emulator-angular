import { Component } from '@angular/core';
import { UsuarioNavbarComponent } from '../../components/usuario-navbar/usuario-navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-usuario-layout',
    imports: [RouterOutlet, UsuarioNavbarComponent],
    templateUrl: './usuario-layout.component.html'
})
export class UsuarioLayoutComponent {

}
