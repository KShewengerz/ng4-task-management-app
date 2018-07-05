import { Component, Input, Output, EventEmitter } from "@angular/core";


@Component({
  moduleId    : module.id,
  selector    : "tms-task-form",
  templateUrl : "task-form.component.html",
  styleUrls   : ["task-form.component.css"]
})
export class TaskFormComponent {

  @Input() errorMessage: string;
  @Input() task: string;
  @Output() cancel = new EventEmitter();
  @Output() save    = new EventEmitter();

  constructor() {}

}
