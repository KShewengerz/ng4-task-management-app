import { RouterModule, Routes } from "@angular/router";

import { TaskComponent } from "./task.component";

import { TaskListResolver } from "./task-resolver.service";


const routes: Routes = [
  {
    path: "",
    component: TaskComponent,
    children: [
      { path: "", redirectTo: "task", pathMatch: "full" },
      { 
        path: "task", 
        component: TaskComponent,
        resolve: { tasks: TaskListResolver }
      }
    ]
  }
];

export const TaskRouting = RouterModule.forChild(routes);
