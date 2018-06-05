import { Component, OnInit, Input } from "@angular/core";

import { Task } from "./task.model";

@Component({
  moduleId: module.id,
  selector: "tms-home-task-list",
  templateUrl: "task-list.component.html",
  styleUrls: ["task-list.component.css"]
})
export class TaskListComponent implements OnInit {

  @Input() tasks: Task[] = [];

  constructor() {}

  ngOnInit(): void {

    console.log(this.tasks);
  }

}
