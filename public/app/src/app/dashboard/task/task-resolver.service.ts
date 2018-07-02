import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from "@angular/router";

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/forkJoin";

import { Task } from "../../../../../../shared/interfaces/-index";

import { TaskService } from "./task.service";


@Injectable()
export class TaskListResolver implements Resolve<Task[]> {
  
  constructor(private TaskService: TaskService) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task[]> {
    return this.TaskService.fetchAllTasks();
  }
  
}
