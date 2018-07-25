import { Component, Input, OnInit } from "@angular/core";

import * as moment from "moment";

import { TaskSchedule } from "../../../../../../../shared/enums/-index";
import { Task } from "../../../../../../../shared/interfaces/-index";


@Component({
  moduleId    : module.id,
  selector    : "tms-task-menu",
  templateUrl : "task-menu.component.html",
  styleUrls   : ["task-menu.component.css"]
})
export class TaskMenuComponent implements OnInit {

  @Input() task: Task;
  
  schedule: string;
  scheduleType: typeof TaskSchedule = TaskSchedule;
  
  
  
  constructor() {}
  
  ngOnInit(): void {
    this.validateSchedule();
  }
  
  validateSchedule(): void {
    const dateFormat      = "MM/DD/YYYY";
    const now             = moment().format(dateFormat);
    const tomorrow        = moment().add(1, "days").format(dateFormat);
    const startOfNextWeek = moment().add(1, "weeks").startOf("isoWeek").subtract(1, "days").format(dateFormat);
    const endOfNextWeek   = moment().add(1, "weeks").endOf("isoWeek").subtract(1, "days").format(dateFormat);
  
    if (this.task.scheduleDate == null) this.schedule = null;
    else if (this.task.scheduleDate === now)  this.schedule = this.scheduleType.Today;
    else if (this.task.scheduleDate === tomorrow) this.schedule = this.scheduleType.Tomorrow;
    else this.schedule = this.scheduleType.NextWeek;
  }
  
  rescheduleTask(schedule: number): void {
    console.log(schedule);
  }

}
