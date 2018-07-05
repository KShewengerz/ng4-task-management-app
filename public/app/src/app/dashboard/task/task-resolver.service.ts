import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from "@angular/router";

import { Observable } from "rxjs/Observable";

import { Task } from "../../../../../../shared/interfaces/-index";

import { TaskService } from "./task.service";


@Injectable()
export class TaskListResolver implements Resolve<Task[]> {
  
  constructor(private taskService: TaskService) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
		const projectId = route.params.id;  
		
    return this.taskService.fetchAllTasksByProjectId(projectId);
  }
  
}
