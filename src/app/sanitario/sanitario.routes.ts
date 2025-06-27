import { Routes } from "@angular/router";
import { HomePageComponent } from "./pages/home-page/home-page.component";


import { ManageUsersPageComponent } from "../usuario/pages/manage-users-page/manage-users-page.component";
import { SanitarioLayoutComponent } from "./sanitario-layout/sanitario-layout.component";
import { PeticionesPageComponent } from "./pages/peticiones-page/peticiones-page.component";

export const sanitarioRoutes:Routes = [
  {
    path: '',
    component: SanitarioLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent
      },{
        path: 'peticion',
        component: PeticionesPageComponent
      },{
        path: 'manage',
        component: ManageUsersPageComponent
      }
    ]
  },
  {
        path:'**',
        redirectTo: 'home'
  }
]
export default sanitarioRoutes;
