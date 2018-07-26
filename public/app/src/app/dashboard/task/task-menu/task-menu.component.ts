import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

import * as moment from "moment";

import { TaskSchedule } from "../../../../../../../shared/enums/-index";
import { Task } from "../../../../../../../shared/interfaces/-index";

import { TaskService } from "../task.service";


@Component({
  moduleId    : module.id,
  selector    : "tms-task-menu",
  templateUrl : "task-menu.component.html",
  styleUrls   : ["task-menu.component.css"]
})
export class TaskMenuComponent implements OnInit {
  
  @Input() tasks: Task[] = [];
  @Input() task: Task;
  @Input() projectId: any;
  @Output() newTaskList: EventEmitter<Task[]> = new EventEmitter<Task[]>();
  
  schedule: string;
  scheduleType: typeof TaskSchedule = TaskSchedule;
  
  dateFormat      = "MM/DD/YYYY";
  now             = moment().format(this.dateFormat);
  tomorrow        = moment().add(1, "days").format(this.dateFormat);
  
  constructor(private taskService: TaskService) {}
  
  ngOnInit(): void {
    this.validateSchedule();
  }
  
  validateSchedule(): void {
    if (this.task.scheduleDate == null) this.schedule = null;
    else if (this.task.scheduleDate === this.now)  this.schedule = this.scheduleType.Today;
    else if (this.task.scheduleDate === this.tomorrow) this.schedule = this.scheduleType.Tomorrow;
    else this.schedule = this.scheduleType.NextWeek;
  }
  
  rescheduleTask(schedule: number): void {
    const id = this.task.id;
    
    this.taskService
      .rescheduleTask({id, schedule})
      .subscribe(response => {
  
        this.task.scheduleDate = response._body;
        
        this.tasks = this.tasks.map(task => task.id === this.task.id ? this.task : task );
        
        if (this.projectId.length == 1) {
          if (this.schedule === this.scheduleType.Today) this.filterTaskList(this.now);
          else if (this.schedule === this.scheduleType.Tomorrow) this.filterTaskList(this.tomorrow);
          else this.filterTaskList(null);
        }
        else this.validateSchedule();
        
        this.newTaskList.emit(this.tasks);
      });
  }
  
  filterTaskList(scheduleDate: string | string[]): void {
    if (scheduleDate) this.tasks = this.tasks.filter(task => task.scheduleDate === scheduleDate);
    else this.tasks = this.tasks.filter(task => task.scheduleDate != this.now && task.scheduleDate != this.tomorrow);
  }

}
