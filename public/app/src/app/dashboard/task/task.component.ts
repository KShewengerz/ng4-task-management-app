import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";

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
export class TaskComponent implements OnInit {

  projectId: string;

  constructor(private router: Router,
              private route: ActivatedRoute) {}       

  ngOnInit(): void {
    const url      = this.router.url.split("/");
    this.projectId = url.pop();

    this.checkRouterChange();
  }

  checkRouterChange(): void {
    this.router.events
    .filter(event => event instanceof NavigationEnd)
    .subscribe((event: NavigationEnd) => this.projectId = this.router.url.split("/").pop());
  }

}
