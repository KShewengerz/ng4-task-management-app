import { Component, Input, Output, EventEmitter } from "@angular/core";


@Component({
  moduleId    : module.id,
  selector    : "tms-project-action-field",
  templateUrl : "project-action-field.component.html",
  styleUrls   : ["project-action-field.component.css"]
})
export class ProjectActionFieldComponent {

  @Input() errorMessage: string;
  @Input() projectName: string;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();
  
  constructor() { }

}
