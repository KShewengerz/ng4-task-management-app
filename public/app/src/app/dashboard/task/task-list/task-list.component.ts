import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { TaskService } from "../task.service";
import { ProjectService } from "../../../shared/project/project.service";

import { Task } from "../../../../../../../shared/interfaces/-index";


@Component({
  moduleId    : module.id,
  selector    : "tms-home-task-list",
  templateUrl : "task-list.component.html",
  styleUrls   : [ "task-list.component.css" ]
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  isNewTask: boolean = false;
  errorMessage: string;
  
  constructor(private route: ActivatedRoute,
              private taskService: TaskService,
              private projectService: ProjectService) {}

  ngOnInit(): void {
    this.tasks = this.route.snapshot.data.tasks;

    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.projectSelected.subscribe(id => {
      this.taskService
        .fetchAllTasksByProjectId(id)
        .subscribe(response => this.tasks = response);
    });
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
