import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";

import { MdlModule } from "@angular-mdl/core";

import { ContentHeaderComponent } from "./content-header/content-header.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { UserImageHeaderComponent } from "./user-image-header/user-image-header.component";

import { UserImageHeaderService } from "./user-image-header/user-image-header.service";


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpModule,
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
  ],
  providers: [ UserImageHeaderService ]
})
export class SectionsModule { }
