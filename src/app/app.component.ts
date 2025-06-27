import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
//import { UsuarioComponent } from './usuarios/components/usuario.component';
//import { AuthLayoutComponent } from "./auth/layout/auth-layout/auth-layout.component";
//import { LoginPageComponent } from "./auth/pages/login-page/login-page.component";
//import { UsuariosformComponent } from "./usuarios/components/usuariosform/usuariosform.component";

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title :string = 'emulator-analist-angular';
}
