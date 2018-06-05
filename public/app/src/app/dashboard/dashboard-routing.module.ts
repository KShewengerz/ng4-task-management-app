import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard.component";


const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", loadChildren: "./home/home.module#HomeModule" }
    ]
  }
];

export const DashboardRouting = RouterModule.forChild(routes);
