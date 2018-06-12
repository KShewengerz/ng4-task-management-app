import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MdlModule } from "@angular-mdl/core";

import { DashboardComponent } from "./dashboard.component";
import { ProfileComponent } from "./profile/profile.component";
import { TaskComponent } from "./task/task.component";
import { TaskListComponent } from "./task/task-list/task-list.component";

import { ContentHeaderComponent } from "./sections/content-header/content-header.component";
import { NavigationComponent } from "./sections/navigation/navigation.component";
import { UserImageHeaderComponent } from "./sections/user-image-header/user-image-header.component";

import { DashboardRouting } from "./dashboard-routing.module";


@NgModule({
  imports: [
    CommonModule,
    MdlModule,
    DashboardRouting
  ],
  declarations: [
    DashboardComponent,
    ProfileComponent,
    TaskComponent,
    TaskListComponent,
    ContentHeaderComponent,
    NavigationComponent,
    UserImageHeaderComponent
  ],
  providers: []
})
export class DashboardModule { }
