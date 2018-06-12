import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MdlModule } from "@angular-mdl/core";
import { MdlPopoverModule } from "@angular-mdl/popover";
import { MdlSelectModule } from "@angular-mdl/select";

import { DashboardComponent } from "./dashboard.component";
import { ProfileComponent } from "./profile/profile.component";
import { TaskComponent } from "./task/task.component";
import { TaskListComponent } from "./task/task-list/task-list.component";
import { BasicInfoComponent } from "./profile/basic-info/basic-info.component";

import { ContentHeaderComponent } from "./sections/content-header/content-header.component";
import { NavigationComponent } from "./sections/navigation/navigation.component";
import { UserImageHeaderComponent } from "./sections/user-image-header/user-image-header.component";

import { DashboardRouting } from "./dashboard-routing.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdlModule,
    MdlPopoverModule,
    MdlSelectModule,
    DashboardRouting
  ],
  declarations: [
    DashboardComponent,
    ProfileComponent,
    TaskComponent,
    TaskListComponent,
    ContentHeaderComponent,
    NavigationComponent,
    UserImageHeaderComponent,
    BasicInfoComponent
  ],
  providers: []
})
export class DashboardModule { }
