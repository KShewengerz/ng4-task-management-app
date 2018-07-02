import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

import { MdlModule, MdlDialogModule } from "@angular-mdl/core";

import { DragulaModule } from "ng2-dragula/ng2-dragula";

import { ContentHeaderComponent } from "./content-header/content-header.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { UserImageHeaderComponent } from "./user-image-header/user-image-header.component";
import { ProjectComponent } from "./navigation/project/project.component";
import { ProjectActionFieldComponent } from "./navigation/project/project-action-field/project-action-field.component";

import { UserImageHeaderService } from "./user-image-header/user-image-header.service";


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpModule,
    FormsModule,
    MdlModule,
    MdlDialogModule.forRoot(),
    DragulaModule
  ],
  declarations: [
    ContentHeaderComponent,
    NavigationComponent,
    UserImageHeaderComponent,
    ProjectComponent,
    ProjectActionFieldComponent
  ],
  exports: [
    ContentHeaderComponent,
    NavigationComponent,
    UserImageHeaderComponent
  ],
  providers: [
    UserImageHeaderService
  ],
  entryComponents: [
    ProjectComponent,
    ProjectActionFieldComponent
  ]
})
export class SectionsModule { }
