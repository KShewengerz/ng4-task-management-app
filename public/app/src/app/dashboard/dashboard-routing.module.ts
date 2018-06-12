import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard.component";
import { TaskComponent } from "./task/task.component";
import { ProfileComponent } from "./profile/profile.component";


const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      { path: "", redirectTo: "task", pathMatch: "full" },
      { path: "task", component: TaskComponent },
      { path: "profile", component: ProfileComponent }
    ]
  }
];

export const DashboardRouting = RouterModule.forChild(routes);
