import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { MdlModule } from "@angular-mdl/core";

import { ContentHeaderComponent } from "./content-header/content-header.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { UserImageHeaderComponent } from "./user-image-header/user-image-header.component";


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MdlModule
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
  ]
})
export class SectionsModule { }
