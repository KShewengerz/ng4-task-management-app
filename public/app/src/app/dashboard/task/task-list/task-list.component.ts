import { Component, OnInit } from "@angular/core";

import { Task } from "./task.model";
import { tasks } from "./task-data";


@Component({
  moduleId: module.id,
  selector: "tms-home-task-list",
  templateUrl: "task-list.component.html",
  styleUrls: ["task-list.component.css"]
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  
  constructor() {}

  ngOnInit(): void {
    this.tasks = tasks;
  }

}
