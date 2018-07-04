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

  addTask(body: Task): void {
    console.log(body);
  }

  deleteTask(id: string): void {
    setTimeout(() => {
      const taskIndex: number = this.tasks.findIndex(task => task.id === id);
      this.tasks.splice(taskIndex, 1);
    }, 400);
  }

}
