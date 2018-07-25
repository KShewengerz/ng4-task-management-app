import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";

import * as moment from "moment";

import { DragulaService } from "ng2-dragula/ng2-dragula";

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
  errorMessage: string;
  status: string;

  isNewTask: boolean  = false;
  isEditMode: any     = {};
  
  constructor(private router: Router,
              private route: ActivatedRoute,
              private dragula: DragulaService,
              private taskService: TaskService) {}

  ngOnInit(): void {
    const snapshot = this.route.snapshot;
    const tasks    = snapshot.data.tasks;
    this.projectId = snapshot.params.id;
    this.status    = snapshot.params.status;
    
    this.onUpdateListDrop();
    this.sortTaskByOrdinal(tasks);
    this.loadTasksFromRouterChange();
  }

  loadTasksFromRouterChange(): void {
    this.router.events
    .filter(event => event instanceof NavigationEnd)
    .subscribe((event: NavigationEnd) => {
      const params = this.route.snapshot.params;
      
      this.projectId = params.id;
      this.status    = params.status;
      this.isNewTask = false;

      this.sortTaskByOrdinal(this.route.snapshot.data.tasks);
    });
  }

  sortTaskByOrdinal(tasks: Task[]): void {
    this.tasks = tasks.sort((a, b) => a.ordinal - b.ordinal);
  }

  onUpdateListDrop(): void {
    this.dragula
    .drop
    .subscribe(async value => {
      const tasks = await this.sortTasks();
      this.taskService.updateTasksOrdinal(tasks).subscribe(response => {});
    });
  }
  
  onNewTaskList(data: Task[]): void {
    this.tasks = data;
  }

  async sortTasks(): Promise<Task[]> {
    return await this.tasks.map((task, index) => {
      task.ordinal = index + 1;
      return task;
    });
  }
  
  newTask(): void {
    this.errorMessage = "";
    this.isNewTask    = true;
    this.isEditMode   = {};
  }

  addTask(description: string): void {
    const projectId = this.projectId;

    this.taskService
      .saveNewTask({projectId, description})
      .subscribe(
        response => {
          this.tasks.push(response);

          this.isNewTask = false;
          this.errorMessage = "";
        },
        err => this.extractErrorMessage(err)
      );
  }

  edit(id: string): void {
    this.isEditMode[id] = true;
    this.isNewTask = false;
  }

  updateTask(id: string, description: string): void {
    if (description) {
      this.taskService.updateTask(id, description)
        .subscribe(
          response => {
            this.tasks.map(task => task.id === id ? task.description = description : task);

            this.isEditMode[id] = false;
            this.errorMessage = "";
          },
          err => this.extractErrorMessage(err));
    }
    
  }

  completeTask(id: string): void {
    setTimeout(() => {
      this.taskService
        .completeTask(id)
        .subscribe(response => {
          const taskIndex: number = this.tasks.findIndex(task => task.id === id);
          this.tasks.splice(taskIndex, 1);
        });
    }, 400);
  }

  extractErrorMessage(err: any): void {
    const error = err.json().errorMessages[0];
    this.errorMessage = error.message;
  }

}
