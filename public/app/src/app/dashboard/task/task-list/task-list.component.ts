import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from "@angular/router";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/filter";

import { TaskService } from "../task.service";

import { Task } from "../../../../../../../shared/interfaces/-index";


@Component({
  moduleId    : module.id,
  selector    : "tms-home-task-list",
  templateUrl : "task-list.component.html",
  styleUrls   : [ "task-list.component.css" ]
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  projectId: string;
  isNewTask: boolean = false;
  errorMessage: string;
  
  constructor(private router: Router,
              private route: ActivatedRoute,
              private taskService: TaskService) {}

  ngOnInit(): void {
    const snapshot = this.route.snapshot;
    this.tasks     = snapshot.data.tasks;
    this.projectId = snapshot.params.id; 
    
    this.loadTasksFromRouterChange();
  }

  loadTasksFromRouterChange(): void {
    this.router.events
    .filter(event => event instanceof NavigationEnd)
    .subscribe((event: NavigationEnd) => this.tasks = this.route.snapshot.data.tasks);
  }

  addTask(description: string): void {
    this.taskService
      .saveNewTask({description})
      .subscribe(
        response => {
          this.tasks.push(response);

          this.isNewTask = false;
          this.errorMessage = "";
        },
        err => this.extractErrorMessage(err)
      )
  }

  completeTask(id: string): void {
    setTimeout(() => {
      this.taskService
        .completeTask(id)
        .subscribe(response => {
          const taskIndex: number = this.tasks.findIndex(task => task.id === id);
          this.tasks.splice(taskIndex, 1);
        })
    }, 400);
  }

  extractErrorMessage(err: any): void {
    const error = err.json().errorMessages[0];
    this.errorMessage = error.message;
  }

}
