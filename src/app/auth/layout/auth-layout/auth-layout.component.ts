import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterPageComponent } from '../../pages/register-page/register-page/register-page.component';

@Component({
    selector: 'app-auth-layout',
    imports: [RouterOutlet],
    templateUrl: './auth-layout.component.html'
})
export class AuthLayoutComponent {

}
