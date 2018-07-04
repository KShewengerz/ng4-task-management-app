import { Component, OnInit } from "@angular/core";

import { ProjectService } from "../../../shared/project/project.service";

import { TaskSchedule } from "../../../../../../../shared/enums/-index";


@Component({
  moduleId    : module.id,
  selector    : "tms-navigation",
  templateUrl : "navigation.component.html",
  styleUrls   : ["navigation.component.css"]
})
export class NavigationComponent implements OnInit {
  
  isSelected: any = {};

  taskSchedule: typeof TaskSchedule = TaskSchedule;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.isSelected[this.taskSchedule.Today] = true;
  }

  selectProject(id: string): void {
    this.isSelected = {};
    this.isSelected[id] = true;

    this.projectService.projectSelection.next(id);
  }
  
}
