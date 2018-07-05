import { RouterModule, Routes } from "@angular/router";

import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

import { AuthGuardService } from "./shared/services/auth-guard.service";


const routes: Routes = [
  { path: "", loadChildren: "./landing/landing.module#LandingModule", canActivate: [ AuthGuardService ] },
  { path: "dashboard", loadChildren: "./dashboard/dashboard.module#DashboardModule", canActivate: [ AuthGuardService ] },
  { path: "404", component: PageNotFoundComponent },
  // { path: "**", redirectTo: "404" }
  
];

export const AppRouting = RouterModule.forRoot(routes, { useHash: false });
