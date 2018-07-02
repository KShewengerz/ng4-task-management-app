import { Component } from "@angular/core";

import { ContentHeaderComponent } from "../sections/content-header/content-header.component";
import { TaskListComponent } from "./task-list/task-list.component";


@Component({
  moduleId    : module.id,
  selector    : "tms-task",
  templateUrl : "task.component.html",
  styleUrls   : ["task.component.css"],
  entryComponents: [
    ContentHeaderComponent,
    TaskListComponent
  ]
})
export class TaskComponent {

  constructor() {}

}
