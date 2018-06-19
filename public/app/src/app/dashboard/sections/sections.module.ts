import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

import { MdlModule, MdlDialogModule } from "@angular-mdl/core";

import { ContentHeaderComponent } from "./content-header/content-header.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { UserImageHeaderComponent } from "./user-image-header/user-image-header.component";

import { UserImageHeaderService } from "./user-image-header/user-image-header.service";
import { ProjectService } from "../../shared/project/project.service";


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpModule,
    FormsModule,
    MdlModule,
    MdlDialogModule.forRoot()
  ],
  declarations: [
    ContentHeaderComponent,
    NavigationComponent,
    UserImageHeaderComponent
  ],
  exports: [
    ContentHeaderComponent,
    NavigationComponent,
    UserImageHeaderComponent
  ],
  providers: [
    UserImageHeaderService,
    ProjectService
  ]
})
export class SectionsModule { }
