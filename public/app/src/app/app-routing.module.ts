import { RouterModule, Routes } from "@angular/router";

import { AuthGuardService } from "./shared/services/auth-guard.service";


const routes: Routes = [
  { path: "", loadChildren: "./landing/landing.module#LandingModule", canActivate: [ AuthGuardService ] },
  { path: "dashboard", loadChildren: "./dashboard/dashboard.module#DashboardModule", canActivate: [ AuthGuardService ] }
];

export const AppRouting = RouterModule.forRoot(routes, { useHash: false });
