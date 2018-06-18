import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from "@angular/router";

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/forkJoin";

import { Project } from "../../../../../../shared/interfaces/-index";

import { ProjectService } from "./project.service";


@Injectable()
export class ProjectListResolver implements Resolve<Project[]> {
  
  constructor(private projectService: ProjectService) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    return this.projectService.fetchAllUserProjects();
  }
  
}
