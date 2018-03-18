
import { Component, OnInit } from '@angular/core';

import { HeaderComponent } from './sections/header/header.component';
import { TaskListComponent } from './sections/task-list/task-list.component';

import { Task } from './sections/task-list/task.model';
import { tasks } from './sections/task-list/task-data';


@Component({
  moduleId: module.id,
  selector: 'tms-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  entryComponents: [
    HeaderComponent,
    TaskListComponent
  ]
})
export class HomeComponent implements OnInit {

  taskList: Task[] = [];

  constructor() {}

  ngOnInit(): void {
    this.taskList = tasks;
  }

}
