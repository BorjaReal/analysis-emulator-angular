import { Routes } from "@angular/router";
import { UsuarioLayoutComponent } from "./layout/usuario-layout/usuario-layout.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";



export const usuarioRoutes:Routes = [
  {
    path: '',
    component: UsuarioLayoutComponent,
    children: [
      {
        path: '',
        component: HomePageComponent
      }
    ]
  },
  {
        path:'**',
        redirectTo: 'home'
  }

]

export default usuarioRoutes;
