import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes')
    //TODO: guards
  },
  {
    path: 'sanitario',
    loadChildren: () => import('./sanitario/sanitario.routes')
  },
  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario.routes')
  },
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];
