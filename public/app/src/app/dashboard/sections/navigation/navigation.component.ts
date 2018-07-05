import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { TaskSchedule } from "../../../../../../../shared/enums/-index";


@Component({
  moduleId    : module.id,
  selector    : "tms-navigation",
  templateUrl : "navigation.component.html",
  styleUrls   : ["navigation.component.css"]
})
export class NavigationComponent {

  taskSchedule: typeof TaskSchedule = TaskSchedule;

  constructor(private router: Router) {}
  
}
