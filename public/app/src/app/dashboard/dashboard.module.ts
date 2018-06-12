import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MdlModule } from "@angular-mdl/core";
import { MdlPopoverModule } from "@angular-mdl/popover";
import { MdlSelectModule } from "@angular-mdl/select";

import { ProfileModule } from "./profile/profile.module";
import { SectionsModule } from "./sections/sections.module";

import { DashboardComponent } from "./dashboard.component";
import { ProfileComponent } from "./profile/profile.component";
import { TaskComponent } from "./task/task.component";
import { TaskListComponent } from "./task/task-list/task-list.component";

import { DashboardRouting } from "./dashboard-routing.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdlModule,
    MdlPopoverModule,
    MdlSelectModule,
    ProfileModule,
    SectionsModule,
    DashboardRouting
  ],
  declarations: [
    DashboardComponent,
    ProfileComponent,
    TaskComponent,
    TaskListComponent
  ],
  providers: []
})
export class DashboardModule { }
