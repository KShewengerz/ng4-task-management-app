import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard.component";

import { ProjectListResolver } from "../shared/project/project-resolver.service";


const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    resolve: {
      projects: ProjectListResolver
    },
    children: [
      { path: "", redirectTo: "task", pathMatch: "full" },
      { path: "task", loadChildren: "./task/task.module#TaskModule" },
      { path: "profile", loadChildren: "./profile/profile.module#ProfileModule" }
    ]
  }
];

export const DashboardRouting = RouterModule.forChild(routes);
