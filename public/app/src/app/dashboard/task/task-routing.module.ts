import { RouterModule, Routes } from "@angular/router";

import { TaskComponent } from "./task.component";
import { TaskListComponent } from "./task-list/task-list.component";

import { TaskListResolver } from "./task-resolver.service";


const routes: Routes = [
  { 
    path: "", 
    component: TaskComponent,
    children: [
      { path: "", pathMatch: "full", redirectTo: "open/0" },
      { 
        path: ":status/:id", 
        component: TaskListComponent,
        resolve: { tasks: TaskListResolver }
      }
    ]
  }
];

export const TaskRouting = RouterModule.forChild(routes);
