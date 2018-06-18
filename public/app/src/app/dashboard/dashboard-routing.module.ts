import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard.component";
import { TaskComponent } from "./task/task.component";
import { ProfileComponent } from "./profile/profile.component";

import { UserListResolver } from "../shared/user/user-resolver.service";
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
      { path: "task", component: TaskComponent },
      {
        path: "profile",
        component: ProfileComponent,
        resolve: { users: UserListResolver }
      }
    ]
  }
];

export const DashboardRouting = RouterModule.forChild(routes);
