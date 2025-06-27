import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SanitarioNavbarComponent } from '../components/sanitario-navbar/sanitario-navbar.component';

@Component({
    selector: 'app-sanitario-layout',
    imports: [RouterOutlet, SanitarioNavbarComponent],
    templateUrl: './sanitario-layout.component.html'
})
export class SanitarioLayoutComponent {

}

