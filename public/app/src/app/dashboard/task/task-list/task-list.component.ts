import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Task } from "../../../../../../../shared/interfaces/-index";


@Component({
  moduleId    : module.id,
  selector    : "tms-home-task-list",
  templateUrl : "task-list.component.html",
  styleUrls   : [ "task-list.component.css" ]
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.tasks = this.route.snapshot.data.tasks;
  }

  addTask(body: Task): void {
    console.log(body);
  }

  deleteTask(id: string): void {
    const taskIndex: number = this.tasks.findIndex(task => task.id === id);
    this.tasks.splice(taskIndex, 1);
  }

}
