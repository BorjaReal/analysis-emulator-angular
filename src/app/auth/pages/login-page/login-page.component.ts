import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login-page',
    imports: [RouterLink, ReactiveFormsModule],
    templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {

  fb = inject(FormBuilder);
  hasError = signal(false);
  router = inject(Router);

  ngOnInit(): void {
      this.authService.esMedico=false
      this.authService.esAnalista=false
  }

  loginForm = this.fb.group({
    sip:    ['', [Validators.required]],
    contrasenya: ['', [Validators.required, Validators.minLength(4)]]
  });

  authService = inject(AuthService)

  onSubmit() {
    if (this.loginForm.invalid) {
      this.hasError.set(true);

      setTimeout(() => {
        console.log(this.loginForm.errors)
        this.hasError.set(false);
      }, 5000);

      return;
    }

    const {sip = '', contrasenya = ''} = this.loginForm.value;

    this.authService.login(sip!, contrasenya!).subscribe((isAutenticated) =>{

      if(isAutenticated){
        if(this.authService.esMedico || this.authService.esAnalista)
          this.router.navigateByUrl('/sanitario/home')
        else
          this.router.navigateByUrl('/usuario')
        return;
      }

    this.hasError.set(true);
    setTimeout(() => {
      this.hasError.set(false); }, 5000)
    });
  }
}
