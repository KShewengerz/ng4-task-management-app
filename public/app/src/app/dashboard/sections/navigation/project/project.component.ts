import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { MdlDialogService } from "@angular-mdl/core";

import { DragulaService } from "ng2-dragula/ng2-dragula";

import { ProjectService } from "../../../../shared/project/project.service";
import { Project } from "../../../../../../../../shared/interfaces/-index";


@Component({
  moduleId    : module.id,
  selector    : "tms-project",
  templateUrl : "project.component.html",
  styleUrls   : ["project.component.css", "../navigation.component.css"]
})
export class ProjectComponent implements OnInit {
  
  projects: Project[] = [];
  
  isNewProject: boolean = false;
  isEditProject: any = {};
  isHovered: any = {};
  
  errorMessage: string;
  
  constructor(private router: Router,
              private route: ActivatedRoute,
              private dialogService: MdlDialogService,
              private projectService: ProjectService,
              private dragula: DragulaService) {}
  
  ngOnInit(): void {
    const projectLists = this.route.snapshot.data.projects;
    this.projects      = projectLists.sort((a, b) => a.ordinal - b.ordinal);
    
    this.onUpdateListDrop();
  }
  
  onUpdateListDrop(): void {
    this.dragula
    .drop
    .subscribe(async value => {
      const projects = await this.sortProjects();
      
      this.projectService.updateProjectsOrdinal(projects).subscribe(response => {});
    });
  }
  
  async sortProjects(): Promise<Project[]> {
    return await this.projects.map((project, index) => {
      project.ordinal = index + 1;
      return project;
    });
  }
  
  addNewProject(name: string): void {
    if (name) {
      this.projectService
      .saveNewProject({ name })
      .subscribe(
        response => {
          const {id, color} = response;

          this.projects.push({ id, name, color });
          this.isNewProject = false;
          this.errorMessage = "";
        },
        err => this.extractErrorMessage(err)
      );
    }
  }
  
  editProject(id: string, name: string): void {
    if (name) {
      this.projectService
        .updateProject(id, name)
        .subscribe(
          response => {
            this.projects.map(project => project.id === id ? project.name = name : project);
            
            this.isEditProject[id] = false;
            this.errorMessage = "";
          },
          err => this.extractErrorMessage(err));
    }
  }
  
  deleteProject(id: string, name: string): void {
    this.dialogService
    .confirm(`Are you sure you want to delete Project <span class="dialog-subject">${name}</span> ?`, "No", "Yes")
    .subscribe(() => {
        this.projectService
        .deleteProject(id)
        .subscribe(response => {
          const index = this.projects.findIndex(project => project.id === id);
          this.projects.splice(index, 1);
        });
      },
      err => {});
  }
  
  extractErrorMessage(err: any): void {
    const error = err.json().errorMessages[0];
    this.errorMessage = error.message;
  }
  
  cancel(id?: string): void {
    if (id) this.isEditProject[id] = false;
    else this.isNewProject = false;
    
    this.errorMessage = "";
  }

}
