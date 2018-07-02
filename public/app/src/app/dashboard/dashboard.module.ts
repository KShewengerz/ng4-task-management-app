import { NgModule } from "@angular/core";

import { MdlModule } from "@angular-mdl/core";

import { SectionsModule } from "./sections/sections.module";

import { DashboardComponent } from "./dashboard.component";

import { DashboardRouting } from "./dashboard-routing.module";


@NgModule({
  imports: [
    MdlModule,
    SectionsModule,
    DashboardRouting
  ],
  declarations: [ DashboardComponent ],
  providers: []
})
export class DashboardModule { }
