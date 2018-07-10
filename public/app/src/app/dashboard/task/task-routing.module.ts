import { RouterModule, Routes } from "@angular/router";

import { TaskComponent } from "./task.component";
import { TaskListComponent } from "./task-list/task-list.component";

import { TaskListResolver } from "./task-resolver.service";


const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "open" },
  { 
    path: ":status", 
    component: TaskComponent,
    children: [
      { path: "", pathMatch: "full", redirectTo: "0" },
      { 
        path: ":id", 
        component: TaskListComponent,
        resolve: { tasks: TaskListResolver }
      }
    ]
  }
];

export const TaskRouting = RouterModule.forChild(routes);
