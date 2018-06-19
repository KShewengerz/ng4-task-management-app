import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";


@Component({
  moduleId    : module.id,
  selector    : "tms-new-project",
  templateUrl : "new-project.component.html",
  styleUrls   : ["new-project.component.css"]
})
export class NewProjectComponent implements OnInit {

  @Input() errorMessage: string;
  @Input() projectName: string;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();
  
  constructor() { }

  ngOnInit() {}

}
